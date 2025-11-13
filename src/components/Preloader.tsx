import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress simulation (10s total)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        return prev + (100 / 100); // 100 steps → 10s total (100ms × 100)
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-secondary"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1, ease: [0.45, 0.05, 0.55, 0.95] }}
        >
          {/* Animated Logo with Rotating Halo */}
          <div className="relative flex items-center justify-center">
            
            {/* Outer rotating gradient halo with breathing glow */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.03, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute w-56 h-56 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, hsl(var(--accent)) 0%, hsl(var(--primary)) 40%, hsl(var(--accent)) 100%)",
                maskImage:
                  "radial-gradient(circle, transparent 58%, black 61%)",
                WebkitMaskImage:
                  "radial-gradient(circle, transparent 58%, black 61%)",
                filter: "blur(6px)",
                opacity: 0.9,
              }}
            />

            {/* Subtle outer glow shimmer layer */}
            <motion.div
              animate={{
                rotate: -360,
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-64 h-64 rounded-full blur-3xl"
              style={{
                background:
                  "conic-gradient(from 180deg, hsl(var(--accent)) 0%, transparent 60%, hsl(var(--primary)) 100%)",
                maskImage:
                  "radial-gradient(circle, transparent 55%, black 70%)",
                WebkitMaskImage:
                  "radial-gradient(circle, transparent 55%, black 70%)",
              }}
            />

            {/* Progress Ring */}
            <svg className="absolute w-48 h-48" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="2"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                transition={{ duration: 0.2 }}
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "50% 50%",
                  filter: "drop-shadow(0 0 14px hsl(var(--accent) / 0.5))",
                }}
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>

            {/* Logo */}
            <motion.img
              src="/logos/chrisbenleo-high-resolution-logo-transparent.png"
              alt="Chris Ben Leo"
              className="relative z-10 w-36 h-36 object-contain"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: [0.95, 1, 0.95],
                opacity: 1,
              }}
              transition={{
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 1.5 },
              }}
              style={{
                filter: "drop-shadow(0 6px 22px hsl(var(--accent) / 0.4))",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
