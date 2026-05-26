<script lang="ts" setup>
const appVersion = import.meta.env.VITE_APP_VERSION;
</script>

<template>
    <footer>
        <div class="footer-created">Created by <span>txzy</span></div>
        <span>{{ new Date().getFullYear() }}</span>
        <span>(v{{ appVersion }})</span>
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
