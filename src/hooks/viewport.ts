import { useThree } from '@react-three/fiber';
import { useState } from 'react';
import { useScreenCallback } from './screenCallback';

export function useViewport() {
  const { viewport } = useThree();

  const [width, setWidth] = useState(viewport.getCurrentViewport().width);
  const [height, setHeight] = useState(viewport.getCurrentViewport().height);

  useScreenCallback(() => {
    const actualViewport = viewport.getCurrentViewport();
    setWidth(actualViewport.width);
    setHeight(actualViewport.height);
  });

  return { width: width, height: height };
}
