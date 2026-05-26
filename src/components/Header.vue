<script lang="ts" setup>
import {useI18n} from 'vue-i18n';
import BaseHelper from '@/lib/common/base.helper.ts';
import {useUserStore} from '@/stores/user.store.ts';
import {storeToRefs} from 'pinia';
import {computed} from 'vue';
import {useDark} from '@vueuse/core';
import {Spinner} from '@/components/ui/spinner';
import {LogIn, User, Spotlight} from 'lucide-vue-next';
import ThemeSwitcher from '@/components/ui/theme/ThemeSwitcher.vue';

const {t} = useI18n();
const isDark = useDark();
const textColor = computed(() => (isDark.value ? '#ffffff' : '#000000'));

const userStore = useUserStore();
const {profile: userProfile} = storeToRefs(userStore);

const isAdmin = computed(() => {
    return userProfile.value !== null && userProfile.value.role === 'Admin';
});
const isSuperUser = computed(() => {
    return userProfile.value !== null && userProfile.value.role === 'SuperUser';
});

const navListItems = [
    {name: 'home', link: '/'},
    {name: 'about', link: '/about'},
    {name: 'contact', link: '/contact'}
];
</script>

<template>
    <header
        :class="isDark ? 'bg-neutral-900/90 border-neutral-800' : 'bg-white border-gray-200'"
        class="!m-auto relative flex h-[7vh] w-[90%] items-center justify-between rounded-lg px-6 transition-all duration-300"
    >
        <!-- Акцентная полоса сверху -->
        <div
            :class="
                isDark
                    ? 'bg-gradient-to-r from-transparent via-amber-600/50 to-transparent'
                    : 'bg-gradient-to-r from-transparent via-amber-500 to-transparent'
            "
            class="absolute top-0 left-1/2 h-0.5 w-1/3 -translate-x-1/2 rounded-full transition-all duration-300"
        ></div>

        <div
            class="flex items-center gap-2 text-[19px] cursor-pointer group"
            @click="BaseHelper.redirectTo('/')"
        >
            <span
                class="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                style="position: relative; top: -10px; right: -2px; line-height: 0"
            >
                <Spotlight size="20" />
            </span>
            <span
                class="transition-all duration-300 group-hover:tracking-wider"
                style="text-shadow: 0 0 0px transparent"
                @mouseenter="
                    (e: MouseEvent) =>
                        ((e.target as HTMLElement).style.textShadow = isDark
                            ? '0 0 12px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.4)'
                            : '0 0 8px rgba(0,0,0,0.25), 0 0 20px rgba(0,0,0,0.12)')
                "
                @mouseleave="
                    (e: MouseEvent) =>
                        ((e.target as HTMLElement).style.textShadow = '0 0 0px transparent')
                "
            >
                HooBoo
            </span>
        </div>

        <!-- Right -->
        <div class="flex items-center justify-center gap-5">
            <!-- Nav -->
            <nav v-if="$route.name !== 'dashboard'" class="flex items-center gap-2">
                <ul :class="`flex items-center gap-2.5 ${isSuperUser ? 'hidden' : ''}`">
                    <li
                        v-for="item in navListItems"
                        :key="item.name"
                        class="list-none transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
                        @click="BaseHelper.redirectTo(item.link)"
                    >
                        {{ t(`navigation.${item.name}`) }}
                    </li>
                </ul>

                <ul v-if="isSuperUser">
                    <li>123</li>
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
                :title="userProfile.email"
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

                <div
                    class="flex flex-col text-[14px] font-semibold transition duration-300 ease-in-out hover:text-muted-foreground"
                >
                    <div class="m-0">
                        <span>{{ userProfile.name }}</span>
                        <span class="text-[10px] mr-1 text-[#C04000]">
                            ({{ isSuperUser || isAdmin ? userProfile.role : '' }})
                        </span>
                    </div>
                    <span class="text-[10px]">({{ userProfile.email }})</span>
                </div>
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

<style scoped>
/* Градиентная граница для светлой темы */
header {
    position: relative;
    background-clip: padding-box;
}

header::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 0.75rem;
    padding: 1px;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.02));
    -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
}

.dark header::before {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.03));
}
</style>
