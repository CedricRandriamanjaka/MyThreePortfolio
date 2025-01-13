import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import InteractiveSphere from './InteractiveSphere';
import JsLogoCenter from './JsLogoCenter'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#eef' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* Lumière ambiante et directionnelle */}
        <ambientLight intensity={0.1} />
        <directionalLight intensity={1} position={[2, 5, 2]} castShadow />

        {/* On attend le chargement de l’Environment */}
        <Suspense fallback={null}>
          <Environment preset="dawn" />
          <InteractiveSphere />
          <JsLogoCenter />
          {/* Autres objets */}
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  );
}
