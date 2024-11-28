import { useCallback, useEffect } from 'react';

export function useScreenCallback(
  callback: (props: { width: number; height: number }) => void
) {
  const setScreen = useCallback(() => {
    callback({ width: window.innerWidth, height: window.innerHeight });
  }, [callback]);

  useEffect(() => {
    window.addEventListener('resize', setScreen, { passive: true });

    return () => {
      window.removeEventListener('resize', setScreen);
    };
  }, [setScreen]);
}
