import './assets/base.css';

import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import locales from './locales';

import {createI18n} from 'vue-i18n';
import {LogIn, UserRound} from '@lucide/vue';

const i18n = createI18n({
    legacy: false,
    locale: 'ru',
    fallbackLocale: 'en',
    messages: locales
});

const app = createApp(App);

app.use(router);
app.use(i18n);
app.component('Footer', Footer)
    .component('Header', Header)
    .component('LogIn', LogIn)
    .component('User', UserRound);

app.mount('#app');
