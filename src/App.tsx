import { useHookstate } from '@hookstate/core';
import { OrthographicCamera } from '@react-three/drei';
import { MutableRefObject, useRef } from 'react';
import Scene from './components/Scene';
import ThreeCanvas from './components/ThreeCanvas';
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
