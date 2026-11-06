import { motion } from 'framer-motion';

export default function Reveal({ children, delay = 0, className, direction, repeat = false, variant }) {
  const fromRight = direction === 'right';
  const fromLeft = direction === 'left';
  const bookPage = direction === 'book';
  const lift = variant === 'lift';
  const modern = variant === 'modern';

  return (
    <motion.div className={className} initial={{
      opacity: 0,
      x: lift || modern ? 0 : bookPage ? 90 : fromRight ? 110 : fromLeft ? -110 : 0,
      y: lift ? 55 : modern ? 24 : bookPage || direction ? 0 : 40,
      scale: lift ? 0.92 : modern ? 0.96 : 1,
      rotateX: lift ? 8 : modern ? 3 : 0,
      rotateY: bookPage ? -78 : 0,
      filter: lift ? 'blur(8px)' : modern ? 'blur(5px)' : 'blur(0px)',
      transformPerspective: bookPage || lift || modern ? 1400 : 0,
    }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0, filter: 'blur(0px)' }}
      viewport={{ once: !repeat, amount: bookPage ? 0.35 : 0.2 }} transition={{ duration: bookPage ? 1.15 : modern ? 1 : 0.9, ease: [0.2, 0.8, 0.2, 1], delay }}>
      {children}
    </motion.div>
  );
}
