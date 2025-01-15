import React, { Suspense,useRef } from 'react'
import { OrbitControls, Environment, Grid } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { InteractiveSphere } from './InteractiveSphere'
import { JsLogoCenter } from './JsLogoCenter'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber';

export function Scene() {
    const { camera } = useThree(); // Accéder à la caméra actuelle
  const logCameraPositionRef = useRef(false); // Utilisé pour éviter les logs en continu

  useFrame(() => {
    // Loguer la position et direction de la caméra à chaque changement de logo
      const cameraDirection = new THREE.Vector3();
      camera.getWorldDirection(cameraDirection);

    //   console.log('Position de la caméra :', camera.position);
    //   console.log('Direction de la caméra (cible) :', cameraDirection);

      logCameraPositionRef.current = false; // Réinitialiser pour éviter des logs répétés
  });
  return (
    <>
      {/* Lumière ambiante très faible pour garder du contraste */}
      <ambientLight intensity={0.05} />

      {/* Lumière directionnelle principale */}
      <directionalLight
        castShadow
        intensity={1}
        position={[5, 10, 5]}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />

      {/* SpotLight pour un éclairage plus dramatique, optionnel */}
      {/* <spotLight
        intensity={0.1}
        position={[-5, 5, 0]}
        angle={0.3}
        penumbra={0.5}
        castShadow
      /> */}

      {/* Grid au sol (optionnel) */}
       {/* <Grid
        position={[0, 0, 0]}
        args={[100, 100]}
        sectionColor="#bbb"
        fadeDistance={30}
      />  */}

      {/* Chargement asynchrone de l'environnement HDRI et des modèles */}
      <Suspense fallback={null}>
        {/* Environment 3D (HDRI) : tu peux tester différents presets (sunset, dawn, warehouse, city...) */}
        <Environment
          preset="dawn" // sunset, dawn, warehouse, city...
          background={false} // ou true si tu veux utiliser l'HDRI en fond
        />

        {/* Ta sphère interactive au shader personnalisé */}
        <InteractiveSphere />

        {/* Ton logo JS */}
        <JsLogoCenter />
      </Suspense>

      {/* Post-processing */}
      {/* <EffectComposer> */}
        {/* Bloom pour un effet lumineux plus “pro” */}
        {/* <Bloom */}
        {/* //   intensity={0.1} // augmente si tu veux plus d'effet */}
        {/* //   luminanceThreshold={0.2} */}
        {/* //   luminanceSmoothing={0.1} */}
        {/* // /> */}
        {/* Un léger vignette pour focus le regard au centre */}
        {/* <Vignette eskil={false} offset={0.3} darkness={0.2} /> */}
    {/* //   </EffectComposer> */}

      {/* Contrôles de la caméra */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 2} // limite la rotation vers le bas
        enableRotate={false} 
       enableZoom={false} 
        enablePan={false}
      />
    </>
  )
}
