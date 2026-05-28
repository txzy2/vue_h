import {CookieService} from '@/lib/services/cookie.service.ts';
import {API_CONFIG} from '@/lib/config/api.config.ts';
import HttpService from '@/lib/services/http.service.ts';
import UserService from '@/lib/services/user.service.ts';

const cookieService = new CookieService();
const httpService = new HttpService(API_CONFIG.baseURL, cookieService);

const userService = new UserService(httpService, cookieService);

export const container = {
    cookieService,
    httpService,
    userService
} as const;
