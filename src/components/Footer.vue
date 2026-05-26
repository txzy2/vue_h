<script lang="ts" setup>
import {useI18n} from 'vue-i18n';

const appVersion = import.meta.env.VITE_APP_VERSION;

const {t} = useI18n();
</script>

<template>
    <footer class="flex h-[5vh] items-center justify-center gap-[5px] text-[12px]">
        <div>
            {{ t(`footer.create`) }}
            <a class="font-bold text-[burlywood]" href="https://vk.com/antoster2" target="_blank"
                >@HooBooTeam</a
            >
        </div>

        <span class="font-extrabold">(v{{ appVersion }} -> {{ new Date().getFullYear() }})</span>
    </footer>
</template>
