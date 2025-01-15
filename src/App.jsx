import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './components/three/Scene'; // Garde le même composant Scene
import * as THREE from 'three';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(97deg, rgba(5,9,56,1) 20%, rgba(65,29,172,1) 52%, rgba(70,2,145,1) 75%, rgba(5,9,56,1) 100%)',
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
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
    </Router>
  );
}
