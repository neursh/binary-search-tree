import { useCallback, useEffect } from 'react';

interface MousePosition {
  X: number;
  Y: number;
}

export function useMouseCallback(callback: (latest: MousePosition) => void) {
  const setMousePos = useCallback(
    (e: MouseEvent) => {
      callback({ X: e.clientX, Y: e.clientY });
    },
    [callback]
  );

  const setTouchPos = useCallback(
    (e: TouchEvent) => {
      callback({ X: e.touches[0].clientX, Y: e.touches[0].clientY });
    },
    [callback]
  );

  useEffect(() => {
    window.addEventListener('pointermove', setMousePos, { passive: true });
    window.addEventListener('touchmove', setTouchPos, { passive: true });

    return () => {
      window.removeEventListener('pointermove', setMousePos);
      window.removeEventListener('touchmove', setTouchPos);
    };
  }, [setMousePos, setTouchPos]);
}
