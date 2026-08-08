import { SocketTicketEntity } from '../domain/socket-ticket.entity.ts';

export abstract class AuthServiceInterface {
  abstract signOut(): Promise<void>;
  abstract signIn(email: string, password: string): Promise<void>;
  abstract issueSocketTicket(): Promise<SocketTicketEntity>;
}
