import axios, { type AxiosInstance, type AxiosError, type AxiosRequestConfig } from 'axios'

export interface ApiClientConfig {
  baseURL?: string
  timeout?: number
}

export interface ApiError {
  status: number
  message: string
}

class HttpClient {
  private instance: AxiosInstance

  constructor(config: ApiClientConfig = {}) {
    const defaultConfig: ApiClientConfig = {
      baseURL: import.meta.env.VUE_APP_API_BASE_URL,
      timeout: 5000,
    }

    this.instance = axios.create({
      ...defaultConfig,
      ...config,
    })
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config)
  }

  public post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config)
  }

  public patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.patch(url, data, config)
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config)
  }
}

export { HttpClient }
