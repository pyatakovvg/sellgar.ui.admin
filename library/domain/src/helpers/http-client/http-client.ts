import { injectable, inject } from 'inversify';
import axios, { AxiosError, AxiosInstance } from 'axios';
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { ForbiddenException } from './exeptions/forbidden.exception.ts';
import { UnauthorizedException } from './exeptions/unauthorized.exception.ts';
import { ServiceUnavailableException } from './exeptions/service-unavailable.exception.ts';
import { InternalServerErrorException } from './exeptions/internal-server-error.exception.ts';

import { DeviceServiceInterface } from '../device';

import { HttpClientInterface } from './http-client.interface.ts';

@injectable()
export class HttpClient implements HttpClientInterface {
  private readonly _axios: AxiosInstance;
  private readonly _controller = new AbortController();

  constructor(@inject(DeviceServiceInterface) private readonly deviceService: DeviceServiceInterface) {
    this._axios = this.getInstance();

    this._axios.interceptors.request.use(this._requestFulfilled, this._rejected);
    this._axios.interceptors.response.use(this._responseFulfilled, this._rejected);
  }

  private getInstance(): AxiosInstance {
    return axios.create({
      withCredentials: true,
      signal: this._controller.signal,
      headers: {
        'X-Device-Id': this.deviceService.getUniqueId(),
      },
    });
  }

  private _requestFulfilled(config: InternalAxiosRequestConfig) {
    return config;
  }

  private _responseFulfilled(response: AxiosResponse) {
    return response.data;
  }

  private _rejected(error: any) {
    if (error instanceof AxiosError) {
      if (error.response) {
        switch (error.code) {
          case AxiosError.ERR_NETWORK:
            switch (error.response.status) {
              case 0:
                throw new ServiceUnavailableException(error.message);
              default:
                throw new ServiceUnavailableException(error.response.data);
            }
          case AxiosError.ERR_BAD_REQUEST:
            switch (error.response.status) {
              case 401: {
                throw new UnauthorizedException(error.response.data);
              }
              case 403:
                throw new ForbiddenException(error.response.data);
            }
        }
      } else {
        switch (error.code) {
          case AxiosError.ERR_NETWORK: {
            throw new ServiceUnavailableException(error.message);
          }
        }
      }
    }
    throw new InternalServerErrorException(error.message);
  }

  abort(reason?: any): void {
    this._controller.abort(reason);
  }

  get<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this._axios.get<T, R, D>(url, config);
  }

  post<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this._axios.post<T, R, D>(url, data, config);
  }

  put<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this._axios.put<T, R, D>(url, data, config);
  }

  patch<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this._axios.patch<T, R, D>(url, data, config);
  }

  delete<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this._axios.delete<T, R, D>(url, config);
  }
}
