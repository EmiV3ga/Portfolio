import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Scene from './Scene';

export function Scene3D() {
  return (
    <div className="w-full h-[400px]">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ 
          position: [5, 2, 8],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        style={{
          background: 'transparent',
        }}
      >
        <ambientLight intensity={0.7} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          shadow-mapSize={[512, 512]}
          castShadow
        />
        <directionalLight
          position={[-5, 5, -5]}
          intensity={0.5}
          castShadow
        />
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            minDistance={5}
            maxDistance={15}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}