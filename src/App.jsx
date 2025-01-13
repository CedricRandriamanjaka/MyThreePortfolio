import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene'; // Garde le même composant Scene
import * as THREE from 'three';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [1.7028081314405727, -0.015015088491293726, -1.3014546306937234], // Position de la caméra
          fov: 60,
          near: 0.1,
          far: 100,
        }}
        onCreated={(state) => {
          state.gl.physicallyCorrectLights = true;
          state.scene.fog = new THREE.Fog('#cfde8f', 5, 15);
          state.gl.setClearColor('#cfde8f', 1);

          // Définir la direction de la caméra (cible)
          const lookAtPoint = new THREE.Vector3(-1, -6.112456631890, -2.22044604925031); // Point vers lequel regarder
          state.camera.lookAt(lookAtPoint);

          console.log('Position de la caméra :', state.camera.position);
          console.log('Cible de la caméra :', lookAtPoint);
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
