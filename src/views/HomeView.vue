<script lang="ts" setup>
import HeroSection from '@/components/HeroSection.vue';
import {useUserStore} from '@/stores/user.store';

const {isAuthenticated} = useUserStore();
</script>

<template>
    <div class="h-[85vh] flex flex-col">
        <HeroSection />
    </div>
</template>

<style scoped></style>
