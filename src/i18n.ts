import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'home': 'Home',
      'projects': 'Projects',
      'about': 'About',
      'contact': 'Contact',
      'posts': 'Posts',
      'theme': 'Theme',
      'language': 'Language',
      'fullName': 'Emiliano Vega',
      'role': 'Full Stack Developer & Creative Technologist',
      'contactMe': 'Contact Me',
      'letsWork': 'Let\'s work together!',
      'email': 'Email',
      'phone': 'Phone',
      'github': 'GitHub',
      'linkedin': 'LinkedIn',
      'checkRepositories': 'Check my repositories',
      'connectWithMe': 'Connect with me',
      'sendMessage': 'Send Message',
      'name': 'Name',
      'message': 'Message'
    }
  },
  es: {
    translation: {
      'home': 'Inicio',
      'projects': 'Proyectos',
      'about': 'Sobre mí',
      'contact': 'Contacto',
      'posts': 'Publicaciones',
      'theme': 'Tema',
      'language': 'Idioma',
      'fullName': 'Emiliano Vega',
      'role': 'Desarrollador Full Stack & Tecnólogo Creativo',
      'contactMe': 'Contáctame',
      'letsWork': '¡Trabajemos juntos!',
      'email': 'Correo',
      'phone': 'Teléfono',
      'github': 'GitHub',
      'linkedin': 'LinkedIn',
      'checkRepositories': 'Ver mis repositorios',
      'connectWithMe': 'Conecta conmigo',
      'sendMessage': 'Enviar Mensaje',
      'name': 'Nombre',
      'message': 'Mensaje'
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