<script lang="ts" setup>
import {Button} from '@/components/ui/button';
</script>

<template>
    <div class="home">
        <img alt="Vue logo" class="logo" height="64" src="@/assets/logo.svg" width="64" />
        <Button variant="default">Кнопка</Button>
    </div>
</template>

<style scoped>
.home {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
