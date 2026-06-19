<script setup lang="ts">
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
// import DashboardMockup from '@/components/DashboardMockup.vue';
import {Card, CardContent, CardHeader} from '@/components/ui/card';
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
                        <div class="grid grid-cols-4 gap-4">
                            <div
                                v-for="table in tables"
                                :key="table.id"
                                :class="{
                                    'bg-green-500': table.status === 'free',
                                    'bg-red-500': table.status === 'busy',
                                    'bg-yellow-500': table.status === 'reserved'
                                }"
                                class="h-20 rounded-xl flex items-center justify-center"
                            >
                                {{ table.name }}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- <DashboardMockup /> -->
            </div>
        </div>
    </section>
</template>
