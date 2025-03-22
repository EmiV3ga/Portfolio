import React from 'react';
import Scene from '../components/Scene';

const Home = () => {
  return (
    <div className="bg-[#DAF1DE] dark:bg-secondary min-h-screen">
      {/* Contenedor para el render 3D */}
      <div className="h-[400px]"> {/* Altura fija para el render 3D */}
        <Scene />
      </div>

      {/* Contenedor para la tarjeta del título principal */}
      <div className="max-w-4xl mx-auto px-4 py-8"> {/* Padding para separar del render 3D */}
        <div className="bg-white dark:bg-primary/10 p-6 rounded-lg shadow-lg"> {/* Tarjeta con esquinas redondeadas */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-primary dark:text-accent">Emiliano Vega</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Full Stack Developer & Creative Technologist
            </p>
          </div>
        </div>
      </div>

      {/* Más secciones si las necesitas */}
    </div>
  );
};

export default Home;