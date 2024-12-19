export abstract class AuthServiceInterface {
  abstract signIn(email: string, password: string): Promise<void>;
}
