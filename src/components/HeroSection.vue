<script setup lang="ts">
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
// import DashboardMockup from '@/components/DashboardMockup.vue';
import {Card, CardContent, CardHeader} from '@/components/ui/card';
import {ref} from 'vue';
import {Circle, Users, Clock3} from 'lucide-vue-next';
import {tables} from '@/lib/constants.ts';
import {useUserStore} from '@/stores/user.store';
import {useRouter} from 'vue-router';

const {isAuthenticated} = useUserStore();
const router = useRouter();
</script>

<template>
    <section class="min-h-[90vh] flex items-center justify-center px-4 md:py-0">
        <div class="container mx-auto">
            <div class="grid lg:grid-cols-2 gap-8 lg:gap-10">
                <!-- Left -->
                <div
                    class="flex flex-col gap-4 text-center lg:text-left items-center lg:items-start"
                >
                    <Badge>CRM для кальянных</Badge>
                    <h1
                        class="text-4xl sm:text-5xl lg:text-6xl font-bold mt-2 lg:mt-5 leading-tight"
                    >
                        Управляйте бронями и гостями из одной системы
                    </h1>
                    <p class="text-muted-foreground mt-2 lg:mt-6 max-w-md">
                        Онлайн бронирование столов, база клиентов, аналитика загрузки и Telegram
                        уведомления.
                    </p>
                    <div>
                        <Button
                            size="lg"
                            class="flex-1 sm:flex-none text-[14px] px-4 py-2 font-medium cursor-pointer hover:scale-105"
                            v-if="isAuthenticated"
                            @click="router.push('/dashboard')"
                        >
                            Перейти в дашборд
                        </Button>

                        <div class="flex gap-3 mt-4 lg:mt-8 w-full sm:w-auto" v-else>
                            <Button size="lg" class="flex-1 sm:flex-none">
                                Попробовать бесплатно
                            </Button>
                            <Button size="lg" variant="outline" class="flex-1 sm:flex-none">
                                Демо
                            </Button>
                        </div>
                    </div>
                </div>

                <!-- Right -->
                <Card>
                    <CardHeader>Загрузка зала</CardHeader>
                    <CardContent>
                        <div
                            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3"
                        >
                            <div
                                v-for="table in tables"
                                :key="table.id"
                                class="rounded-2xl border bg-card p-3 sm:p-4 transition-all hover:shadow-md hover:-translate-y-1"
                            >
                                <div class="flex items-center justify-between">
                                    <span class="font-medium text-sm sm:text-base">
                                        {{ table.name }}
                                    </span>
                                    <Circle
                                        :class="[
                                            'size-3 fill-current shrink-0',
                                            table.status === 'busy'
                                                ? 'text-red-500'
                                                : table.status === 'reserved'
                                                  ? 'text-yellow-500'
                                                  : 'text-green-500'
                                        ]"
                                    />
                                </div>
                                <div class="mt-3 flex items-center gap-2 text-muted-foreground">
                                    <Users class="size-4 shrink-0" />
                                    <span class="text-sm">{{ table.seats }} мест</span>
                                </div>
                                <div class="mt-1.5 flex items-center gap-2 text-muted-foreground">
                                    <Clock3 class="size-4 shrink-0" />
                                    <span class="text-sm">
                                        {{
                                            table.status === 'busy'
                                                ? 'Занят'
                                                : table.status === 'reserved'
                                                  ? 'Бронь'
                                                  : 'Свободен'
                                        }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </section>
</template>
