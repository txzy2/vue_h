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
                const original = error.config;

                if (error.response?.status === 401 && !original._retry) {
                    original._retry = true;
                    try {
                        const res = await this.client.post<{
                            access_token: string;
                            refresh_token: string;
                        }>(import.meta.env.VITE_API_URL + '/auth/refresh');
                        CookieService.set('access_token', res.data.access_token);
                        return this.client(original);
                    } catch {
                        // CookieService.remove('access_token');
                        // window.location.href = '/login';
                        console.log('blabla');
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
            const response: AxiosResponse<T> = await this.client.get(
                import.meta.env.VITE_API_URL + url,
                {
                    params
                }
            );
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
        console.log(import.meta.env.VITE_API_URL);
        try {
            const response: AxiosResponse<T> = await this.client.post(
                import.meta.env.VITE_API_URL + url,
                data
            );
            return response.data;
        } catch (error: unknown) {
            return this.handleError(error);
        }
    }

    private handleError(error: unknown): ApiError {
        if (error instanceof AxiosError) {
            return {status: false, error: error.message};
        }
        return {status: false, error: 'Unknown error occurred'};
    }
}

export default HttpService;
