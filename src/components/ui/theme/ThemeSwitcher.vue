<script lang="ts" setup>
import {Button} from '@/components/ui/button';
import {Moon, Sun} from 'lucide-vue-next';
import {useDark, useToggle} from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
    <Button class="mx-0 cursor-pointer" size="icon" variant="ghost" @click="toggleDark()">
        <Sun class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon
            class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
    </Button>
</template>
