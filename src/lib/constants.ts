import {
    Armchair,
    Users,
    CalendarDays,
    Wallet,
    Clock,
    Users2,
    Menu,
    Box,
    LayoutDashboard
} from 'lucide-vue-next';

export const tables = [
    {
        id: 1,
        name: 'Стол №1',
        seats: 4,
        status: 'busy'
    },
    {
        id: 2,
        name: 'Стол №2',
        seats: 6,
        status: 'free'
    },
    {
        id: 3,
        name: 'VIP №1',
        seats: 8,
        status: 'reserved'
    },
    {
        id: 4,
        name: 'Стол №4',
        seats: 4,
        status: 'free'
    }
];

export const stats = [
    {
        title: 'Столов',
        value: 24,
        icon: Armchair
    },
    {
        title: 'Гостей',
        value: 128,
        icon: Users
    },
    {
        title: 'Брони',
        value: 18,
        icon: CalendarDays
    },
    {
        title: 'Выручка',
        value: '78 000 ₽',
        icon: Wallet
    }
];

export const bookings = [
    {name: 'Иван Петров', time: '18:00'},
    {name: 'Алексей', time: '18:30'},
    {name: 'VIP-комната', time: '19:00'},
    {name: 'Компания 8 чел.', time: '20:00'}
];
export const topHookahs = [
    {name: 'Darkside Core', count: 42},
    {name: 'Must Have Pinkman', count: 35},
    {name: 'Bonche Cherry', count: 28}
];
export const activities = [
    'Создана бронь на стол №3',
    'Гость Алексей отменил бронь',
    'Добавлен новый клиент',
    'Изменён статус стола №5'
];

export const sidebarItems = [
    {
        title: 'Дэшборд',
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        title: 'Брони',
        icon: Clock,
        path: '/bookings'
    },
    {
        title: 'Клиенты',
        icon: Users2,
        path: '/clients'
    },
    {
        title: 'Меню',
        icon: Menu,
        path: '/menu'
    },
    {
        title: 'Склад',
        icon: Box,
        path: '/inventory'
    }
];
