import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
};

interface SceneProps {
  position?: [number, number, number];
}

export default function Scene({ position = [0, 0, 0] }: SceneProps) {
  const group = useRef<THREE.Group>();
  const trainRef = useRef<THREE.Object3D>();
  const { scene } = useGLTF('https://threejs.org/examples/models/gltf/LittlestTokyo.glb') as GLTFResult;

  // Configuración de la animación del tren
  useEffect(() => {
    if (scene) {
      // Buscar el tren en la escena (el modelo LittlestTokyo no tiene un tren claro,
      // así que animaremos todo el grupo o buscaremos un objeto específico)
      scene.traverse((child) => {
        // Si el modelo tuviera un tren, podríamos identificarlo por su nombre
        if (child.name.toLowerCase().includes('train') || child.name.toLowerCase().includes('tren')) {
          trainRef.current = child;
        }
      });

      // Si no encontramos un tren específico, usamos el grupo principal
      if (!trainRef.current) {
        trainRef.current = scene;
      }
    }
  }, [scene]);

  // Animación del tren
  useFrame((state) => {
    if (group.current) {
      // Rotación suave de toda la escena (opcional, puedes quitarlo)
      group.current.rotation.y = Math.sin(state.clock.elapsedTime / 2) * 0.3;
    }

    if (trainRef.current) {
      // Movimiento circular del tren
      const speed = 0.5;
      const radius = 3;
      const angle = state.clock.elapsedTime * speed;

      trainRef.current.position.x = Math.cos(angle) * radius;
      trainRef.current.position.z = Math.sin(angle) * radius;

      // Orientar el tren en la dirección del movimiento
      const lookAtX = Math.cos(angle + 0.1) * radius;
      const lookAtZ = Math.sin(angle + 0.1) * radius;
      trainRef.current.lookAt(lookAtX, trainRef.current.position.y, lookAtZ);

      // Rotar las ruedas si existen
      trainRef.current.traverse((child) => {
        if (child.name.toLowerCase().includes('wheel') || child.name.toLowerCase().includes('rueda')) {
          child.rotation.x = state.clock.elapsedTime * 5;
        }
      });
    }
  });

  return (
      <group ref={group} position={position} dispose={null}>
        <primitive object={scene} scale={0.01} position={[0, -2, 0]} />
      </group>
  );
}

useGLTF.preload('https://threejs.org/examples/models/gltf/LittlestTokyo.glb');