import React, { Suspense } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import { RibbonWave } from "./RibbonWave";

// Exemple de composant "Scene" :
// - Lumière directionnelle + ambient
// - Environnement HDRI (optionnel)
// - RibbonWave
export function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight intensity={1} position={[5, 10, 5]} />

      <Suspense fallback={null}>
        <Environment preset="sunset" background={false} />
        <RibbonWave />
      </Suspense>

      <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />
    </>
  );
}
