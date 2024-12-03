import { useCallback, useEffect, useState } from 'react';

export function useScreen() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const setScreen = useCallback(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', setScreen, { passive: true });

    return () => {
      window.removeEventListener('resize', setScreen);
    };
  }, [setScreen]);

  return { width: width, height: height };
}
