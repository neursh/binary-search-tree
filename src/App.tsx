import { useHookstate } from '@hookstate/core';
import { OrthographicCamera, QuadraticBezierLine } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { MutableRefObject, useEffect, useMemo, useRef } from 'react';
import { Group, Line, ShaderMaterial } from 'three';
import ThreeCanvas from './ThreeCanvas';
import IndexSchema from './schemas/IndexSchema';
import SceneSchema from './schemas/SceneSchema';

export default function App() {
  const mainRef = useRef<HTMLElement>(null);
  return (
    <>
      <main ref={mainRef} className="min-h-[100vh] min-w-full">
        <ThreeCanvas eventSource={mainRef as MutableRefObject<HTMLElement>} />
        <Middleware />
      </main>
    </>
  );
}

function Middleware() {
  const ready = useHookstate(false);
  return (
    <>
      <IndexSchema>{ready.get() ? <></> : <></>}</IndexSchema>
      <SceneSchema onReady={() => ready.set(true)} camera={{ zoom: 120 }}>
        <OrthographicCamera position={[0, 0, 5]} makeDefault />
        <Scene />
      </SceneSchema>
    </>
  );
}

function Scene() {
  const xd: {
    start: [number, number, number];
    end: [number, number, number];
  }[] = useMemo(
    () => [
      {
        start: [0, 0, 0],
        end: [2, 2, 0],
      },
    ],
    []
  );
  return (
    <group>
      <DashedLines groupPosition={[0, 0, 0]} positions={xd} />
      <OpaqueLines groupPosition={[0, 0, 0]} positions={xd} />
    </group>
  );
}

function OpaqueLines(props: GroupPoints) {
  return (
    <group position={props.groupPosition}>
      {props.positions.map((line, index) => (
        <QuadraticBezierLine
          key={`o-${index}`}
          {...line}
          color="black"
          lineWidth={1}
          transparent
          opacity={0.1}
        />
      ))}
    </group>
  );
}

function DashedLines(props: GroupPoints) {
  const dashedLineGroup = useRef<Group>(null);
  const shouldRun = useRef(false);

  useEffect(() => {
    if (dashedLineGroup.current) {
      shouldRun.current = true;
    }
    return () => {
      shouldRun.current = false;
    };
  }, [dashedLineGroup]);

  useFrame((_, delta) => {
    if (shouldRun.current) {
      const lines = dashedLineGroup.current!.children;
      for (let i = 0; i < lines.length; i++) {
        (
          (lines[i] as Line).material as ShaderMaterial
        ).uniforms.dashOffset.value -= delta * 5;
      }
    }
  });

  return (
    <group position={props.groupPosition} ref={dashedLineGroup}>
      {props.positions.map((line, index) => (
        <QuadraticBezierLine
          key={`d-${index}`}
          color="black"
          {...line}
          dashed
          dashScale={10}
          lineWidth={1}
          gapSize={2}
        />
      ))}
    </group>
  );
}

interface NodesPosition {
  start: [number, number, number];
  end: [number, number, number];
}

interface GroupPoints {
  groupPosition?: [number, number, number];
  positions: NodesPosition[];
}
