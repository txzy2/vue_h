import {API_CONFIG} from '@/lib/config/api.config.ts';
import HttpService from '@/lib/services/http.service.ts';
import UserService from '@/lib/services/user.service.ts';

const httpService = new HttpService(API_CONFIG.baseURL);

const userService = new UserService(httpService);

export const container = {
    httpService,
    userService
} as const;
