<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue';
import {useUserStore} from '@/stores/user.store.ts';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import {Toaster} from '@/components/ui/sonner';
import {Spinner} from '@/components/ui/spinner';
import 'vue-sonner/style.css';
import {useI18n} from 'vue-i18n';
import {useRoute} from 'vue-router';
import {storeToRefs} from 'pinia';
import CookieService from '@/lib/services/cookie.service';
import BottomButton from './components/BottomButton.vue';

const userStore = useUserStore();
const {isLoading, profile} = storeToRefs(userStore);
const showContent = ref(false);
const route = useRoute();
const {t, locale} = useI18n();

// Обновление заголовка
const updateTitle = () => {
    const titleKey = route.meta?.titleKey;
    document.title = titleKey ? t(titleKey.toString()) : t('app.defaultTitle');
};

watch(() => route.path, updateTitle, {immediate: true});
watch(locale, updateTitle);

onMounted(async () => {
    const accessToken = CookieService.get('access_token');

    if (accessToken && !profile.value) {
        await userStore.fetchProfile();
    }

    isLoading.value = false;

    setTimeout(() => {
        showContent.value = true;
    }, 100);
});
</script>

<template>
    <div
        v-if="isLoading"
        class="fixed inset-0 flex items-center justify-center bg-background transition-opacity duration-300 cursor-pointer"
    >
        <Spinner size="lg" />
    </div>

    <Transition appear name="fade">
        <div v-if="showContent">
            <Header class="mt-2!" />

            <RouterView />

            <BottomButton />
            <Toaster close-button position="bottom-right" />

            <Footer />
        </div>
    </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
