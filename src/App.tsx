import { useRef } from 'react';
import DisplayGraph from './components/DisplayGraph';
import Settings from './components/Settings';

export default function App() {
  const mainRef = useRef<HTMLElement>(null);
  return (
    <>
      <main ref={mainRef} className="min-h-[100vh] min-w-full">
        <Settings />
        <DisplayGraph />
      </main>
    </>
  );
}
