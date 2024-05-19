
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';

function Viewport() {
	const [orientation, setOrientation] = useState({ absolute: false, alpha: 0, beta: 0, gamma: 0 });

	useEffect(() => {
		window.addEventListener("deviceorientation", (event: DeviceOrientationEvent) => {
			const alpha = THREE.MathUtils.degToRad(event.alpha ?? 0);
			const beta = THREE.MathUtils.degToRad(event.beta ?? 0);
			const gamma = THREE.MathUtils.degToRad(event.gamma ?? 0);

			setOrientation({ absolute: event.absolute, alpha, beta, gamma });
		}, true);
	}, []);

	// useEffect(() => {
	// 	let lastEvent: DeviceMotionEvent | null = null;

	// 	window.addEventListener("devicemotion", (event: DeviceMotionEvent) => {
	// 		lastEvent = event;
	// 	});

	// 	window.setInterval(() => {
	// 		if (lastEvent !== null) {
	// 			console.log(lastEvent);
	// 		}
	// 	}, 1500)
	// }, []);

	const euler = new THREE.Euler(orientation.beta, orientation.alpha, -1 * orientation.gamma, 'YXZ');

	return (
		<Canvas>
			<mesh rotation={euler}>
				<boxGeometry args={[1.5, 1, 3]} />
				<meshNormalMaterial />
			</mesh>
		</Canvas>
	);
}

export default Viewport;
