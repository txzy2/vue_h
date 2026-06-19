<script setup lang="ts">
import {useUserStore} from '@/stores/user.store';
import {MessageCircle, Plus} from 'lucide-vue-next';
import {storeToRefs} from 'pinia';

const userStore = useUserStore();
const {isAuthenticated} = storeToRefs(userStore);
</script>

<template>
    <div
        class="fixed bottom-11 right-10 z-50 rounded-full flex justify-center items-center p-3 bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30 hover:scale-110 hover:shadow-xl hover:shadow-orange-500/50 active:scale-95 transition-all duration-300 cursor-pointer"
        :title="isAuthenticated ? 'Добавить бронь' : 'Поддержка'"
    >
        <Button v-if="isAuthenticated">
            <Plus :size="21" class="text-white" />
        </Button>

        <Button v-else>
            <MessageCircle :size="17" class="text-white" />
        </Button>
    </div>
</template>
