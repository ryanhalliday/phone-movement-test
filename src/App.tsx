import { useEffect, useRef, useState } from 'react'
import './App.css'

import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'

function App() {
  const [readyState, setReadyState] = useState(false);

  useEffect(() => {
    // @ts-ignore
    if (window.DeviceOrientationEvent !== undefined && typeof window.DeviceOrientationEvent.requestPermission === 'function') {
      // @ts-ignore
      window.DeviceOrientationEvent.requestPermission().then((response) => {
        if (response === 'granted') {
          setReadyState(true);
        }
      }).catch(console.error);
    } else {
      setReadyState(true);
    }
  }, []);

  const [orientation, setOrientation] = useState({absolute: false, alpha: 0, beta: 0, gamma: 0});
  const meshRef = useRef<THREE.Mesh>(null);

  // useEffect(() => {
  //   const handleMotion = (event: DeviceMotionEvent) => {
  //     setCount(event.acceleration?.x || 0);
  //   }
  //   window.addEventListener("devicemotion", handleMotion, true);
  // }, []);

  useEffect(() => {
    if (readyState === false){ return; }

    window.addEventListener("deviceorientation", (event: DeviceOrientationEvent) => {
      const alpha = THREE.MathUtils.degToRad(event.alpha ?? 0);
      const beta = THREE.MathUtils.degToRad(event.beta ?? 0);
      const gamma = THREE.MathUtils.degToRad(event.gamma ?? 0);
      
      setOrientation({absolute: event.absolute, alpha, beta, gamma});
    }, true);
  }, [readyState]);

  const euler = new THREE.Euler(orientation.beta, orientation.alpha, -1 * orientation.gamma, 'YXZ');
  // meshRef.current?.quaternion.setFromEuler(euler);

  return (
    <>
      <h1>Device Motion</h1>
      <div className="card">
        <p>Device orientation: {orientation.absolute ? 'true' : 'false'} - {orientation.alpha.toFixed(3)},{orientation.beta.toFixed(3)},{orientation.gamma.toFixed(3)}</p>
        <p>Ready: {readyState ? 'Yes' : 'No'}</p>
      </div>
      <div className="card">
        <Canvas>
            <mesh ref={meshRef} rotation={euler}>
              <boxGeometry args={[1.5, 1, 3]} />
              <meshNormalMaterial />
            </mesh>
        </Canvas>
      </div>
    </>
  )
}

export default App
