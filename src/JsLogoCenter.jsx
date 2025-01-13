import React from 'react'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

export default function JsLogoCenter() {
  // Charge la texture PNG ou SVG depuis un CDN
  const logoTexture = useLoader(
    THREE.TextureLoader,
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
  )

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[0.5, 0.5]} />
      <meshBasicMaterial
        map={logoTexture}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
