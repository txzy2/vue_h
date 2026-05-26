import type {ApiResponse} from '@/lib/services/http.service.ts';

export type UserProfile = {
    sub: string;
    email: string;
    login: string;
    name: string;
    role: 'SuperUser' | 'Admin' | 'User' | string;
    active: 'Active' | 'Inactive' | 'Blocked' | string;
    sid: string;
    photo?: string;
};

export type UserLoginRequest = {
    login: string;
    password: string;
};

export type UserLoginResponse = {
    userId: string;
    tokens: {
        access_token: string;
        refresh_token: string;
    };
};

export type UserProfileResponse = ApiResponse<UserProfile>;
export type UserLoginApiResponse = ApiResponse<UserLoginResponse>;
