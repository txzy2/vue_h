import type {
    UserLoginApiResponse,
    UserLoginRequest,
    UserLoginResponse,
    UserProfile,
    UserProfileResponse
} from '@/lib/types/user.types.ts';
import BaseHelper from '@/lib/common/base.helper.ts';
import HttpService from '@/lib/services/http.service.ts';
import CookieService from '@/lib/services/cookie.service.ts';
import {useUserStore} from '@/stores/user.store.ts';

class UserService {
    public constructor(
        private readonly httpService: HttpService,
        private readonly cookieService: CookieService
    ) {}

    public async fetchUserProfile(): Promise<UserProfile | null> {
        if (!this.cookieService.get('access_token')) {
            console.log('No access token found, skipping profile fetch');
            return null;
        }

        const result = await this.httpService.get<UserProfileResponse>('/user/me');

        if (BaseHelper.isApiError(result)) {
            console.warn('Failed to load profile:', result.error);
            return null;
        }

        if (result.success && result.data) {
            const {data} = result;
            console.log('User profile:', data);

            return {
                sub: data.sub,
                email: data.email,
                login: data.login,
                name: data.name,
                role: data.role,
                active: data.active,
                sid: data.sid
            };
        }

        return null;
    }

    public async login(data: UserLoginRequest): Promise<boolean> {
        try {
            const result = await this.httpService.post<UserLoginApiResponse>('/auth/login', data);

            if (BaseHelper.isApiError(result)) {
                console.warn('Login failed:', result.error);
                return false;
            }

            if (result.success && result.data) {
                const {data: loginData} = result;

                CookieService.remove('access_token');
                CookieService.remove('refresh_token');

                CookieService.set('access_token', loginData.tokens.access_token);
                CookieService.set('refresh_token', loginData.tokens.refresh_token);

                const user = await this.fetchUserProfile();
                if (!user) {
                    console.warn('Failed to load user profile after login');
                    CookieService.remove('access_token');
                    CookieService.remove('refresh_token');
                    return false;
                }

                const userStore = useUserStore();
                await userStore.setProfile(user);

                return true;
            }

            return false;
        } catch (error) {
            console.error('Login error:', error);
            // Очищаем токены при ошибке
            CookieService.remove('access_token');
            CookieService.remove('refresh_token');
            return false;
        }
    }

    // public async updateUserProfile(data: Partial<UserProfile>): Promise<UserProfile | null> {
    //     const result = await this.httpService.patch<UserProfile>('/api/user', data);
    //
    //     if (BaseHelper.isApiError(result)) {
    //         console.warn('Failed to update profile:', result.error);
    //         return null;
    //     }
    //
    //     return result;
    // }

    public async logout(): Promise<void> {
        await this.httpService.post('/api/logout');
        CookieService.remove('token');
    }
}

export default UserService;
