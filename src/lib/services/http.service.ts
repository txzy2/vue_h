import axios, {AxiosError, type AxiosResponse} from 'axios';

export interface ApiError {
    status: boolean;
    error: string;
}

class HttpService {
    private token: string | null = null;

    public constructor() {
        this.initializeToken();
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
            const response: AxiosResponse<T> = await axios.get(import.meta.env.VITE_API_URL + url, {
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
    public async post<T extends object, R extends object>(
        url: string,
        data?: T
    ): Promise<R | ApiError> {
        try {
            const response: AxiosResponse<R> = await axios.post(
                import.meta.env.VITE_API_URL + url,
                data
            );
            return response.data;
        } catch (error: unknown) {
            return this.handleError(error);
        }
    }

    /**
     * Инициализирует токен авторизации из localStorage
     * @private
     * @returns {void}
     */
    private initializeToken(): void {
        this.token = localStorage.getItem('token');

        if (this.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        }
    }

    private handleError(error: unknown): ApiError {
        if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
                return {
                    status: false,
                    error: 'Unauthorized: Please login again'
                };
            }

            return {
                status: false,
                error: error.message
            };
        }

        return {
            status: false,
            error: 'Unknown error occurred'
        };
    }
}

export default HttpService;
