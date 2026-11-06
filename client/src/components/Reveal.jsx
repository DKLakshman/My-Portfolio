import { motion } from 'framer-motion';

export default function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay }}>
      {children}
    </motion.div>
  );
}
