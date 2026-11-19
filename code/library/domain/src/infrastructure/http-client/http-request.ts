import axios, { AxiosError, type AxiosInstance } from 'axios';
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { BadGatewayException, BadRequestException, ConflictException, ForbiddenException, GatewayTimeoutException, HttpException, InternalServerErrorException, LockoutException, MethodNotAllowedException, NetworkError, NotFoundException, RequestTimeoutException, ServiceUnavailableException, TooManyRequestsException, TransportTimeoutError, UnauthorizedException, UnprocessableEntityException } from '@sellgar/app';

export class HttpRequest {
  private readonly axiosInstance: AxiosInstance;

  constructor(
    private readonly options: {
      readonly deviceId: string;
      readonly signal: AbortSignal;
    },
  ) {
    const timeoutSeconds = Number(import.meta.env['VITE_REQUEST_TIMEOUT']);

    this.axiosInstance = axios.create({
      headers: { 'X-Device-Id': options.deviceId },
      paramsSerializer: (params) => this.serializeParams(params),
      timeout: Number.isFinite(timeoutSeconds) ? timeoutSeconds * 1000 : undefined,
      withCredentials: true,
    });

    this.axiosInstance.interceptors.request.use(this.onRequestFulfilled, this.onRejected);
    this.axiosInstance.interceptors.response.use(this.onResponseFulfilled, this.onRejected);
  }

  get<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.request('get', url, undefined, config);
  }

  post<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.request('post', url, data, config);
  }

  patch<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.request('patch', url, data, config);
  }

  put<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.request('put', url, data, config);
  }

  delete<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.request('delete', url, undefined, config);
  }

  private readonly onRequestFulfilled = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => config;

  private readonly onResponseFulfilled = (response: AxiosResponse): AxiosResponse => response;

  private readonly onRejected = async (error: unknown): Promise<never> => {
    if (axios.isAxiosError(error)) {
      throw this.mapAxiosError(error);
    }

    if (error instanceof Error) {
      throw new Error(error.message || 'Unhandled HTTP client error.', { cause: error });
    }

    throw new Error('Unknown HTTP client error.', { cause: error });
  };

  private mapAxiosError(error: AxiosError): Error {
    if (error.code === AxiosError.ERR_CANCELED) {
      return error;
    }

    if (!error.response) {
      const request = this.createRequestSource(error);

      if (error.code === AxiosError.ECONNABORTED || error.code === AxiosError.ETIMEDOUT) {
        return new TransportTimeoutError('HTTP request timed out.', { cause: error, request });
      }

      if (error.code === AxiosError.ERR_NETWORK) {
        return new NetworkError('Backend response is unavailable.', { cause: error, request });
      }

      return new NetworkError(`HTTP transport failed: ${error.code ?? 'unknown_error'}.`, {
        cause: error,
        request,
      });
    }

    return this.mapHttpErrorByStatus(error.response.status, error.response.data, error);
  }

  private mapHttpErrorByStatus(status: number, payload: unknown, cause: AxiosError): Error {
    const options = { cause, request: this.createRequestSource(cause) };

    switch (status) {
      case 0:
        return new ServiceUnavailableException(payload, options);
      case 400:
        return new BadRequestException(payload, options);
      case 401:
        return new UnauthorizedException(payload, options);
      case 403:
        return new ForbiddenException(payload, options);
      case 404:
        return new NotFoundException(payload, options);
      case 405:
        return new MethodNotAllowedException(payload, options);
      case 408:
        return new RequestTimeoutException(payload, options);
      case 409:
        return new ConflictException(payload, options);
      case 422:
        return new UnprocessableEntityException(payload, options);
      case 423:
        return new LockoutException(payload, options);
      case 429:
        return new TooManyRequestsException(payload, options);
      case 500:
        return new InternalServerErrorException(payload, options);
      case 502:
        return new BadGatewayException(payload, options);
      case 503:
        return new ServiceUnavailableException(payload, options);
      case 504:
        return new GatewayTimeoutException(payload, options);
      default:
        return new HttpException(payload, status, options);
    }
  }

  private createRequestSource(error: AxiosError): { method?: string; url?: string } {
    return {
      method: error.config?.method?.toUpperCase(),
      url: error.config?.url,
    };
  }

  private toAxiosConfig<D>(config: AxiosRequestConfig<D> | undefined): AxiosRequestConfig<D> {
    return {
      ...(config ?? {}),
      signal: this.options.signal,
    };
  }

  private serializeParams(params: Record<string, unknown>): string {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (this.shouldSkipParamValue(value)) {
        continue;
      }

      if (Array.isArray(value)) {
        for (const item of value) {
          if (!this.shouldSkipParamValue(item)) {
            searchParams.append(key, String(item));
          }
        }
        continue;
      }

      searchParams.set(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
    }

    return searchParams.toString();
  }

  private shouldSkipParamValue(value: unknown): boolean {
    return value === undefined || value === null || value === '';
  }

  private async executeAxiosRequest<D, R>(
    method: 'get' | 'post' | 'patch' | 'put' | 'delete',
    url: string,
    data: D | undefined,
    config: AxiosRequestConfig<D>,
  ): Promise<R> {
    switch (method) {
      case 'get': {
        const response = await this.axiosInstance.get<R>(url, config);
        return response.data;
      }
      case 'post': {
        const response = await this.axiosInstance.post<R>(url, data, config);
        return response.data;
      }
      case 'patch': {
        const response = await this.axiosInstance.patch<R>(url, data, config);
        return response.data;
      }
      case 'put': {
        const response = await this.axiosInstance.put<R>(url, data, config);
        return response.data;
      }
      case 'delete': {
        const response = await this.axiosInstance.delete<R>(url, config);
        return response.data;
      }
    }
  }

  private request<T = any, R = T, D = any>(
    method: 'get' | 'post' | 'patch' | 'put' | 'delete',
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.executeAxiosRequest<D, R>(method, url, data, this.toAxiosConfig(config));
  }
}
