import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Cookies from 'js-cookie';

const resources = {
  en: {
    translation: {
      // Navigation & Common
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

      // Profile & Bio
      'fullName': 'Emiliano Vega',
      'role': 'Digital Craftsman (Developer / Pentester / Designer)',
      'intro': 'Hello! I\'m a full-stack developer and cybersecurity specialist based in Argentina, with a soft spot for turning coffee into clean code and secure systems.',
      'workDescription': 'Emiliano is a freelance full-stack developer and ethical hacker who builds digital solutions armored with security and sprinkled with design thinking. From patching vulnerabilities to crafting intuitive interfaces, he bridges tech and creativity. Off-duty, he\'s either behind a camera, modeling 3D assets, or nerding out over the latest infosec trends.',
      'iLove': 'Swimming, Basketball, Video Games, Music, Machine Learning',

      // Guestbook
      'writeMessage': 'Write a message...',
      'signGuestbook': 'Sign Guestbook',
      'guestbookTitle': 'Leave a message',
      'guestbookIntro': 'Share your thoughts, feedback, or just say hi!',
      'messagePosted': 'Message posted successfully!',
      'messageDeleted': 'Message deleted successfully',

      // Posts & Content
      'latestContent': 'Latest Content',
      'viewAll': 'View All',
      'recentPosts': 'Recent Posts',
      'loadMore': 'Load More',
      'readMore': 'Read More',
      'publishPost': 'Publish Post',
      'writePost': 'Write your post content in Markdown...',
      'postTitle': 'Post title',
      'uploadImage': 'Upload Image',
      'preview': 'Preview',
      'write': 'Write',
      'publishing': 'Publishing...',
      'publish': 'Publish',
      'deletePost': 'Delete post',
      'deleteComment': 'Delete comment',
      'comments': 'Comments',
      'writeComment': 'Write a comment...',
      'sendComment': 'Send comment',
      'likes': 'Likes',
      'share': 'Share',
      'noContent': 'No content to preview',

      // Authentication
      'signIn': 'Sign In',
      'signOut': 'Sign Out',
      'email': 'Email',
      'password': 'Password',
      'login': 'Login',
      'loading': 'Loading...',
      'register': 'Register',
      'createAccount': 'Create Account',
      'alreadyHaveAccount': 'Already have an account?',
      'dontHaveAccount': 'Don\'t have an account?',
      'welcomeBack': 'Welcome Back',
      'signInToAccount': 'Sign in to your account',
      'joinCommunity': 'Join our community',

      // Profile
      'yourName': 'Your name',
      'yourAlias': 'Your alias (optional)',
      'anonymous': 'Anonymous',
      'frontend': 'Frontend',
      'backend': 'Backend',
      'tools': 'Tools',
      'work': 'Work',
      'bio': 'Bio',

      // Projects
      'projectTitle': 'My Projects',
      'liveDemo': 'Live Demo',
      'sourceCode': 'Source Code',
      'technologies': 'Technologies Used',
      'projectDescription': 'Project Description',

      // Contact
      'getInTouch': 'Get in Touch',
      'letWork': 'Let\'s work together on something amazing',
      'sendMessage': 'Send me a message',
      'checkRepositories': 'Check out my repositories',
      'connectProfessionally': 'Connect with me professionally',
      'letTalk': 'Let\'s have a conversation',

      // Admin
      'adminStatus': 'Administrator Status',
      'adminAccess': 'Administrator Access',
      'notAdmin': 'Not an Administrator',
      'refreshStatus': 'Refresh Status',

      // Error Messages
      'errorOccurred': 'An error occurred',
      'tryAgain': 'Please try again',
      'requiredFields': 'Please fill in all required fields',
      'invalidEmail': 'Please enter a valid email address',
      'passwordTooShort': 'Password must be at least 6 characters long'
    }
  },
  es: {
    translation: {
      // Navigation & Common
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

      // Profile & Bio
      'fullName': 'Emiliano Vega',
      'role': 'Artesano Digital (Desarrollador / Pentester / Diseñador)',
      'intro': '¡Hola! Soy un desarrollador full-stack y especialista en ciberseguridad basado en Argentina, con debilidad por convertir café en código limpio y sistemas seguros.',
      'workDescription': 'Emiliano es un desarrollador full-stack freelance y hacker ético que construye soluciones digitales blindadas con seguridad y salpicadas de pensamiento de diseño. Desde parchear vulnerabilidades hasta crear interfaces intuitivas, une la tecnología y la creatividad. Fuera de servicio, está detrás de una cámara, modelando assets 3D o fascinado con las últimas tendencias de seguridad informática.',
      'iLove': 'Natación, Básquet, Videojuegos, Música, Aprendizaje Automático',

      // Guestbook
      'writeMessage': 'Escribe un mensaje...',
      'signGuestbook': 'Firmar Libro',
      'guestbookTitle': 'Deja un mensaje',
      'guestbookIntro': '¡Comparte tus pensamientos, comentarios o simplemente saluda!',
      'messagePosted': '¡Mensaje publicado exitosamente!',
      'messageDeleted': 'Mensaje eliminado exitosamente',

      // Posts & Content
      'latestContent': 'Último Contenido',
      'viewAll': 'Ver Todo',
      'recentPosts': 'Posts Recientes',
      'loadMore': 'Cargar Más',
      'readMore': 'Leer Más',
      'publishPost': 'Publicar Post',
      'writePost': 'Escribe el contenido de tu post en Markdown...',
      'postTitle': 'Título del post',
      'uploadImage': 'Subir Imagen',
      'preview': 'Vista Previa',
      'write': 'Escribir',
      'publishing': 'Publicando...',
      'publish': 'Publicar',
      'deletePost': 'Eliminar post',
      'deleteComment': 'Eliminar comentario',
      'comments': 'Comentarios',
      'writeComment': 'Escribe un comentario...',
      'sendComment': 'Enviar comentario',
      'likes': 'Me gusta',
      'share': 'Compartir',
      'noContent': 'No hay contenido para previsualizar',

      // Authentication
      'signIn': 'Iniciar Sesión',
      'signOut': 'Cerrar Sesión',
      'email': 'Correo',
      'password': 'Contraseña',
      'login': 'Iniciar Sesión',
      'loading': 'Cargando...',
      'register': 'Registrarse',
      'createAccount': 'Crear Cuenta',
      'alreadyHaveAccount': '¿Ya tienes una cuenta?',
      'dontHaveAccount': '¿No tienes una cuenta?',
      'welcomeBack': 'Bienvenido de nuevo',
      'signInToAccount': 'Inicia sesión en tu cuenta',
      'joinCommunity': 'Únete a nuestra comunidad',

      // Profile
      'yourName': 'Tu nombre',
      'yourAlias': 'Tu alias (opcional)',
      'anonymous': 'Anónimo',
      'frontend': 'Frontend',
      'backend': 'Backend',
      'tools': 'Herramientas',
      'work': 'Trabajo',
      'bio': 'Biografía',

      // Projects
      'projectTitle': 'Mis Proyectos',
      'liveDemo': 'Demo en vivo',
      'sourceCode': 'Código Fuente',
      'technologies': 'Tecnologías Utilizadas',
      'projectDescription': 'Descripción del Proyecto',

      // Contact
      'getInTouch': 'Ponte en Contacto',
      'letWork': 'Trabajemos juntos en algo increíble',
      'sendMessage': 'Envíame un mensaje',
      'checkRepositories': 'Revisa mis repositorios',
      'connectProfessionally': 'Conéctate conmigo profesionalmente',
      'letTalk': 'Tengamos una conversación',

      // Admin
      'adminStatus': 'Estado de Administrador',
      'adminAccess': 'Acceso de Administrador',
      'notAdmin': 'No es Administrador',
      'refreshStatus': 'Actualizar Estado',

      // Error Messages
      'errorOccurred': 'Ha ocurrido un error',
      'tryAgain': 'Por favor, inténtalo de nuevo',
      'requiredFields': 'Por favor, completa todos los campos requeridos',
      'invalidEmail': 'Por favor, ingresa un correo electrónico válido',
      'passwordTooShort': 'La contraseña debe tener al menos 6 caracteres'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Set English as default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Only save language preference to cookie when explicitly changed by user
i18n.on('languageChanged', (lng) => {
  Cookies.set('i18next', lng, { expires: 365 });
});

export default i18n;