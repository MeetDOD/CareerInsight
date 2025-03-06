import { OrbitControls, Environment as DreiEnvironment, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import Avatar from "./Avatar";

const Background = () => {
    const texture = useTexture("/ThreeD/bg.png");
    return <mesh>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial map={texture} />
    </mesh>;
};

const Scene = ({ isSpeaking }) => {
    return (
        <Canvas className="rounded-lg" shadows camera={{ position: [0, 0, 8], fov: 42 }} style={{ width: "100%", height: "100%" }}>
            <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />
            <DreiEnvironment preset="sunset" />
            <color attach="background" args={["#ececec"]} />
            <Background />
            <Avatar position={[0, -2.6, 5]} scale={2} isSpeaking={isSpeaking} />
        </Canvas>
    );
};

export default Scene;
