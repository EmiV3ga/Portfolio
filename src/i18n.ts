import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Home': 'Home',
      'Projects': 'Projects',
      'About': 'About',
      'Contact': 'Contact',
    }
  },
  es: {
    translation: {
      'Home': 'Inicio',
      'Projects': 'Proyectos',
      'About': 'Sobre mí',
      'Contact': 'Contacto',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;