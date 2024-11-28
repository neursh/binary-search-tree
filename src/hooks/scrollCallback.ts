import { useCallback, useEffect } from 'react';

export function useScrollCallback(
  callback: (latest: number) => void,
  options: { normalized: boolean } = { normalized: true }
) {
  const listener = useCallback(() => {
    const scrolled =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (options.normalized) {
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      return callback(scrolled / height);
    }

    callback(scrolled);
  }, [callback, options.normalized]);

  useEffect(() => {
    window.addEventListener('scroll', listener);

    return () => window.removeEventListener('scroll', listener);
  }, [listener]);
}
