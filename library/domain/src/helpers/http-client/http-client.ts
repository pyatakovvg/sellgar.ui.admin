import { Inject, Injectable } from '@tiyn/app';

import { ForbiddenException } from './exeptions/forbidden.exception.ts';
import { UnauthorizedException } from './exeptions/unauthorized.exception.ts';
import { ServiceUnavailableException } from './exeptions/service-unavailable.exception.ts';
import { InternalServerErrorException } from './exeptions/internal-server-error.exception.ts';

import { DeviceServiceInterface } from '../device';

import { HttpClientInterface, type HttpRequestConfig } from './http-client.interface.ts';

@Injectable()
export class HttpClient implements HttpClientInterface {
  private readonly _controller = new AbortController();

  constructor(@Inject(DeviceServiceInterface) private readonly deviceService: DeviceServiceInterface) {}

  private async request<R = unknown, D = unknown>(
    method: string,
    url: string,
    data?: D,
    config: HttpRequestConfig<D> = {},
  ): Promise<R> {
    const requestUrl = this.createUrl(url, config.params);
    const headers = this.createHeaders(config.headers, data);

    try {
      const response = await fetch(requestUrl, {
        method,
        credentials: config.withCredentials === false ? 'same-origin' : 'include',
        headers,
        signal: config.signal ?? this._controller.signal,
        body: this.createBody(data),
      });

      const result = await this.parseResponse(response, config.responseType);

      if (!response.ok) {
        this.throwResponseError(response, result);
      }

      return result as R;
    } catch (error) {
      if (error instanceof ForbiddenException || error instanceof UnauthorizedException) {
        throw error;
      }
      if (error instanceof ServiceUnavailableException || error instanceof InternalServerErrorException) {
        throw error;
      }

      throw new ServiceUnavailableException(error instanceof Error ? error.message : String(error));
    }
  }

  private createUrl(url: string, params?: object): string {
    if (!params || Object.keys(params).length === 0) {
      return url;
    }

    const target = new URL(url, globalThis.location?.origin);

    for (const [key, value] of Object.entries(params) as [string, unknown][]) {
      if (value === undefined || value === null || value === '') {
        continue;
      }

      if (Array.isArray(value)) {
        for (const item of value) {
          target.searchParams.append(key, String(item));
        }
        continue;
      }

      if (typeof value === 'object') {
        target.searchParams.set(key, JSON.stringify(value));
        continue;
      }

      target.searchParams.set(key, String(value));
    }

    return target.toString();
  }

  private createHeaders<D>(headers: HeadersInit | undefined, data?: D): Headers {
    const result = new Headers(headers);

    result.set('X-Device-Id', this.deviceService.getUniqueId());

    if (data !== undefined && this.shouldUseJsonBody(data) && !result.has('Content-Type')) {
      result.set('Content-Type', 'application/json');
    }

    if (data instanceof FormData && result.get('Content-Type') === 'multipart/form-data') {
      result.delete('Content-Type');
    }

    return result;
  }

  private createBody<D>(data?: D): BodyInit | undefined {
    if (data === undefined) {
      return undefined;
    }

    if (!this.shouldUseJsonBody(data)) {
      return data as BodyInit;
    }

    return JSON.stringify(data);
  }

  private shouldUseJsonBody(data: unknown): boolean {
    return !(data instanceof FormData || data instanceof Blob || data instanceof URLSearchParams || typeof data === 'string');
  }

  private async parseResponse(response: Response, responseType?: HttpRequestConfig['responseType']): Promise<unknown> {
    if (response.status === 204) {
      return undefined;
    }

    if (response.ok && responseType === 'blob') {
      return await response.blob();
    }

    if (response.ok && responseType === 'text') {
      return await response.text();
    }

    const contentType = response.headers.get('Content-Type') ?? '';

    if (contentType.includes('application/json')) {
      return await response.json();
    }

    const text = await response.text();

    return text === '' ? undefined : text;
  }

  private throwResponseError(response: Response, data: unknown): never {
    const payload = this.createExceptionPayload(data);

    switch (response.status) {
      case 0:
        throw new ServiceUnavailableException(payload);
      case 401:
        throw new UnauthorizedException(payload);
      case 403:
        throw new ForbiddenException(payload);
      case 503:
        throw new ServiceUnavailableException(payload);
      default:
        throw new InternalServerErrorException(payload);
    }
  }

  private createExceptionPayload(data: unknown): string | Record<string, any> | undefined {
    if (data === undefined) {
      return undefined;
    }

    if (typeof data === 'string') {
      return data;
    }

    if (data && typeof data === 'object') {
      return data as Record<string, any>;
    }

    return String(data);
  }

  abort(reason?: any): void {
    this._controller.abort(reason);
  }

  get<T = any, R = T, D = any>(url: string, config?: HttpRequestConfig<D>): Promise<R> {
    return this.request<R, D>('GET', url, undefined, config);
  }

  post<T = any, R = T, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<R> {
    return this.request<R, D>('POST', url, data, config);
  }

  put<T = any, R = T, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<R> {
    return this.request<R, D>('PUT', url, data, config);
  }

  patch<T = any, R = T, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<R> {
    return this.request<R, D>('PATCH', url, data, config);
  }

  delete<T = any, R = T, D = any>(url: string, config?: HttpRequestConfig<D>): Promise<R> {
    return this.request<R, D>('DELETE', url, undefined, config);
  }
}
