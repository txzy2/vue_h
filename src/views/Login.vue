<script lang="ts" setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useUserStore} from '@/stores/user.store.ts';
import {storeToRefs} from 'pinia';
import {Eye, EyeOff, Loader2} from 'lucide-vue-next';
import {toast} from 'vue-sonner';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {Checkbox} from '@/components/ui/checkbox';
import UserService from '@/lib/services/user.service.ts';

const router = useRouter();
const userStore = useUserStore();
const {isLoading} = storeToRefs(userStore);

// Локальное состояние загрузки для формы
const localLoading = ref(false);

const formData = ref({
    login: '',
    password: '',
    rememberMe: false
});

const showPassword = ref(false);
const errors = ref<{login?: string; password?: string}>({});

// Validation
const validateForm = () => {
    errors.value = {};
    let isValid = true;

    if (!formData.value.login) {
        errors.value.login = 'Логин обязателен';
        isValid = false;
    }

    if (!formData.value.password) {
        errors.value.password = 'Пароль обязателен';
        isValid = false;
    } else if (formData.value.password.length < 6) {
        errors.value.password = 'Пароль должен содержать минимум 6 символов';
        isValid = false;
    }

    return isValid;
};

const handleSubmit = async () => {
    if (!validateForm()) {
        toast.error('Пожалуйста, проверьте введенные данные', {
            description: 'Все поля должны быть заполнены корректно',
            duration: 4000
        });
        return;
    }

    // Включаем локальную загрузку
    localLoading.value = true;

    try {
        const userService = new UserService();
        await userService.login({
            login: formData.value.login,
            password: formData.value.password
        });

        await userStore.fetchProfile();

        toast.success('Добро пожаловать!', {
            description: `Вы успешно вошли как ${userStore.profile?.name || formData.value.login}`,
            duration: 4000,
            action: {
                label: 'На главную',
                onClick: () => router.push('/')
            }
        });

        await router.push('/');
    } catch (error: any) {
        toast.error('Ошибка входа', {
            description: error.response?.data?.message || 'Неверный логин или пароль',
            duration: 5000
        });
    } finally {
        // Выключаем локальную загрузку
        localLoading.value = false;
    }
};

// Handle enter key
const onEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        handleSubmit();
    }
};
</script>

<template>
    <div class="min-h-[87vh] w-full flex flex-col items-center justify-center p-4">
        <Card class="w-full max-w-md shadow-2xl border-0 flex flex-col gap-10">
            <CardHeader class="space-y-1 text-center">
                <div class="flex justify-center mb-4">
                    <div
                        class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"
                    >
                        <svg
                            class="w-8 h-8 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                            />
                        </svg>
                    </div>
                </div>
                <CardTitle class="text-2xl font-bold">Добро пожаловать</CardTitle>
                <CardDescription> Войдите в свой аккаунт чтобы продолжить </CardDescription>
            </CardHeader>

            <CardContent class="flex flex-col gap-5">
                <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
                    <div class="">
                        <Label class="text-sm font-medium mb-2" for="login">
                            Логин
                            <span class="text-destructive">*</span>
                        </Label>
                        <Input
                            id="login"
                            v-model="formData.login"
                            :class="{'border-destructive': errors.login}"
                            :disabled="localLoading || isLoading"
                            autocomplete="username"
                            placeholder="Введите логин"
                            type="text"
                            @keyup="onEnter"
                        />
                        <p v-if="errors.login" class="text-sm text-destructive">
                            {{ errors.login }}
                        </p>
                    </div>

                    <!-- Password Field -->
                    <div class="">
                        <div class="flex items-center justify-between">
                            <Label class="text-sm font-medium" for="password">
                                Пароль
                                <span class="text-destructive">*</span>
                            </Label>
                            <Button
                                :disabled="localLoading || isLoading"
                                class="px-0 h-auto text-xs text-muted-foreground hover:text-primary"
                                variant="link"
                                @click="router.push('/forgot-password')"
                            >
                                Забыли пароль?
                            </Button>
                        </div>
                        <div class="relative">
                            <Input
                                id="password"
                                v-model="formData.password"
                                :class="{'border-destructive': errors.password}"
                                :disabled="localLoading || isLoading"
                                :type="showPassword ? 'text' : 'password'"
                                autocomplete="current-password"
                                placeholder="Введите пароль"
                                @keyup="onEnter"
                            />
                            <Button
                                :disabled="localLoading || isLoading"
                                class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                size="sm"
                                type="button"
                                variant="ghost"
                                @click="showPassword = !showPassword"
                            >
                                <Eye v-if="!showPassword" class="h-4 w-4 text-muted-foreground" />
                                <EyeOff v-else class="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </div>
                        <p v-if="errors.password" class="text-sm text-destructive">
                            {{ errors.password }}
                        </p>
                    </div>

                    <!-- Remember Me -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <Checkbox
                                id="remember"
                                v-model:checked="formData.rememberMe"
                                :disabled="localLoading || isLoading"
                            />
                            <Label
                                :class="{'opacity-50': localLoading || isLoading}"
                                class="text-sm font-normal cursor-pointer"
                                for="remember"
                            >
                                Запомнить меня
                            </Label>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <Button
                        :disabled="localLoading || isLoading"
                        class="w-full"
                        size="lg"
                        type="submit"
                    >
                        <Loader2
                            v-if="localLoading || isLoading"
                            class="mr-2 h-4 w-4 animate-spin"
                        />
                        {{ localLoading || isLoading ? 'Вход...' : 'Войти' }}
                    </Button>
                </form>

                <!-- Divider -->
                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <span class="w-full border-t" />
                    </div>
                    <!--                    <div class="relative flex justify-center text-xs uppercase">-->
                    <!--                        <span class="bg-background px-2 text-muted-foreground">-->
                    <!--                            Или продолжить с-->
                    <!--                        </span>-->
                    <!--                    </div>-->
                </div>

                <!-- Social Login Buttons -->
                <!--                <div class="grid grid-cols-2 gap-3">-->
                <!--                    <Button :disabled="localLoading || isLoading" class="w-full" variant="outline">-->
                <!--                        <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24">-->
                <!--                            <path-->
                <!--                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"-->
                <!--                                fill="#4285F4"-->
                <!--                            />-->
                <!--                            <path-->
                <!--                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"-->
                <!--                                fill="#34A853"-->
                <!--                            />-->
                <!--                            <path-->
                <!--                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"-->
                <!--                                fill="#FBBC05"-->
                <!--                            />-->
                <!--                            <path-->
                <!--                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"-->
                <!--                                fill="#EA4335"-->
                <!--                            />-->
                <!--                        </svg>-->
                <!--                        Google-->
                <!--                    </Button>-->
                <!--                    <Button :disabled="localLoading || isLoading" class="w-full" variant="outline">-->
                <!--                        <svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">-->
                <!--                            <path-->
                <!--                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z"-->
                <!--                            />-->
                <!--                        </svg>-->
                <!--                        GitHub-->
                <!--                    </Button>-->
                <!--                </div>-->
            </CardContent>

            <CardFooter class="flex flex-col space-y-2">
                <div class="text-center text-sm text-muted-foreground">
                    Нет аккаунта?
                    <Button
                        :disabled="localLoading || isLoading"
                        class="p-0 h-auto font-semibold"
                        variant="link"
                        @click="router.push('/register')"
                    >
                        Зарегистрироваться
                    </Button>
                </div>
            </CardFooter>
        </Card>
    </div>
</template>
