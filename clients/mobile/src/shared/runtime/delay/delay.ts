export const delay = (duration: number, signal: AbortSignal): Promise<void> => {
  return new Promise((resolve, reject) => {
    const abort = () => {
      clearTimeout(timeout);
      reject(signal.reason);
    };
    const timeout = setTimeout(() => {
      signal.removeEventListener('abort', abort);
      resolve();
    }, duration);

    if (signal.aborted) {
      abort();
      return;
    }

    signal.addEventListener('abort', abort, { once: true });
  });
};
