import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { useRef } from "react";

const GalaxyScene = () => {
  return (
    <div className="relative">
      <Canvas
        camera={{ position: [0, 0, 30] }}
        style={{ height: "100vh" }}
        className="bg-black"
      >
        <OrbitControls />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 10]} />
        <Star />
        <Planets />
      </Canvas>
    </div>
  );
};

const Star = () => {
  return (
    <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial color={"#ffff00"} />
    </Sphere>
  );
};

const Planets = () => {
  return (
    <>
      <Planet position={[5, 0, 0]} color={"#ff0000"} size={0.5} speed={0.01} />
      <Planet position={[10, 0, 0]} color={"#00ff00"} size={0.7} speed={0.005} />
      <Planet position={[15, 0, 0]} color={"#0000ff"} size={0.4} speed={0.007} />
      <Planet position={[20, 0, 0]} color={"#ffff00"} size={0.6} speed={0.002} />
    </>
  );
};

const Planet = ({ position, color, size, speed }) => {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      // Rotate the planet around the center (the star)
      const time = clock.getElapsedTime();
      ref.current.position.x = position[0] * Math.cos(time * speed);
      ref.current.position.z = position[0] * Math.sin(time * speed);
    }
  });

  return (
    <Sphere ref={ref} args={[size, 32, 32]} position={position}>
      <meshStandardMaterial color={color} />
    </Sphere>
  );
};

export default GalaxyScene;
