<script lang="ts" setup>
import {useI18n} from 'vue-i18n';
import BaseHelper from '@/lib/common/base.helper.ts';
import {useUserStore} from '@/stores/user.store.ts';
import {storeToRefs} from 'pinia';
import {computed} from 'vue';
import {useDark} from '@vueuse/core';
import {Spinner} from '@/components/ui/spinner';
import {LogIn, User} from 'lucide-vue-next';
import ThemeSwitcher from '@/components/ui/theme/ThemeSwitcher.vue';

const {t} = useI18n();
const isDark = useDark();
const textColor = computed(() => (isDark.value ? '#ffffff' : '#000000'));

const userStore = useUserStore();
const {profile: userProfile} = storeToRefs(userStore);

const navListItems = [
    {name: 'home', link: '/'},
    {name: 'about', link: '/about'},
    {name: 'contact', link: '/contact'}
];
</script>

<template>
    <header class="!m-auto flex h-[7vh] w-[90%] items-center justify-between border-b px-5">
        <!-- Logo -->
        <div
            class="flex cursor-pointer items-center gap-2.5 transition duration-300 ease-in-out hover:scale-105"
            @click="BaseHelper.redirectTo('/')"
        >
            <img alt="Logo" class="logo" height="32" src="@/assets/logo.svg" width="32" />
            <span>Logo</span>
        </div>

        <!-- Right -->
        <div class="flex items-center justify-center gap-5">
            <!-- Nav -->
            <nav v-if="$route.name !== 'dashboard'">
                <ul class="flex items-center gap-2.5">
                    <li
                        v-for="item in navListItems"
                        :key="item.name"
                        class="list-none transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
                        @click="BaseHelper.redirectTo(item.link)"
                    >
                        {{ t(`navigation.${item.name}`) }}
                    </li>
                </ul>
            </nav>

            <ThemeSwitcher />

            <!-- Loading -->
            <div v-if="userStore.isLoading">
                <Spinner />
            </div>

            <!-- Profile -->
            <!-- TODO: Сделать выпадающее меню если авторизирован -->
            <div
                v-else-if="userProfile"
                class="flex cursor-pointer items-center gap-2.5"
                @click="BaseHelper.redirectTo('/about')"
            >
                <img
                    v-if="userProfile.photo"
                    :src="userProfile.photo"
                    alt="UserPhoto"
                    class="h-[25px] w-[25px] rounded-full border border-border"
                />

                <User
                    v-else
                    :style="{color: textColor}"
                    class="h-[25px] w-[25px] rounded-full border border-border"
                />

                <span
                    class="text-[14px] font-semibold transition duration-300 ease-in-out hover:scale-105 hover:text-muted-foreground"
                >
                    {{ userProfile.name }}
                </span>
            </div>

            <!-- Login -->
            <div
                v-else
                class="flex cursor-pointer items-center gap-[5px] transition duration-300 ease-in-out hover:scale-105"
                @click="BaseHelper.redirectTo('/login')"
            >
                <LogIn class="h-[18px] w-[18px]" />

                {{ t('navigation.login') }}
            </div>
        </div>
    </header>
</template>
