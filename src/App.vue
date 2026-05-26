<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {useUserStore} from '@/stores/user.store.ts';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import {Toaster} from '@/components/ui/sonner';
import {Spinner} from '@/components/ui/spinner';
import 'vue-sonner/style.css';

const userStore = useUserStore();
const isLoading = ref(true);
const showContent = ref(false);

onMounted(async () => {
    if (!userStore.isAuthenticated) {
        await userStore.fetchProfile();
    }
    isLoading.value = false;
    // Небольшая задержка для плавного появления
    setTimeout(() => {
        showContent.value = true;
    }, 100);
});
</script>

<template>
    <div
        v-if="isLoading"
        class="fixed inset-0 flex items-center justify-center bg-background z-50 transition-opacity duration-300"
    >
        <Spinner size="lg" />
    </div>

    <Transition appear name="fade">
        <div v-if="showContent">
            <Header />
            <div class="main-wrapper">
                <RouterView />
                <Toaster close-button position="bottom-right" />
            </div>
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
