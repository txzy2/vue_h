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

router.beforeEach((to, from, next) => {
    if (to.meta?.titleKey) {
        // @ts-ignore
        const translatedTitle = i18n.global.t(to.meta.titleKey);
        document.title = translatedTitle;
    } else {
        document.title = i18n.global.t('app.defaultTitle') || 'My App';
    }
    next();
});

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(i18n);

app.mount('#app');
