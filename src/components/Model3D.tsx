import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Scene from './Scene';

export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = (e.clientX - startPos.x) * 0.01;
    const deltaY = (e.clientY - startPos.y) * 0.01;

    setPosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y - deltaY, // Invert Y for intuitive movement
      z: prev.z
    }));

    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseLeave = () => setIsDragging(false);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
      <div
          ref={containerRef}
          className="w-full h-[400px] cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
      >
        <Canvas
            shadows
            dpr={[1, 2]}
            camera={{
              position: [5 + position.x, 2 + position.y, 8 + position.z],
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
            <Scene position={[position.x, position.y, position.z]} />
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