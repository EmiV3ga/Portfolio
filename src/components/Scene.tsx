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
  const trainRef = useRef<THREE.Group>();
  const { scene } = useGLTF('https://threejs.org/examples/models/gltf/LittlestTokyo.glb') as GLTFResult;

  // Definimos los keyframes (puntos de control) para la animación
  const keyframes = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(5, 0, 0),
    new THREE.Vector3(5, 0, 5),
    new THREE.Vector3(0, 0, 5),
    new THREE.Vector3(0, 0, 0)
  ];

  // Creamos una curva cerrada que pasa por los keyframes
  const curve = new THREE.CatmullRomCurve3(keyframes, true);
  const pathRef = useRef<THREE.Line>();

  useEffect(() => {
    if (scene) {
      // Buscar el tren en la escena
      scene.traverse((child) => {
        if (child.name.includes('Train') || child.name.includes('tren')) {
          trainRef.current = child;
        }
      });

      // Opcional: Visualizar el camino (solo para debug)
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
      const line = new THREE.Line(geometry, material);
      line.visible = false; // Cambiar a true para ver el camino
      if (group.current) {
        group.current.add(line);
        pathRef.current = line;
      }
    }
  }, [scene]);

  useFrame((state) => {
    if (group.current) {
      // Rotación suave de toda la escena
      group.current.rotation.y = Math.sin(state.clock.elapsedTime / 2) * 0.3;
    }

    // Animación del tren a lo largo del camino
    if (trainRef.current) {
      // Calculamos la posición en la curva (0 a 1 es un ciclo completo)
      const t = (state.clock.elapsedTime * 0.1) % 1;
      const position = curve.getPointAt(t);

      // Movemos el tren
      trainRef.current.position.copy(position);

      // Orientamos el tren en la dirección del movimiento
      const tangent = curve.getTangentAt(t);
      trainRef.current.lookAt(
          position.x + tangent.x,
          position.y + tangent.y,
          position.z + tangent.z
      );

      // Opcional: rotar ruedas
      trainRef.current.traverse((child) => {
        if (child.name.includes('Wheel') || child.name.includes('rueda')) {
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