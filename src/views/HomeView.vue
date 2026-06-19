<script lang="ts" setup>
import HeroSection from '@/components/HeroSection.vue';
import {Card, CardContent} from '@/components/ui/card';
import {CalendarCheck, Users, BarChart3, Bell} from 'lucide-vue-next';

const features = [
    {
        icon: CalendarCheck,
        title: 'Онлайн бронирование',
        description: 'Гости бронируют столы сами — вы видите всё в реальном времени'
    },
    {
        icon: Users,
        title: 'База клиентов',
        description: 'История визитов, предпочтения и контакты каждого гостя'
    },
    {
        icon: BarChart3,
        title: 'Аналитика загрузки',
        description: 'Понимайте пиковые часы и управляйте заполняемостью зала'
    },
    {
        icon: Bell,
        title: 'Telegram уведомления',
        description: 'Автоматические напоминания гостям и уведомления персоналу'
    }
];

const stats = [
    {value: '500+', label: 'Заведений'},
    {value: '12к+', label: 'Броней в месяц'},
    {value: '98%', label: 'Довольных клиентов'},
    {value: '24/7', label: 'Поддержка'}
];
</script>

<template>
    <div class="">
        <HeroSection />

        <section class="h-screen flex flex-col items-center justify-center px-4 gap-10">
            <div class="container mx-auto flex flex-col gap-10">
                <h2 class="text-3xl font-bold text-center">Всё что нужно для работы</h2>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    <Card v-for="feature in features" :key="feature.title">
                        <CardContent class="pt-6">
                            <component :is="feature.icon" class="size-8 mb-4 text-amber-500" />
                            <h3 class="font-semibold text-lg mb-2">{{ feature.title }}</h3>
                            <p class="text-muted-foreground text-sm">
                                {{ feature.description }}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <section class="py-16 px-4 border-y">
                <div class="container mx-auto">
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        <div v-for="stat in stats" :key="stat.label">
                            <div class="text-4xl font-bold text-amber-500">
                                {{ stat.value }}
                            </div>
                            <div class="text-muted-foreground mt-1 text-sm">
                                {{ stat.label }}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>

        <!-- Stats -->
    </div>
</template>
