<script lang="ts" setup>
import {computed, inject, ref, type Ref} from 'vue';
import {useI18n} from 'vue-i18n';
import {useRoute} from 'vue-router';
import BaseHelper from '@/lib/common/base.helper.ts';
import type {UserProfile} from '@/lib/types/user.types.ts';

const {t} = useI18n();
const route = useRoute();

const userProfile = inject<Ref<UserProfile | null>>('userProfile', ref(null));
const isLoading = inject<Ref<boolean>>('isLoading', ref(false));
const logout = inject<() => void>('logout', () => {});

const navListItems = ['home', 'about', 'contact'];
const isHomeRoute = computed(() => route.name === 'home');
</script>

<template>
    <div class="header">
        <div class="header_logo" @click="BaseHelper.redirectTo('/')">
            <img alt="Logo" class="logo" height="32" src="@/assets/logo.svg" width="32" />
            <span>Logo</span>
        </div>

        <div class="header_right">
            <nav v-if="isHomeRoute" class="header_right__nav">
                <ul class="header_right__nav--list">
                    <li v-for="item in navListItems" :key="item">
                        {{ t(`navigation.${item}`) }}
                    </li>
                </ul>
            </nav>

            <!-- Состояние загрузки -->
            <div v-if="isLoading" class="header_right__loading">
                <span>...</span>
            </div>

            <!-- Профиль пользователя -->
            <div
                v-else-if="userProfile"
                class="header_right__profile"
                @click="BaseHelper.redirectTo('/about')"
            >
                <img
                    v-if="userProfile.photo"
                    :src="userProfile.photo"
                    alt="UserPhoto"
                    height="20"
                    width="20"
                />
                <img
                    v-else
                    alt="UserPhoto"
                    height="24"
                    src="@/assets/userProfilePhoto.svg"
                    style="filter: invert(1)"
                    width="24"
                />
                <span class="header_right__profile--name">{{ userProfile.name }}</span>
            </div>

            <!-- Кнопка входа -->
            <div v-else class="header_right__login" @click="BaseHelper.redirectTo('/login')">
                <LogIn class="header_right__login--icon" />
                {{ t('navigation.login') }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    width: 90%;
    height: 7vh;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: auto;
    padding: 0 20px;

    border-bottom: 1px solid var(--color-border);

    .header_logo {
        display: flex;
        align-items: center;
        gap: 10px;

        cursor: pointer;

        transition: 0.3s ease-in-out;

        &:hover {
            scale: 1.05;
        }
    }

    .header_right {
        display: flex;
        align-items: center;
        justify-content: center;

        gap: 40px;

        .header_right__nav {
            .header_right__nav--list {
                display: flex;
                align-items: center;
                gap: 10px;

                li {
                    list-style: none;
                    transition: 0.3s ease-in-out;

                    &:hover {
                        cursor: pointer;
                        scale: 1.05;
                    }
                }
            }
        }

        .header_right__profile {
            display: flex;
            align-items: center;
            gap: 10px;

            cursor: pointer;

            img {
                border: 1px solid var(--color-border);
                border-radius: 50%;
            }

            span {
                font-weight: 600;
                font-size: 14px;

                transition: 0.3s ease-in-out;
            }

            &:hover span {
                scale: 1.05;
                color: var(--vt-c-white-mute);
            }
        }

        .header_right__login {
            cursor: pointer;

            display: flex;
            align-items: center;
            gap: 5px;

            transition: 0.3s ease-in-out;

            &:hover {
                scale: 1.05;
            }

            .header_right__login--icon {
                width: 18px;
                height: 18px;
            }
        }
    }
}
</style>
