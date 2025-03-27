import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function Scene({ position = [0, 0, 0] }) {
  const group = useRef();
  const trainRef = useRef();
  const { scene } = useGLTF('tu_modelo.glb');

  // 1. Ruta del tren (ajusta estos valores)
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, -5),
    new THREE.Vector3(5, 0, 0),
    new THREE.Vector3(0, 0, 5),
    new THREE.Vector3(-5, 0, 0)
  ], true);

  // 2. Animación mínima
  useFrame((state) => {
    if (!trainRef.current) return;
    const t = (state.clock.elapsedTime % 10) / 10;
    trainRef.current.position.copy(curve.getPointAt(t));
    trainRef.current.lookAt(curve.getPointAt((t + 0.01) % 1));
  });

  // 3. Buscar el tren automáticamente
  useEffect(() => {
    scene.traverse((child) => {
      if (child.name.includes('Tren')) trainRef.current = child;
    });
  }, [scene]);

  return (
      <group ref={group} position={position}>
        <primitive object={scene} scale={0.01} position={[0, -2, 0]} />
      </group>
  );
}