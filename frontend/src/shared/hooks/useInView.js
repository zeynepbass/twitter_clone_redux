import { useCallback, useEffect, useRef, useState } from 'react';

export const useInView = ({ rootMargin = '400px' } = {}) => {
  const [inView, setInView] = useState(false);
  const observerRef = useRef(null);

  const ref = useCallback(
    (node) => {
      observerRef.current?.disconnect();
      if (!node) return;

      observerRef.current = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
        rootMargin,
      });
      observerRef.current.observe(node);
    },
    [rootMargin],
  );

  useEffect(() => () => observerRef.current?.disconnect(), []);

  return [ref, inView];
};
