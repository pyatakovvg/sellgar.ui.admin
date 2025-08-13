export abstract class AuthGatewayInterface {
  abstract signIn(email: string, password: string): Promise<void>;
  abstract signOut(): Promise<void>;
}
