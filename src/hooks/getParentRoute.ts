import { useCallback } from 'react';

export function useGetParentRoute() {
  return useCallback((pathname: string) => {
    let slashes = 0;
    let sliceAt = 0;
    for (sliceAt; sliceAt < pathname.length; sliceAt++) {
      if (pathname[sliceAt] == '/') {
        slashes++;
      }
      if (slashes === 2) {
        break;
      }
    }

    return pathname.slice(0, sliceAt);
  }, []);
}
