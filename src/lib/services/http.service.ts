import axios, {AxiosError, type AxiosInstance, type AxiosResponse} from 'axios';
import CookieService from '@/lib/services/cookie.service.ts';
import {API_CONFIG} from '@/lib/config/api.config.ts';

export interface ApiError {
    status: boolean;
    error: string;
}

export type ApiResponse<T> = {
    success: boolean;
    data: T;
};

class HttpService {
    private client: AxiosInstance;

    private isRefreshing = false;
    private failedQueue: any[] = [];

    private processQueue = (error: any, token: string | null = null) => {
        this.failedQueue.forEach(prom => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        });

        this.failedQueue = [];
    };

    public constructor(baseURL: string) {
        this.client = axios.create({baseURL});
        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.client = axios.create({baseURL: API_CONFIG.baseURL});

        this.client.interceptors.request.use(config => {
            const isPublic = API_CONFIG.publicRoutes.some(route => config.url?.startsWith(route));

            if (!isPublic) {
                const token = CookieService.get('access_token');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
            }

            return config;
        });

        this.client.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    if (this.isRefreshing) {
                        return new Promise((resolve, reject) => {
                            this.failedQueue.push({resolve, reject});
                        }).then(token => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            return this.client(originalRequest);
                        });
                    }

                    originalRequest._retry = true;
                    this.isRefreshing = true;

                    try {
                        const refreshToken = CookieService.get('refresh_token');

                        const {data} = await axios.post('/api/v1/auth/refresh', {
                            refresh_token: refreshToken
                        });

                        const accessToken = data.data.access_token;
                        const newRefreshToken = data.data.refresh_token;

                        CookieService.set('access_token', accessToken);
                        CookieService.set('refresh_token', newRefreshToken);

                        this.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

                        this.processQueue(null, accessToken);

                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                        return this.client(originalRequest);
                    } catch (err) {
                        this.processQueue(err, null);

                        CookieService.remove('access_token');
                        CookieService.remove('refresh_token');

                        window.location.href = '/login';

                        return Promise.reject(err);
                    } finally {
                        this.isRefreshing = false;
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    /**
     * Выполняет GET запрос к API
     * @template T - Тип ожидаемого ответа от сервера
     * @param {string} url - Относительный путь эндпоинта (будет добавлен к базовому URL из .env)
     * @param {Record<string, unknown>} [params] - Query параметры запроса
     * @returns {Promise<T | ApiError>} Промис с данными типа T или объектом ошибки
     */
    public async get<T extends object>(
        url: string,
        params?: Record<string, unknown>
    ): Promise<T | ApiError> {
        try {
            const response: AxiosResponse<T> = await this.client.get(API_CONFIG.baseURL + url, {
                params
            });
            return response.data;
        } catch (error: unknown) {
            return this.handleError(error);
        }
    }

    /**
     * Выполняет POST запрос к API
     * @template T - Тип отправляемых данных
     * @template R - Тип ожидаемого ответа от сервера
     * @param {string} url - Относительный путь эндпоинта (будет добавлен к базовому URL из .env)
     * @param {T} [data] - Данные для отправки в теле запроса
     * @returns {Promise<R | ApiError>} Промис с данными типа R или объектом ошибки
     *
     */
    public async post<T extends object>(url: string, data?: object): Promise<T | ApiError> {
        try {
            const response: AxiosResponse<T> = await this.client.post(
                API_CONFIG.baseURL + url,
                data
            );
            return response.data;
        } catch (error: unknown) {
            return this.handleError(error);
        }
    }

    public async delete<T extends object>(url: string): Promise<T | ApiError> {
        try {
            const response: AxiosResponse<T> = await this.client.delete(API_CONFIG.baseURL + url);
            return response.data;
        } catch (error: unknown) {
            return this.handleError(error);
        }
    }

    private handleError(error: unknown): ApiError {
        if (error instanceof AxiosError) {
            return {status: false, error: error.response?.data.error};
        }
        return {status: false, error: 'Unknown error occurred'};
    }
}

export default HttpService;
