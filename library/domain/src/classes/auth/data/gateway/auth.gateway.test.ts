import type { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import type { HttpClientInterface } from '../../../../infrastructure/http-client/http-client.interface.ts';

import { AuthGateway } from './auth.gateway.ts';

describe('AuthGateway socket ticket', () => {
  it('requests and validates a short-lived socket ticket', async () => {
    const httpClient = createHttpClient({
      expiresAt: '2026-08-08T12:05:00.000Z',
      ticket: 'signed-ticket',
    });
    const gateway = new AuthGateway(createConfig(), httpClient);

    await expect(gateway.issueSocketTicket()).resolves.toEqual(
      expect.objectContaining({
        expiresAt: '2026-08-08T12:05:00.000Z',
        ticket: 'signed-ticket',
      }),
    );
    expect(httpClient.post).toHaveBeenCalledWith('http://localhost:4020/v1/auth/socket-ticket');
  });

  it('rejects an invalid socket ticket response', async () => {
    const gateway = new AuthGateway(createConfig(), createHttpClient({ ticket: 42 }));

    await expect(gateway.issueSocketTicket()).rejects.toBeDefined();
  });
});

const createConfig = () => {
  return {
    get: vi.fn(() => 'http://localhost:4020'),
  } as unknown as ConfigInterface;
};

const createHttpClient = (response: unknown) => {
  return {
    post: vi.fn(async () => response),
  } as unknown as HttpClientInterface & {
    post: ReturnType<typeof vi.fn>;
  };
};
