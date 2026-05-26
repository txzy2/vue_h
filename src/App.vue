<script lang="ts" setup>
import {onMounted} from 'vue';
import {useUserStore} from '@/stores/user.store.ts';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import {Toaster} from '@/components/ui/sonner';
import 'vue-sonner/style.css';

const userStore = useUserStore();

onMounted(async () => {
    if (!userStore.isAuthenticated) {
        await userStore.fetchProfile();
    }
});
</script>

<template>
    <Header />
    <div class="main-wrapper">
        <RouterView />
        <Toaster close-button position="bottom-right" />
    </div>
    <Footer />
</template>

<style scoped></style>
