<script lang="ts" setup>
import {useI18n} from 'vue-i18n';
import {ref, computed, onUnmounted} from 'vue';
import BaseHelper from '@/lib/common/base.helper.ts';
import {useUserStore} from '@/stores/user.store.ts';
import {storeToRefs} from 'pinia';
import {useDark} from '@vueuse/core';
import {Spinner} from '@/components/ui/spinner';
import {
    LogIn,
    User,
    Spotlight,
    Menu,
    X,
    Settings,
    LogOut,
    Mail,
    ChevronRight
} from 'lucide-vue-next';
import ThemeSwitcher from '@/components/ui/theme/ThemeSwitcher.vue';
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {useClock} from '@/composables/useClock';

const {t} = useI18n();
const isDark = useDark();
const textColor = computed(() => (isDark.value ? '#ffffff' : '#000000'));
const isMobileMenuOpen = ref(false);

const userStore = useUserStore();
const {profile: userProfile, isAuthenticated} = storeToRefs(userStore);

const isAdmin = computed(() => {
    return userProfile.value !== null && userProfile.value.role === 'Admin';
});
const isSuperUser = computed(() => {
    return userProfile.value !== null && userProfile.value.role === 'SuperUser';
});

const {currentTime} = useClock();

const unreadCount = 3;

const navListItems = [
    {name: 'home', link: '/'},
    {name: 'about', link: '/about'},
    {name: 'contact', link: '/contact'}
];

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
};

const handleLogout = async () => {
    await userStore.logout(); // или твой метод
    BaseHelper.redirectTo('/');
};
</script>

<template>
    <header
        :class="isDark ? 'bg-neutral-900/90 border-neutral-800' : 'bg-white border-gray-200'"
        class="m-auto! relative flex h-[7vh] w-[90%] items-center justify-between rounded-lg px-4 md:px-6 transition-all duration-300"
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

        <!-- Logo -->
        <div
            class="flex items-center gap-2 text-[19px] cursor-pointer group"
            @click="BaseHelper.redirectTo('/')"
        >
            <span
                class="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                style="position: relative; top: -10px; right: -2px; line-height: 0"
            >
                <Spotlight :size="20" />
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

        <div class="absolute left-1/2 right-1/2" v-if="isAuthenticated">
            {{ currentTime }}
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center justify-center gap-3">
            <!-- Nav -->
            <nav class="flex items-center gap-2">
                <!-- Обычная навигация — скрыта для SuperUser -->
                <template v-if="!isSuperUser && !isAdmin">
                    <button
                        v-for="item in navListItems"
                        :key="item.name"
                        class="transition duration-300 hover:scale-105 cursor-crosshair text-[14px]"
                        @click="BaseHelper.redirectTo(item.link)"
                    >
                        {{ t(`navigation.${item.name}`) }}
                    </button>
                </template>

                <template v-else>
                    <!-- твои SuperUser пункты -->
                </template>
            </nav>

            <ThemeSwitcher />

            <Button class="mx-0 cursor-pointer relative" variant="ghost" v-if="isAuthenticated">
                <Mail @click="BaseHelper.redirectTo('/contact')" />
                <span
                    v-if="unreadCount > 0"
                    class="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-green-500 rounded-full"
                >
                    {{ unreadCount > 99 ? '99+' : unreadCount }}
                </span>
            </Button>

            <!-- Loading -->
            <div v-if="userStore.isLoading">
                <Spinner />
            </div>

            <!-- Profile Desktop -->

            <DropdownMenu v-else-if="userProfile">
                <DropdownMenuTrigger as-child>
                    <div
                        :title="userProfile.email"
                        class="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1 transition-colors hover:bg-muted"
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
                        <div class="text-[14px] font-semibold hidden lg:flex items-center gap-1">
                            <span>{{ userProfile.name }}</span>
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="w-48 flex flex-col gap-1">
                    <DropdownMenuLabel class="text-xs text-muted-foreground font-normal">
                        {{ userProfile.email }}
                        <span class="text-[#C04000]"> ({{ userProfile.role }}) </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        class="cursor-pointer"
                        @click="BaseHelper.redirectTo('/profile')"
                    >
                        <User class="mr-2 h-4 w-4" />
                        Профиль
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        class="cursor-pointer"
                        @click="BaseHelper.redirectTo('/settings')"
                    >
                        <Settings class="mr-2 h-4 w-4" />
                        Настройки
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        class="cursor-pointer text-red-500 focus:text-red-500"
                        @click="handleLogout"
                    >
                        <LogOut class="mr-2 h-4 w-4" />
                        Выйти
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <!-- Login Desktop -->
            <div
                v-else
                class="hidden md:flex cursor-pointer items-center gap-[5px] transition duration-300 ease-in-out hover:scale-105 text-[12px]"
                @click="BaseHelper.redirectTo('/login')"
            >
                <LogIn class="h-[18px] w-[18px]" />
                {{ t('navigation.login') }}
            </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="flex items-center gap-3 md:hidden">
            <ThemeSwitcher />

            <!-- Login/Profile icon for mobile -->
            <div v-if="!userProfile" @click="BaseHelper.redirectTo('/login')">
                <LogIn class="h-[20px] w-[20px] cursor-pointer" />
            </div>

            <div v-else-if="userProfile" class="cursor-pointer">
                <img
                    v-if="userProfile.photo"
                    :src="userProfile.photo"
                    alt="UserPhoto"
                    class="h-[28px] w-[28px] rounded-full border border-border"
                />
                <User
                    v-else
                    :style="{color: textColor}"
                    class="h-[25px] w-[25px] rounded-full border border-border"
                />
            </div>

            <!-- Burger Menu -->
            <Sheet v-model:open="isMobileMenuOpen">
                <SheetTrigger as-child>
                    <Button class="h-9 w-9" size="icon" variant="ghost">
                        <Menu class="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent class="w-[300px] sm:w-[350px]" side="right">
                    <SheetHeader>
                        <SheetTitle class="flex items-center gap-2">
                            <Spotlight :size="20" />
                            <span>Menu</span>
                        </SheetTitle>
                    </SheetHeader>

                    <Separator class="my-4" />

                    <!-- User Info in Mobile Menu -->
                    <div v-if="userProfile" class="mb-6 p-3 rounded-lg bg-muted/50">
                        <div class="flex items-center gap-3">
                            <img
                                v-if="userProfile.photo"
                                :src="userProfile.photo"
                                alt="UserPhoto"
                                class="h-[40px] w-[40px] rounded-full border border-border"
                            />
                            <User
                                v-else
                                :style="{color: textColor}"
                                class="h-[40px] w-[40px] rounded-full border border-border"
                            />

                            <div class="flex flex-col">
                                <span class="font-semibold">{{ userProfile.name }}</span>
                                <span class="text-xs text-muted-foreground">{{
                                    userProfile.email
                                }}</span>
                                <span
                                    v-if="isSuperUser || isAdmin"
                                    class="text-[10px] text-[#C04000]"
                                >
                                    {{ userProfile.role }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation Links -->
                    <div class="flex flex-col gap-2">
                        <div
                            v-for="item in navListItems"
                            :key="item.name"
                            class="px-3 py-2 rounded-lg transition-colors hover:bg-muted cursor-pointer"
                            @click="
                                () => {
                                    BaseHelper.redirectTo(item.link);
                                    closeMobileMenu();
                                }
                            "
                        >
                            {{ t(`navigation.${item.name}`) }}
                        </div>

                        <Separator class="my-2" />

                        <div
                            v-if="!userProfile"
                            class="px-3 py-2 rounded-lg transition-colors hover:bg-muted cursor-pointer"
                            @click="
                                () => {
                                    BaseHelper.redirectTo('/login');
                                    closeMobileMenu();
                                }
                            "
                        >
                            {{ t('navigation.login') }}
                        </div>

                        <div
                            v-else
                            class="px-3 py-2 rounded-lg transition-colors hover:bg-muted cursor-pointer text-red-500"
                            @click="
                                () => {
                                    /* Add logout logic here */ closeMobileMenu();
                                }
                            "
                        >
                            Logout
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
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
