export interface HttpRequestConfig<D = unknown> {
  headers?: HeadersInit;
  params?: object;
  responseType?: 'json' | 'text' | 'blob';
  signal?: AbortSignal;
  withCredentials?: boolean;
  data?: D;
}

export abstract class HttpClientInterface {
  abstract abort(reason?: any): void;
  abstract get<T = any, R = T, D = any>(url: string, config?: HttpRequestConfig<D>): Promise<R>;
  abstract post<T = any, R = T, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<R>;
  abstract put<T = any, R = T, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<R>;
  abstract patch<T = any, R = T, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<R>;
  abstract delete<T = any, R = T, D = any>(url: string, config?: HttpRequestConfig<D>): Promise<R>;
}
