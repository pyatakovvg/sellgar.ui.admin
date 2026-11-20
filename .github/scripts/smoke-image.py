import json
import subprocess
import sys
import tempfile
import time
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import urlopen


class AssetParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.assets = set()
        self.has_config = False

    def handle_starttag(self, tag, attributes):
        attributes = dict(attributes)
        source = attributes.get("src") if tag == "script" else attributes.get("href")

        if tag == "script" and source == "/config.js":
            self.has_config = True

        if tag in {"script", "link"} and source and source.startswith("/assets/"):
            self.assets.add(source)


def docker(*arguments):
    result = subprocess.run(
        ["docker", *arguments], check=True, capture_output=True, text=True, timeout=60
    )
    return result.stdout.strip()


def require(condition, message):
    if not condition:
        raise RuntimeError(message)


def request(base_url, path):
    try:
        response = urlopen(base_url + path, timeout=3)
    except HTTPError as error:
        response = error

    with response:
        return response.status, response.headers, response.read()


def check_http(base_url, configuration):
    deadline = time.monotonic() + 30

    while True:
        try:
            status, headers, index = request(base_url, "/")
            if status == 200:
                break
        except (URLError, TimeoutError, ConnectionError):
            pass

        require(time.monotonic() < deadline, "Nginx did not become ready within 30 seconds")
        time.sleep(0.25)

    require("text/html" in headers.get("Content-Type", ""), "Root must return HTML")

    status, _, _ = request(base_url, "/healthz")
    require(status == 200, "Health check failed")

    for path in ["/sign-in", "/shops", "/products/smoke-product"]:
        status, _, body = request(base_url, path)
        require(status == 200 and body == index, f"SPA fallback failed for {path}")

    status, headers, body = request(base_url, "/config.js")
    require(status == 200 and body == configuration, "Mounted config.js was not served")
    require("no-store" in headers.get("Cache-Control", ""), "config.js must not be cached")

    parser = AssetParser()
    parser.feed(index.decode("utf-8"))
    require(parser.has_config, "index.html does not load /config.js")
    require(bool(parser.assets), "index.html does not reference built assets")

    for path in sorted(parser.assets):
        status, headers, body = request(base_url, path)
        require(status == 200 and body and body != index, f"Built asset is missing: {path}")
        require("immutable" in headers.get("Cache-Control", ""), f"Asset is not cached: {path}")

    status, _, _ = request(base_url, "/assets/smoke-missing-file.js")
    require(status == 404, "A missing asset must return 404 instead of index.html")

    status, headers, _ = request(base_url, "/sw.js")
    require(status == 200, "Service worker is missing")
    require("no-store" in headers.get("Cache-Control", ""), "Service worker must not be cached")


def main(image):
    configuration = (
        'window.env = {NODE_ENV: "production", '
        'GATEWAY_API: "https://api.smoke.invalid", '
        'SOCKET_GATEWAY_API: "https://socket.smoke.invalid", '
        'CDN_IMAGES_URL: "https://cdn.smoke.invalid/images"};\n'
    ).encode("utf-8")

    with tempfile.TemporaryDirectory(prefix="admin-ui-smoke-") as directory:
        # The container runs as nginx and must be able to read the mounted file.
        Path(directory).chmod(0o755)
        config_path = Path(directory) / "config.js"
        config_path.write_bytes(configuration)
        config_path.chmod(0o644)
        container = docker(
            "run",
            "--detach",
            "--read-only",
            "--tmpfs",
            "/tmp:rw,nosuid,noexec,size=64m",
            "--cap-drop",
            "ALL",
            "--security-opt",
            "no-new-privileges:true",
            "--publish",
            "127.0.0.1::8080",
            "--mount",
            f"type=bind,source={config_path},target=/usr/share/nginx/html/config.js,readonly",
            image,
        )

        try:
            docker("exec", container, "nginx", "-t")
            require(docker("exec", container, "id", "-u") != "0", "Nginx must run without root")
            ports = json.loads(docker("inspect", "--format", "{{json .NetworkSettings.Ports}}", container))
            port = ports["8080/tcp"][0]["HostPort"]
            check_http(f"http://127.0.0.1:{port}", configuration)
            print("Passed: non-root Nginx, SPA routes, assets, mounted config.js and cache headers")
        except BaseException:
            subprocess.run(["docker", "logs", container], check=False, timeout=10)
            raise
        finally:
            docker("rm", "--force", container)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python3 .github/scripts/smoke-image.py IMAGE")

    main(sys.argv[1])
