import { describe, expect, it } from 'vitest';
import { createRuntimeCaching } from '../runtime-caching.ts';

const matches = (rule: number, path: string, destination: RequestDestination): boolean => {
  const pattern = createRuntimeCaching()[rule].urlPattern;
  if (typeof pattern !== 'function') throw new Error('Ожидался matcher запроса.');
  const url = new URL(path, 'http://localhost:3000');
  return Boolean(
    pattern({
      url,
      request: { destination } as Request,
      sameOrigin: true,
      event: {} as Parameters<typeof pattern>[0]['event'],
    }),
  );
};

describe('Service Worker runtime caching', () => {
  it.each([
    '/@fs/project/icons/exchange-box-line.icon.tsx',
    '/@fs/project/icons/example.svg.tsx',
    '/@fs/project/icon.svg?import',
    '/src/main.tsx?asset=icon.png',
  ])('не кеширует исходный модуль %s как изображение', (path) => {
    expect(matches(0, path, 'script')).toBe(false);
  });

  it('не принимает .icon.tsx за расширение .ico', () => {
    expect(matches(0, '/icons/exchange-box-line.icon.tsx', 'image')).toBe(false);
  });

  it.each(['/favicon.ico', '/promo.png?v=2', '/icon.svg', '/picture.WEBP'])('кеширует изображение %s', (path) => {
    expect(matches(0, path, 'image')).toBe(true);
  });

  it('кеширует шрифты, сохраняя проверку назначения и расширения', () => {
    expect(matches(1, '/fonts/font.woff2?v=2', 'font')).toBe(true);
    expect(matches(1, '/fonts/font.woff2?import', 'script')).toBe(false);
    expect(matches(1, '/fonts/font.woff2.ts', 'font')).toBe(false);
  });
});
