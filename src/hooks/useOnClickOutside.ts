import { useEffect, MutableRefObject } from 'react';

type PointerEvent = MouseEvent | TouchEvent;

const useOnClickOutside = (ref: MutableRefObject<null | HTMLElement>, callback: (event: PointerEvent) => void) => {
  useEffect(() => {
    const listener = (event: PointerEvent) => {
      const el = ref.current;

      if (!el || el.contains(event.target as Node)) {
        return;
      }

      callback(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
};

export default useOnClickOutside;
