<script lang="ts" setup>
import {Button} from '@/components/ui/button';
import HeroSection from '@/components/HeroSection.vue';
import {useUserStore} from '@/stores/user.store';

const {isAuthenticated} = useUserStore();
</script>

<template>
    <div class="h-[85vh] flex flex-col items-center justify-center">
        <div class="" v-if="isAuthenticated">Дашборд</div>
        <HeroSection v-else />
    </div>
</template>

<style scoped></style>
