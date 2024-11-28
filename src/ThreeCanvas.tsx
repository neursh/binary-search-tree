import { AdaptiveEvents, Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { MutableRefObject } from 'react';
import Tunnel from './schemas/Tunnel';

export default function ThreeCanvas(props: {
  eventSource: MutableRefObject<HTMLElement>;
}) {
  return (
    <Canvas
      shadows
      gl={{ localClippingEnabled: true, alpha: true, antialias: true }}
      dpr={[1, 2]}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
      }}
      eventSource={props.eventSource}
    >
      <Tunnel.Out name="canvas-view" />
      <AdaptiveEvents />
      <Preload all />
    </Canvas>
  );
}
