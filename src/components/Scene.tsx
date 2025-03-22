import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, useAnimations } from '@react-three/drei';

function Model({ playAnimation }) {
  const group = useRef();
  const { scene, animations } = useGLTF('https://threejs.org/examples/models/gltf/LittlestTokyo.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && actions['Take 001']) {
      if (playAnimation) {
        actions['Take 001'].play(); // Reproduce la animación
      } else {
        actions['Take 001'].stop(); // Detiene la animación
      }
    }
  }, [playAnimation, actions]);

  return (
    <primitive
      ref={group}
      object={scene}
      scale={0.01}
      position={[0, 2, 0]} // Esta desplazado 2 unidades en el eje x
    />
  );
}

export default function Scene() {
  const [playAnimation, setPlayAnimation] = useState(true);

  return (
    <div className="h-[50vh] w-full bg-gradient-to-b from-primary-dark to-primary">
      <Canvas
        camera={{ position: [5, 2, 5], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Model playAnimation={playAnimation} />
        <OrbitControls
          enableZoom={true}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
      <div className="text-center mt-4">
        <button
          onClick={() => setPlayAnimation(!playAnimation)}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          {playAnimation ? 'Pause Animation' : 'Play Animation'}
        </button>
      </div>
    </div>
  );
}