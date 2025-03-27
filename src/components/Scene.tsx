import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
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
  const mixer = useRef<THREE.AnimationMixer>();
  const clock = useRef<THREE.Clock>(new THREE.Clock());

  const { scene, animations } = useGLTF('https://threejs.org/examples/models/gltf/LittlestTokyo.glb') as GLTFResult & {
    animations: THREE.AnimationClip[];
  };

  useEffect(() => {
    if (group.current && animations.length) {
      mixer.current = new THREE.AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[0]);
      action.play();
    }
  }, [animations]);

  useFrame(() => {
    if (mixer.current) {
      const delta = clock.current.getDelta();
      mixer.current.update(delta);
    }
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.current.getElapsedTime() / 2) * 0.3;
    }
  });

  return (
      <group ref={group} position={position} dispose={null}>
        <primitive
            object={scene}
            scale={0.008}
            position={[0, -1.5, 0]} // Moved up to -1.5 from -3
            rotation={[0, Math.PI / 4, 0]}
        />
      </group>
  );
}

// Preload the model
useGLTF.preload('https://threejs.org/examples/models/gltf/LittlestTokyo.glb');