import router from '@/router';
import type {ApiError} from '@/lib/services/http.service.ts';

class BaseHelper {
    static redirectTo(route: string): void {
        router.push(route).then();
    }

    /**
     * Проверяет, является ли результат ошибкой API
     * @param result - Проверяемый объект
     * @returns true если результат - ошибка API
     */
    static isApiError<T extends object>(result: T | ApiError): result is ApiError {
        return !(result as ApiError).status && 'error' in result;
    }
}

export default BaseHelper;
