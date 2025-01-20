"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';

const variants = {
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.5
    }
  },
  out: {
    opacity: 0,
    scale: 1,
    y: 40,
    transition: {
      duration: 0.75
    }
  }
};

const TransitionEffect = ({ children }) => {
  const router = useRouter();

  return (
    <div className="effect-1">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.asPath} {/* Ensure the key changes based on the path */}
          variants={variants}
          animate="in"
          initial="out"
          exit="out"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TransitionEffect;
