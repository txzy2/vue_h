import {defineStore} from 'pinia';
import UserService from '@/lib/services/user.service';
import {computed, ref} from 'vue';
import type {UserProfile} from '@/lib/types/user.types.ts';
import CookieService from '@/lib/services/cookie.service';

const userService = new UserService();

export const useUserStore = defineStore('user', () => {
    const profile = ref<UserProfile | null>(null);
    const isLoading = ref(false);
    const isInitialized = ref(false);

    async function fetchProfile() {
        if (isInitialized.value && profile.value !== null) {
            return profile.value;
        }

        // Не загружаем без токена
        if (!CookieService.get('access_token')) {
            return null;
        }

        // Не загружаем, если уже загружается
        if (isLoading.value) {
            return profile.value;
        }

        isLoading.value = true;
        try {
            profile.value = await userService.fetchUserProfile();
            isInitialized.value = true;
        } catch (error) {
            console.error('Failed to fetch profile:', error);
            profile.value = null;
        } finally {
            isLoading.value = false;
        }

        return profile.value;
    }

    function setProfile(data: UserProfile) {
        profile.value = data;
        isInitialized.value = true;
    }

    async function logout() {
        isLoading.value = true;
        try {
            await userService.logout();
        } finally {
            profile.value = null;
            isInitialized.value = false;
            isLoading.value = false;
        }
    }

    const isAuthenticated = computed(() => profile.value !== null);
    const isAdmin = computed(() => profile.value?.role === 'Admin');
    const isSuperUser = computed(() => profile.value?.role === 'SuperUser');

    return {
        profile,
        isLoading,
        isAuthenticated,
        isAdmin,
        isSuperUser,
        setProfile,
        fetchProfile,
        logout
    };
});
