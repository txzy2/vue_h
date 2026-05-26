import {defineStore} from 'pinia';
import UserService from '@/lib/services/user.service';
import {computed, ref} from 'vue';
import type {UserProfile} from '@/lib/types/user.types.ts';

const userService = new UserService();

export const useUserStore = defineStore('user', () => {
    const profile = ref<UserProfile | null>(null);
    const isLoading = ref(false);

    async function fetchProfile() {
        isLoading.value = true;
        profile.value = await userService.fetchUserProfile();
        isLoading.value = false;
    }

    async function logout() {
        await userService.logout();
        profile.value = null;
    }

    const isAuthenticated = computed(() => profile.value !== null);

    return {profile, isLoading, isAuthenticated, fetchProfile, logout};
});
