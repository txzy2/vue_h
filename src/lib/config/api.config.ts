export const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_URL,
    publicRoutes: ['/auth/login', '/auth/register', '/auth/refresh']
} as const;
