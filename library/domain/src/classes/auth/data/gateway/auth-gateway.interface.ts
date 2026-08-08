import { SocketTicketEntity } from '../../domain/socket-ticket.entity.ts';

export abstract class AuthGatewayInterface {
  abstract signIn(email: string, password: string): Promise<void>;
  abstract signOut(): Promise<void>;
  abstract issueSocketTicket(): Promise<SocketTicketEntity>;
}
