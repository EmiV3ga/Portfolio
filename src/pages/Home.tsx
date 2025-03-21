import React from 'react';
import Scene from '../components/Scene';

const Home = () => {
  return (
    <div className="bg-[#DAF1DE] dark:bg-[#0B2B26] min-h-screen">
      {/* Contenedor para el render 3D */}
      <div className="w-full h-[400px] relative"> {/* Contenedor relativo para el render 3D */}
        <Scene /> {/* El render 3D ocupará todo el espacio */}
      </div>

      {/* Contenedor para la tarjeta del título principal */}
      <div className="max-w-4xl mx-auto px-4 py-4"> {/* Padding reducido (py-4 en lugar de py-8) */}
        <div className="bg-[#8EB69B] dark:bg-[#163832] p-6 rounded-lg shadow-lg"> {/* Tarjeta con esquinas redondeadas */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-[#0B2B26] dark:text-[#DAF1DE]">Emiliano Vega</h1>
            <p className="text-xl text-[#235347] dark:text-[#8EB69B]">
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