// InteractiveSphere.js
import React, { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import SphereShaderMaterial from './SphereShaderMaterial'

export default function InteractiveSphere() {
  const sphereRef = useRef()
  const [uMouse] = useState(() => new THREE.Vector2(0, 0))
  const { scene, pointer } = useThree()

  // Surveiller l'arrivée de scene.environment via un useEffect
  useEffect(() => {
    const mat = sphereRef.current.material
    if (!mat) return
    if (scene.environment) {
      // Forcer CubeUVReflectionMapping
      scene.environment.mapping = THREE.CubeUVReflectionMapping
      mat.uniforms.u_envMap.value = scene.environment
      mat.uniforms.u_hasEnvMap.value = true
    } else {
      mat.uniforms.u_envMap.value = null
      mat.uniforms.u_hasEnvMap.value = false
    }
  }, [scene.environment]) // se déclenche si la référence environment change

  useFrame((_, delta) => {
    if (!sphereRef.current) return

    const mat = sphereRef.current.material
    // Avancer le temps
    mat.uniforms.u_time.value += delta

    // Position de la souris
    uMouse.set(pointer.x, pointer.y)
    mat.uniforms.u_mouse.value = uMouse
  })

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[1, 128, 128]} />
      <SphereShaderMaterial />
    </mesh>
  )
}
