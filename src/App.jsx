import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene'; // Garde le même composant Scene
import * as THREE from 'three';

export default function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(98deg, rgba(133,44,224,1) 10%, rgba(181,126,237,1) 30%, rgb(229, 255, 99) 100%)', // Fond dégradé
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
