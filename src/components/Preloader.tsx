import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Reduced from 2000ms to 800ms for faster load

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut"
            }}
          >
            {/* Logo Image */}
            <img 
              src="/logos/chrisbenleo-high-resolution-logo-transparent.png" 
              alt="Chris Ben Leo" 
              className="w-32 h-32 object-contain"
            />
            
            {/* Animated Ring Around Logo */}
            <motion.div
              className="absolute inset-0 w-32 h-32 border-4 border-transparent rounded-full border-t-accent"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
