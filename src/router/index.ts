import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import {useUserStore} from '@/stores/user.store.ts';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: import('@/views/Login.vue'),
            meta: {requiresGuest: true}
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();

    if (!userStore.isInitialized) {
        await userStore.fetchProfile();
    }

    // Проверка на авторизацию
    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
        next('/login');
    } else if (to.meta.requiresGuest && userStore.isAuthenticated) {
        next('/');
    } else {
        next();
    }
});

export default router;
