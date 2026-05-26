import './assets/base.css';

import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import locales from './locales';

import {createI18n} from 'vue-i18n';
import {createPinia} from 'pinia';

const i18n = createI18n({
    legacy: false,
    locale: 'ru',
    fallbackLocale: 'en',
    messages: locales
});

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(i18n);

app.mount('#app');
