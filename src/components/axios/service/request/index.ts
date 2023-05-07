import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

/** axios 封装 */
class Request {
  private readonly instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);

    // 拦截器，传入成功与失败的回调
    this.instance.interceptors.request.use((reqConfig) => {
      window.console.log('全局**请求成功**拦截');
      return reqConfig;
    }, (e) => {
      window.console.log('全局**请求失败**拦截');
      return e;
    });

    this.instance.interceptors.response.use((resp) => {
      window.console.log('全局**响应成功**拦截');
      // 直接将data拿出来，减少一层
      return resp.data;
    }, (e) => {
      window.console.log('全局**响应失败**拦截');
      return e;
    });
  }

  request<T = any>(config: AxiosRequestConfig) {
    return this.instance.request<any, T>(config);
  }

  get<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'GET' });
  }

  post<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'POST' });
  }
}

export default Request;
