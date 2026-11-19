import { SocketIOConnectionsInterface } from '../service/socket-io-connections/socket-io-connections.interface.ts';
import { SocketIOConnections } from '../service/socket-io-connections/socket-io-connections.service.ts';

import { SocketIOBindings } from '../classes.bindings.ts';

describe('SocketIOBindings', () => {
  it('registers the shared connections service as a singleton', () => {
    const inSingletonScope = vi.fn();
    const to = vi.fn(() => ({ inSingletonScope }));
    const bind = vi.fn(() => ({ to }));
    const bindings = new SocketIOBindings();

    bindings.register({ bind } as never);

    expect(bind).toHaveBeenCalledWith(SocketIOConnectionsInterface);
    expect(to).toHaveBeenCalledWith(SocketIOConnections);
    expect(inSingletonScope).toHaveBeenCalledOnce();
  });
});
