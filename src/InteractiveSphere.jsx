import React, { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import SphereShaderMaterial from './SphereShaderMaterial'

export default function InteractiveSphere() {
  // Référence à la mesh (pour accéder aux propriétés Three.js)
  const sphereRef = useRef()

  // Les uniforms custom dont nous avons besoin :
  // - u_time : pour animer les dégradés au fil du temps
  // - u_mouse : position du curseur (dans l’espace Normalized Device Coordinates ou monde)
  // - u_resolution : résolution de l’écran (optionnel pour certains calculs)
  const [uMouse] = useState(() => new THREE.Vector2(0, 0))

  const { size, pointer } = useThree()

  // Mise à jour à chaque frame
  useFrame((state, delta) => {
    const material = sphereRef.current.material

    // Met à jour l’uniform du temps
    material.uniforms.u_time.value += delta

    // Récupération de la position de la souris dans le viewport
    // pointer.x, pointer.y sont déjà normalisés dans [-1, 1] par défaut dans R3F
    uMouse.set(pointer.x, pointer.y)

    // Puis on envoie au shader
    material.uniforms.u_mouse.value = uMouse
  })

  return (
    <mesh ref={sphereRef}>
      {/* 
        Geometry : une sphere subdivisée pour avoir suffisamment de vertices
        afin d’observer des plis/déformations
      */}
      <sphereGeometry args={[1, 128, 128]} />

      {/* Matériau sur-mesure (custom shader) */}
      <SphereShaderMaterial />
    </mesh>
  )
}
