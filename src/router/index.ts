import CookieService from '@/lib/services/cookie.service';
import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DashboardView from '@/views/DashboardView.vue';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

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
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardView
        }
    ]
});

router.beforeEach((to, from, next) => {
    const accessToken = CookieService.get('access_token');

    if (to.path === '/login' && accessToken) {
        return next('/');
    }

    NProgress.start();
    next();
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
