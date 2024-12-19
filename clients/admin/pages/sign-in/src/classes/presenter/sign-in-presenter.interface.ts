export abstract class SignInPresenterInterface {
  abstract get formInProcess(): boolean;
  abstract signIn(email: string, password: string): Promise<boolean>;
}
