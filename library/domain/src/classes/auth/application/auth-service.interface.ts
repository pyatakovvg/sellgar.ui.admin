export abstract class AuthServiceInterface {
  abstract signOut(): Promise<void>;
  abstract signIn(email: string, password: string): Promise<void>;
}
