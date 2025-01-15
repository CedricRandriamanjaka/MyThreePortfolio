import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene'; // Garde le même composant Scene

export default function ThreeBackground() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(97deg, rgba(5,9,56,1) 20%, rgba(65,29,172,1) 52%, rgba(70,2,145,1) 75%, rgba(5,9,56,1) 100%)', // Fond dégradé
        overflow: 'hidden',
      }}
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0.49, 1.8], // Position de la caméra
          fov: 60,
          near: 0.1,
          far: 100,
        }}
        onCreated={(state) => {
          state.gl.physicallyCorrectLights = true;
          state.scene.fog = null; // Supprime le brouillard si nécessaire
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
