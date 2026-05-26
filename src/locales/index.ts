import ruNav from './ru/nav.json';
import enNav from './en/nav.json';
import ruFooter from './ru/footer.json';
import enFooter from './en/footer.json';

export default {
    en: {...enNav, ...enFooter},
    ru: {...ruNav, ...ruFooter}
};
