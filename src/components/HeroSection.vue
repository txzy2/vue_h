<script setup lang="ts">
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
// import DashboardMockup from '@/components/DashboardMockup.vue';
import {Card, CardContent, CardHeader} from '@/components/ui/card';
import {ref} from 'vue';
import {Circle, Users, Clock3} from 'lucide-vue-next';
import {tables} from '@/lib/constants.ts';

</script>

<template>
    <section class="min-h-[93vh] flex items-center justify-center">
        <div class="container mx-auto">
            <div class="grid lg:grid-cols-2 gap-10">
                <div class="flex flex-col gap-5">
                    <Badge> CRM для кальянных </Badge>

                    <h1 class="text-6xl font-bold mt-5">
                        Управляйте бронями и гостями из одной системы
                    </h1>

                    <p class="text-muted-foreground mt-6">
                        Онлайн бронирование столов, база клиентов, аналитика загрузки и Telegram
                        уведомления.
                    </p>

                    <div class="flex gap-4 mt-8">
                        <Button size="lg"> Попробовать бесплатно </Button>

                        <Button size="lg" variant="outline"> Демо </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader> Загрузка зала </CardHeader>

                    <CardContent>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div
                                v-for="table in tables"
                                :key="table.id"
                                class="rounded-2xl border bg-card p-4 transition-all hover:shadow-md hover:-translate-y-1"
                            >
                                <div class="flex items-center justify-between">
                                    <span class="font-medium">
                                        {{ table.name }}
                                    </span>

                                    <Circle
                                        :class="[
                                            'size-3 fill-current',
                                            table.status === 'busy'
                                                ? 'text-red-500'
                                                : table.status === 'reserved'
                                                  ? 'text-yellow-500'
                                                  : 'text-green-500'
                                        ]"
                                    />
                                </div>

                                <div class="mt-4 flex items-center gap-2 text-muted-foreground">
                                    <Users class="size-4" />
                                    <span>{{ table.seats }} мест</span>
                                </div>

                                <div class="mt-2 flex items-center gap-2 text-muted-foreground">
                                    <Clock3 class="size-4" />
                                    <span>
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

                <!-- <DashboardMockup /> -->
            </div>
        </div>
    </section>
</template>
