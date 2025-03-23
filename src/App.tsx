import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import Posts from './pages/Posts';
import Login from './pages/Login';
import Register from './pages/Register'; // Importa el componente Register
import { ThemeProvider } from './context/ThemeContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="projects" element={<Projects />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="posts" element={<Posts />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} /> {/* Agrega la ruta de registro */}
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;