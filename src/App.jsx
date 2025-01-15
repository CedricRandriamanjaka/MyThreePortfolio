import React from 'react';
import { Canvas } from '@react-three/fiber';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Scene } from './components/three/Scene';
import Home from './pages/Home';
import './App.css';  // <-- on importe notre CSS

export default function App() {
  return (
    <Router>
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{
            position: [0, 0.49, 1.8],
            fov: 60,
            near: 0.1,
            far: 100,
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,
            background:
              'linear-gradient(97deg, rgba(5,9,56,1) 20%, rgba(65,29,172,1) 52%, rgba(70,2,145,1) 75%, rgba(5,9,56,1) 100%)',
          }}
          onCreated={(state) => {
            state.gl.physicallyCorrectLights = true;
            state.scene.background = null;
          }}
        >
          <Scene />
        </Canvas>

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
