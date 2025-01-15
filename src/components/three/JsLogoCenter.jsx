import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function JsLogoCenter() {
  const logoRef = useRef(); // Référence au logo
  const [currentLogo, setCurrentLogo] = useState(
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
  );

  const logos = [
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', // Revenir à JS
  ];

  let logoIndex = 0;
  const rotationSpeed = 0.01; // Vitesse de rotation
  const resetRotation = -Math.PI / 2 + 0.78; // Position initiale de rotation (-90°)

  
  // Initialiser correctement la position de rotation
  useFrame(() => {
    if (logoRef.current) {
      // Rotation continue
      logoRef.current.rotation.y += rotationSpeed;
      
      // Vérifie si une demi-rotation est atteinte
      if (logoRef.current.rotation.y >= (Math.PI / 2) + 0.7 ) {
        // Remettre à la rotation initiale (-90°)
        logoRef.current.rotation.y = resetRotation;

        // Changer le logo
        logoIndex = (logoIndex + 1) % logos.length;
        setCurrentLogo(logos[logoIndex]);

        // Mettre à jour la texture
        logoRef.current.material.map = new THREE.TextureLoader().load(logos[logoIndex]);
      }
    }
  });

  return (
    <mesh
      ref={logoRef}
      // Assurer que la position initiale est bien respectée
      rotation={[0, resetRotation, 0]} // -90° sur l'axe Y
      position={[-1.5, 0, 0]}
    >
      <planeGeometry args={[0.5, 0.5]} />
      <meshBasicMaterial
        map={new THREE.TextureLoader().load(currentLogo)}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
