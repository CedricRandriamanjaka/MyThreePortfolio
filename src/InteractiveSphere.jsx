import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { SphereShaderMaterial } from './SphereShaderMaterial'

export function InteractiveSphere() {
  const sphereRef = useRef()
  const { scene, pointer } = useThree()

  useEffect(() => {
    const material = sphereRef.current?.material
    if (material && scene.environment) {
      // On force le mapping de l’environnement à cube reflection
      scene.environment.mapping = THREE.CubeUVReflectionMapping
      material.uniforms.u_envMap.value = scene.environment
      material.uniforms.u_hasEnvMap.value = true
    }
  }, [scene.environment])

  useFrame((state, delta) => {
    const material = sphereRef.current?.material
    if (material) {
      material.uniforms.u_time.value += delta
      // On récupère la position du pointeur (-1 à +1)
      material.uniforms.u_mouse.value.set(pointer.x, pointer.y)
    }
  })

  return (
    <mesh ref={sphereRef} position={[0, 0, 0]} castShadow receiveShadow>
      <sphereGeometry args={[1, 64, 64]} />
      <SphereShaderMaterial />
    </mesh>
  )
}
