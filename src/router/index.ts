import CookieService from '@/lib/services/cookie.service';
import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {titleKey: 'navigation.home'}
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login.vue')
        }
    ]
});

router.beforeEach((to, from) => {
    const accessToken = CookieService.get('access_token');

    if (to.path === '/login' && accessToken) {
        window.location.href = '/';
        return false;
    }

    return true;
});

export default router;
