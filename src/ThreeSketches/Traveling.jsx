import React, { useEffect, useState, useMemo, useRef } from "react";
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { BlurPass, Resizer, KernelSize } from 'postprocessing'
import { extend, Canvas, useFrame, useThree, useResource } from '@react-three/fiber';
import Loading from "../Loading/Loading";
import * as THREE from "three";
import { OrbitControls, PerspectiveCamera, Sparkles, Html, useProgress } from "@react-three/drei";


function Box(props) {

    let { position } = props;
    let [isHovering, setIsHovering] = useState(false);

    useEffect(() => {

    }, [isHovering]);

    return <mesh position={position}
        rotation={[2, 2, 2]}
        scale={isHovering ? 1.05 : 1}
        onPointerOver={() => setIsHovering(true)}
        onPointerOut={() => setIsHovering(false)}
    >
        <sphereGeometry attach="geometry" />
        <meshStandardMaterial attach="material" color="rgb(255,0,255)" transparent metalness={0.5} />
    </mesh>
}

export default function Traveling(props) {
    let { w, h } = props.dimens;
    return (
        <Canvas colorManagement
            camera={{ position: [0, 0, 3] }} style={{ width: w, height: h }} >

            {/* <Box position={new THREE.Vector3(0, -1, 0)} /> */}
            <directionalLight color="#ffffff" intensity={5} position={[-5, 0, 5]} />
            <OrbitControls />
            <Sparkles size={10} amount={100} scale={20} color={"#241e32"} speed={0.3} />
            {/* <ambientLight intensity={1} color="#fff" /> */}
            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.4} luminanceSmoothing={0.5} height={300} opacity={3}
                />
            </EffectComposer>
        </Canvas>
    )
}