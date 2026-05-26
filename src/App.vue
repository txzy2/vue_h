<script lang="ts" setup>
import {onMounted, provide, ref} from 'vue';
import type {UserProfile} from '@/lib/types/user.types.ts';
import UserService from '@/lib/services/user.service.ts';

const userService = new UserService();
const userProfile = ref<UserProfile | null>(null);
const isLoading = ref(true);

// Функция загрузки профиля с использованием сервиса
const fetchUserProfile = async () => {
    isLoading.value = true;
    userProfile.value = await userService.fetchUserProfile();
    isLoading.value = false;
};

// Функция выхода
const logout = async () => {
    await userService.logout();
    userProfile.value = null;
};

// Предоставляем данные и методы для дочерних компонентов
provide('userProfile', userProfile);
provide('isLoading', isLoading);
provide('logout', logout);
provide('fetchUserProfile', fetchUserProfile);

onMounted(() => {
    fetchUserProfile();
});
</script>

<template>
    <Header />
    <main>
        <RouterView />
    </main>
    <Footer />
</template>

<style scoped>
main {
    min-height: calc(100vh - 7vh - 60px); /* header + footer */

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
