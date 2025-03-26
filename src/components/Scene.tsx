import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
};

export default function Scene({ ...props }) {
  const group = useRef<THREE.Group | null>(null);
  const { scene } = useGLTF('https://threejs.org/examples/models/gltf/LittlestTokyo.glb') as GLTFResult;

  // Smooth rotation animation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime / 2) * 0.3;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} scale={0.01} position={[0, -2, 0]} />
    </group>
  );
}

// Preload the model
useGLTF.preload('https://threejs.org/examples/models/gltf/LittlestTokyo.glb');