<script lang="ts" setup>
import {useI18n} from 'vue-i18n';

const appVersion = import.meta.env.VITE_APP_VERSION;

const {t} = useI18n();
</script>

<template>
    <footer>
        <div class="footer-created">{{ t(`footer.create`) }} <span>txzy</span></div>
        <span>(v{{ appVersion }} -> {{ new Date().getFullYear() }})</span>
    </footer>
</template>

<style scoped>
footer {
    height: 5vh;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 5px;

    font-size: 12px;

    .footer-created {
        span {
            color: burlywood;
            font-weight: 700;
        }
    }
}
</style>
