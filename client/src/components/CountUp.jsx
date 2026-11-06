import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

export default function CountUp({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => { ref.current.textContent = Math.round(v); } });
    return () => controls.stop();
  }, [inView, to]);

  return <b ref={ref}>0</b>;
}
