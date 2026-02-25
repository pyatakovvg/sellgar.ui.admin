export abstract class MiddlewareInterface {
  protected next?: Middleware;

  setNext(middleware: Middleware): Middleware {
    this.next = middleware;
    return middleware;
  }

  abstract handle(request: HttpRequest): Promise<HttpResponse | null>;

  protected async handleNext(request: HttpRequest): Promise<HttpResponse | null> {
    if (this.next) {
      return await this.next.handle(request);
    }
    return null;
  }
}
