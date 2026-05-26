import type {UserProfile} from '@/lib/types/user.types.ts';
import BaseHelper from '@/lib/common/base.helper.ts';
import HttpService from '@/lib/services/http.service.ts';
import CookieService from '@/lib/services/cookie.service.ts';

class UserService {
    public constructor() {}

    public async fetchUserProfile(): Promise<UserProfile | null> {
        const result = await HttpService.get<UserProfile>('/user');

        if (BaseHelper.isApiError(result)) {
            console.warn('Failed to load profile:', result.error);
            return {
                name: 'txzy'
            };
        }

        return result;
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
        await HttpService.post('/api/logout');
        CookieService.remove('token');
    }
}

export default UserService;
