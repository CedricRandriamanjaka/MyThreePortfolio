import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei' // seulement si vous voulez debugger en tournant la caméra
import InteractiveSphere from './InteractiveSphere'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#222' }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        // gl={{ antialias: true }}
      >
        {/* Éclairage minimaliste */}
        <ambientLight intensity={0.3} color="#ffffff" />
        <directionalLight intensity={0.7} position={[5, 5, 5]} color="#ffffff" />

        {/* Sphère interactive */}
        <InteractiveSphere />

        {/*
          Pour déboguer la caméra, vous pouvez (temporairement) activer OrbitControls :
          <OrbitControls />
        */}
      </Canvas>
    </div>
  )
}
