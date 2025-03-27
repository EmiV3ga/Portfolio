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

  // 1. Configuración de la trayectoria del tren (keyframes)
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, -5),
    new THREE.Vector3(5, 0, 0),
    new THREE.Vector3(0, 0, 5),
    new THREE.Vector3(-5, 0, 0),
    new THREE.Vector3(0, 0, -5) // Completa el circuito
  ], true);

  useEffect(() => {
    // 2. Buscar el tren en la escena
    scene.traverse((child) => {
      if (child.name.match(/tren|train|locomotora/i)) {
        trainRef.current = child;
        console.log("Tren encontrado:", child);
      }
    });

    // 3. Si no se encuentra el tren, usar un objeto de prueba (solo para demo)
    if (!trainRef.current) {
      console.warn("No se encontró el tren. Usando objeto de prueba.");
      const testTrain = new THREE.Mesh(
          new THREE.BoxGeometry(1, 0.5, 2),
          new THREE.MeshStandardMaterial({ color: 0xff0000 })
      );
      scene.add(testTrain);
      trainRef.current = testTrain;
    }
  }, [scene]);

  useFrame((state) => {
    // 4. Animación del tren
    if (trainRef.current) {
      const time = state.clock.getElapsedTime();
      const loopDuration = 20; // 20 segundos por vuelta completa
      const t = (time % loopDuration) / loopDuration; // Normalizado 0-1

      // Posición en la curva
      const trainPosition = curve.getPointAt(t);
      trainRef.current.position.copy(trainPosition);

      // Orientación (mira hacia adelante)
      const tangent = curve.getTangentAt(t);
      trainRef.current.lookAt(
          trainPosition.x + tangent.x,
          trainPosition.y + tangent.y,
          trainPosition.z + tangent.z
      );

      // Rotación de ruedas (si existen)
      trainRef.current.traverse((child) => {
        if (child.name.match(/rueda|wheel/i)) {
          child.rotation.x = time * 3;
        }
      });
    }

    // Rotación suave de toda la escena (opcional)
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime / 2) * 0.3;
    }
  });

  return (
      <group ref={group} position={position} dispose={null}>
        <primitive object={scene} scale={0.01} position={[0, -2, 0]} />
      </group>
  );
}

useGLTF.preload('https://threejs.org/examples/models/gltf/LittlestTokyo.glb');