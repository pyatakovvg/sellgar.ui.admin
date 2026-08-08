export interface HttpRequestConfig<D = unknown> {
  headers?: HeadersInit;
  params?: object;
  responseType?: 'json' | 'text' | 'blob';
  signal?: AbortSignal;
  withCredentials?: boolean;
  data?: D;
}
