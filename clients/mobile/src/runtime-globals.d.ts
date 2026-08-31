interface AbortSignal {
  readonly reason: unknown;
}

interface AbortController {
  abort(reason?: unknown): void;
}

declare function queueMicrotask(callback: () => void): void;
