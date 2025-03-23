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
      'feed': 'Feed',
      'content': 'Content',
      'guestbook': 'Guestbook',
      'theme': 'Theme',
      'language': 'Language',
      'lightMode': 'Light Mode',
      'darkMode': 'Dark Mode',
      'toggleLanguage': 'Toggle Language',
      'fullName': 'Emiliano Vega',
      'role': 'Full Stack Developer & Creative Technologist',
      'writeMessage': 'Write a message...',
      'signGuestbook': 'Sign Guestbook',
      'latestContent': 'Latest Content',
      'viewAll': 'View All',
      'recentPosts': 'Recent Posts',
      'loadMore': 'Load More',
      'signIn': 'Sign In',
      'signOut': 'Sign Out',
      'email': 'Email',
      'password': 'Password',
      'login': 'Login',
      'loading': 'Loading...'
    }
  },
  es: {
    translation: {
      'home': 'Inicio',
      'projects': 'Proyectos',
      'about': 'Sobre mí',
      'contact': 'Contacto',
      'posts': 'Publicaciones',
      'feed': 'Actividad',
      'content': 'Contenido',
      'guestbook': 'Libro de Visitas',
      'theme': 'Tema',
      'language': 'Idioma',
      'lightMode': 'Modo Claro',
      'darkMode': 'Modo Oscuro',
      'toggleLanguage': 'Cambiar Idioma',
      'fullName': 'Emiliano Vega',
      'role': 'Desarrollador Full Stack & Tecnólogo Creativo',
      'writeMessage': 'Escribe un mensaje...',
      'signGuestbook': 'Firmar Libro',
      'latestContent': 'Último Contenido',
      'viewAll': 'Ver Todo',
      'recentPosts': 'Posts Recientes',
      'loadMore': 'Cargar Más',
      'signIn': 'Iniciar Sesión',
      'signOut': 'Cerrar Sesión',
      'email': 'Correo',
      'password': 'Contraseña',
      'login': 'Iniciar Sesión',
      'loading': 'Cargando...'
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