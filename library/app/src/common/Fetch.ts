import axios, { Axios, AxiosError } from 'axios';

import { emmiter } from '../application.emitter';
import { APPLICATION_ERROR, APPLICATION_UNAUTHORIZED } from '../variables';

import { ForbiddenException } from '../exeptions/forbidden.exception.ts';
import { UnauthorizedException } from '../exeptions/unauthorized.exception.ts';
import { ServiceUnavailableException } from '../exeptions/service-unavailable.exception.ts';
import { InternalServerErrorException } from '../exeptions/internal-server-error.exception.ts';

import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export class Fetch {
  private readonly _axios!: Axios;
  private readonly _controller = new AbortController();

  constructor(config: AxiosRequestConfig) {
    this._axios = axios.create({
      ...config,
      withCredentials: true,
      signal: this._controller.signal,
    });

    this._axios.interceptors.request.use(this._requestFulfilled, this._rejected);
    this._axios.interceptors.response.use(this._responseFulfilled, this._rejected);
  }

  private _requestFulfilled(config: InternalAxiosRequestConfig) {
    return config;
  }

  private _responseFulfilled(response: AxiosResponse) {
    return response;
  }

  private _rejected(error: any) {
    if (error instanceof AxiosError) {
      if (error.response) {
        switch (error.code) {
          case AxiosError.ERR_NETWORK:
            switch (error.response.status) {
              case 0:
                emmiter.emit('application', {
                  type: APPLICATION_ERROR,
                  data: 'Service not available',
                });
                return error;
              default:
                throw new ServiceUnavailableException(error.response.data);
            }
          case AxiosError.ERR_BAD_REQUEST:
            switch (error.response.status) {
              case 401: {
                emmiter.emit('application', {
                  type: APPLICATION_UNAUTHORIZED,
                  data: error.response.data,
                });
                throw new UnauthorizedException(error.response.data);
              }
              case 403:
                throw new ForbiddenException(error.response.data);
            }
        }
      } else {
        switch (error.code) {
          case AxiosError.ERR_NETWORK: {
            emmiter.emit('application', {
              type: APPLICATION_UNAUTHORIZED,
              data: 'Service not available',
            });
            return void 0;
          }
        }
      }
    }
    throw new InternalServerErrorException(error.message);
  }

  abort(reason?: any): void {
    this._controller.abort(reason);
  }

  async send<R = any, T = any>(config: Omit<AxiosRequestConfig<T>, 'baseURL'>) {
    const response: AxiosResponse<R> = await this._axios.request(config);
    return response.data;
  }
}
