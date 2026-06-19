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

    static pluralize(count: number): string {
        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;
        const countStr = count.toString();

        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return countStr + ' мест';
        }

        if (lastDigit === 1) {
            return countStr + ' место';
        }

        if (lastDigit >= 2 && lastDigit <= 4) {
            return countStr + ' места';
        }

        return countStr + ' мест';
    }

    static getTimeGreeting = () => {
        const hour = new Date().getHours();

        if (hour >= 0 && hour < 6) return {text: 'Доброй ночи', emoji: '🌙'};
        if (hour >= 6 && hour < 12) return {text: 'Доброе утро', emoji: '🌅'};
        if (hour >= 12 && hour < 17) return {text: 'Добрый день', emoji: '☀️'};
        return {text: 'Добрый вечер', emoji: '🌆'};
    };
}

export default BaseHelper;
