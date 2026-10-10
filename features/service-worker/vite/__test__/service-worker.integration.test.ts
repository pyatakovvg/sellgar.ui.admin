// @vitest-environment node

import { mkdtemp, mkdir, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, resolveConfig } from 'vite';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { serviceWorker, type ServiceWorkerViteOptions } from '@feature/service-worker/vite';

describe('Service Worker Vite integration', () => {
  let root: string;

  beforeEach(async () => {
    vi.stubEnv('VITE_APP_BUILD_ID', undefined);
    root = await mkdtemp(join(tmpdir(), 'sellgar-service-worker-'));
    await symlink(
      fileURLToPath(new URL('../../../../node_modules', import.meta.url)),
      join(root, 'node_modules'),
      'dir',
    );
    await mkdir(join(root, 'public'));
    await writeFile(join(root, 'public', 'config.js'), 'window.env = {};');
    await writeFile(join(root, 'public', 'icon.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
    await writeFile(
      join(root, 'index.html'),
      '<!doctype html><html><head></head><body><script type="module" src="/main.js"></script></body></html>',
    );
    await writeFile(
      join(root, 'main.js'),
      `
      import { registerSW } from 'virtual:pwa-register';
      globalThis.__BUILD_ID__ = import.meta.env.VITE_APP_BUILD_ID;
      registerSW({ immediate: true });
    `,
    );
  });

  afterEach(async () => {
    vi.unstubAllEnvs();
    await rm(root, { recursive: true, force: true });
  });

  async function buildApplication(options: ServiceWorkerViteOptions = {}) {
    await build({
      root,
      configFile: false,
      envDir: false,
      base: '/admin/',
      logLevel: 'silent',
      plugins: [serviceWorker(options)],
      build: { minify: false },
    });

    const files = await readdir(join(root, 'dist', 'assets'));
    const scripts = await Promise.all(
      files.filter((file) => file.endsWith('.js')).map((file) => readFile(join(root, 'dist', 'assets', file), 'utf8')),
    );
    const javascript = scripts.join('\n');
    const buildId = javascript.match(/globalThis\.__BUILD_ID__ = "([^"]+)"/)?.[1];

    return {
      buildId,
      javascript,
      worker: await readFile(join(root, 'dist', 'sw.js'), 'utf8'),
      html: await readFile(join(root, 'dist', 'index.html'), 'utf8'),
      files: await readdir(join(root, 'dist')),
    };
  }

  it('генерирует worker и регистрацию для base приложения, сохраняя управляемую активацию', async () => {
    const result = await buildApplication({
      manifest: { name: 'Test Admin', icons: [{ src: 'icon.svg', sizes: 'any', type: 'image/svg+xml' }] },
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/example\.com\/images\//,
          handler: 'NetworkFirst',
          options: { cacheName: 'custom-images' },
        },
      ],
    });

    expect(result.javascript).toContain('/admin/sw.js');
    expect(result.javascript).toContain('/admin/');
    expect(result.worker).toContain('SKIP_WAITING');
    expect(result.worker).not.toContain('.clientsClaim(');
    expect(result.worker).not.toContain('config.js');
    expect(result.worker).toContain('icon.svg');
    expect(result.worker.indexOf('custom-images')).toBeLessThan(result.worker.indexOf('static-images-cache'));
    expect(result.worker).toContain('static-fonts-cache');
    expect(result.files).not.toContain('registerSW.js');
    expect(result.html).not.toContain('navigator.serviceWorker.register');
    expect(JSON.parse(await readFile(join(root, 'dist', 'manifest.webmanifest'), 'utf8')).name).toBe('Test Admin');
  });

  it('меняет идентификатор и ревизию приложения между двумя сборками', async () => {
    const first = await buildApplication();
    const second = await buildApplication();

    expect(first.buildId).toMatch(/^[a-f0-9-]{36}$/);
    expect(second.buildId).toMatch(/^[a-f0-9-]{36}$/);
    expect(second.buildId).not.toBe(first.buildId);
    expect(second.worker).not.toBe(first.worker);
    expect(second.files).not.toContain('manifest.webmanifest');
  });

  it('передаёт явно заданный идентификатор сборки в клиентский код', async () => {
    vi.stubEnv('VITE_APP_BUILD_ID', 'environment-release');
    const result = await buildApplication({ buildId: 'release-42' });

    expect(result.buildId).toBe('release-42');
  });

  it('читает идентификатор из envDir Vite и сохраняет регистрацию в dev', async () => {
    await mkdir(join(root, 'environment'));
    await writeFile(join(root, 'environment', '.env.staging'), 'VITE_APP_BUILD_ID=staging-release');

    const config = await resolveConfig(
      { root, configFile: false, envDir: 'environment', mode: 'staging', plugins: [serviceWorker()] },
      'serve',
    );

    expect(config.define?.['import.meta.env.VITE_APP_BUILD_ID']).toBe('"staging-release"');
    expect(config.plugins.some((plugin) => plugin.name === 'vite-plugin-pwa:dev-sw')).toBe(true);
  });
});
