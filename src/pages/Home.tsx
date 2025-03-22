import React from 'react';
import Scene from '../components/Scene';

const Home = () => {
  return (
    <div className="space-y-8 bg-[#DAF1DE] dark:bg-secondary">
      <Scene />
      {/* Tarjeta para el título y texto */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-primary/10 p-6 rounded-lg shadow-lg"> {/* Estilo de tarjeta */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary dark:text-accent">Emiliano Vega</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Full Stack Developer & Creative Technologist
          </p>
        </div>
      </div>
      {/* Add more sections as needed */}
    </div>
  );
};

export default Home;