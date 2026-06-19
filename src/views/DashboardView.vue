<script setup lang="ts">
import {activities, bookings, sidebarItems, stats, tables, topHookahs} from '@/lib/constants.ts';
import {Armchair, Users} from 'lucide-vue-next';
import {Card, CardContent, CardHeader} from '@/components/ui/card';
import {useRoute} from 'vue-router';

const route = useRoute();
</script>

<template>
    <div class="flex min-h-screen bg-background gap-6 w-[90%] pt-1.5 mx-auto!">
        <aside class="w-72 mt-6! border rounded-2xl crm-sidebar">
            <div class="space-y-2">
                <button
                    v-for="item in sidebarItems"
                    :key="item.title"
                    class="flex w-full items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer"
                    :class="
                        route.path === item.path
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'hover:bg-accent'
                    "
                >
                    <component :is="item.icon" class="size-5" />
                    {{ item.title }}
                </button>
            </div>
        </aside>

        <main class="flex-1 min-w-0 w-full">
            <div class="w-full p-6 flex flex-col gap-6">
                <div>
                    <h2 class="text-3xl font-bold">Добрый вечер 👋</h2>
                    <p class="text-muted-foreground">Управление заведением в реальном времени</p>
                </div>
                <div class="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                    <Card v-for="item in stats" :key="item.title">
                        <CardContent class="p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-muted-foreground text-sm">{{ item.title }}</p>
                                    <p class="text-3xl font-bold mt-2">{{ item.value }}</p>
                                </div>
                                <component :is="item.icon" class="size-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div class="grid gap-4 lg:grid-cols-3">
                    <Card class="lg:col-span-2">
                        <CardHeader> <CardTitle> Загрузка зала </CardTitle> </CardHeader>
                        <CardContent>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div
                                    v-for="table in tables"
                                    :key="table.id"
                                    class="relative rounded-2xl border bg-card p-4 hover:shadow-lg transition-all"
                                >
                                    <div
                                        class="absolute top-3 right-3 size-3 rounded-full"
                                        :class="{
                                            'bg-green-500': table.status === 'free',
                                            'bg-yellow-500': table.status === 'reserved',
                                            'bg-red-500': table.status === 'busy'
                                        }"
                                    />
                                    <Armchair class="size-8 mx-auto mb-3 text-muted-foreground" />
                                    <div class="text-center font-medium">{{ table.name }}</div>
                                    <div
                                        class="flex items-center justify-center gap-1 mt-2 text-sm text-muted-foreground"
                                    >
                                        <Users class="size-4" /> {{ table.seats }}
                                    </div>
                                    <div
                                        class="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground"
                                    >
                                        <Clock3 class="size-3" />
                                        {{
                                            table.status === 'busy'
                                                ? 'Занят'
                                                : table.status === 'reserved'
                                                  ? 'Бронь'
                                                  : 'Свободен'
                                        }}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader> <CardTitle> Ближайшие брони </CardTitle> </CardHeader>
                        <CardContent>
                            <div class="space-y-4">
                                <div
                                    v-for="booking in bookings"
                                    :key="booking.time"
                                    class="flex items-center justify-between"
                                >
                                    <div class="flex items-center gap-2">
                                        <CalendarClock class="size-4" /> {{ booking.name }}
                                    </div>
                                    <span class="text-muted-foreground text-sm">
                                        {{ booking.time }}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div class="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader> <CardTitle> Популярные кальяны </CardTitle> </CardHeader>
                        <CardContent>
                            <div
                                v-for="item in topHookahs"
                                :key="item.name"
                                class="flex justify-between py-3 border-b last:border-0"
                            >
                                <div class="flex items-center gap-2">
                                    <TrendingUp class="size-4" /> {{ item.name }}
                                </div>
                                <span> {{ item.count }} </span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader> <CardTitle> Последние действия </CardTitle> </CardHeader>
                        <CardContent>
                            <div
                                v-for="activity in activities"
                                :key="activity"
                                class="flex gap-3 py-3 border-b last:border-0"
                            >
                                <Activity class="size-4 mt-1 text-muted-foreground" />
                                <span> {{ activity }} </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
.crm-sidebar {
    position: relative;
    background-clip: padding-box;
    padding: 10px;
}

.crm-sidebar::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 0.75rem;
    padding: 1px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.03));

    -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);

    -webkit-mask-composite: xor;
    mask-composite: exclude;

    pointer-events: none;
}
</style>
