import { Injectable } from '@sellgar/app';

import { SocketIOConnection } from '../../connection/socket-io/socket-io.connection.ts';

import {
  SocketIOConnectionsInterface,
  type SocketIOConnectionInterface,
  type SocketIOConnectionOptions,
} from './socket-io-connections.interface.ts';

@Injectable()
export class SocketIOConnections implements SocketIOConnectionsInterface {
  private readonly connections = new Map<string, SocketIOConnectionInterface>();

  get(url: string, options?: SocketIOConnectionOptions): SocketIOConnectionInterface {
    const connection = this.connections.get(url);

    if (connection) {
      return connection;
    }

    const createdConnection = new SocketIOConnection(url, options);

    this.connections.set(url, createdConnection);

    return createdConnection;
  }
}
