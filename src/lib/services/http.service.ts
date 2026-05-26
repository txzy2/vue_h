import axios, {AxiosError, type AxiosInstance, type AxiosResponse} from 'axios';
import CookieService from '@/lib/services/cookie.service.ts';

export interface ApiError {
    status: boolean;
    error: string;
}

class HttpService {
    private readonly client: AxiosInstance;

    public constructor() {
        this.client = axios.create({baseURL: import.meta.env.VITE_API_URL});

        this.client.interceptors.request.use(config => {
            const token = CookieService.get('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
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
                        const res = await this.client.post<{token: string}>('/auth/refresh');
                        CookieService.set('token', res.data.token);
                        return this.client(original);
                    } catch {
                        CookieService.remove('token');
                        window.location.href = '/login';
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
    public async post<T extends object, R extends object>(
        url: string,
        data?: T
    ): Promise<R | ApiError> {
        try {
            const response: AxiosResponse<R> = await this.client.post(
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

export default new HttpService();
