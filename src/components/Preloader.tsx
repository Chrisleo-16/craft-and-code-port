import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPhase, setCurrentPhase] = useState<"words" | "progress">("words");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const words = [
    "Alrrrright asanti sana",
    "Ndugu brother mpenzi mtazamaji",
    "Tunakuletea hapa basi kazi moja clean"
  ];

  useEffect(() => {
    // Word sequence phase: 5 seconds per word × 3 words = 15 seconds
    const wordTimer = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev < words.length - 1) {
          return prev + 1;
        } else {
          clearInterval(wordTimer);
          setCurrentPhase("progress");
          return prev;
        }
      });
    }, 5000);

    // Progress phase starts after words (15s) and lasts 8 seconds
    const progressTimer = setTimeout(() => {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + (100 / 80); // 8000ms / 100ms intervals = 80 steps
        });
      }, 100);

      setTimeout(() => {
        setIsLoading(false);
      }, 8000);
    }, 15000);

    return () => {
      clearInterval(wordTimer);
      clearTimeout(progressTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Words Phase */}
          {currentPhase === "words" && (
            <div className="relative w-full max-w-4xl px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWordIndex}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                  className="text-center"
                >
                  <h2 
                    className="text-3xl sm:text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-[gradient_3s_ease_infinite]"
                    style={{
                      backgroundImage: "var(--gradient-primary)",
                      filter: "drop-shadow(0 0 30px hsl(var(--accent) / 0.3))"
                    }}
                  >
                    {words[currentWordIndex]}
                  </h2>
                  
                  {/* Elegant underline animation */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
                    style={{ 
                      width: "60%",
                      boxShadow: "var(--shadow-glow)"
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Progress Phase */}
          {currentPhase === "progress" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-center gap-12"
            >
              {/* Logo with Pulse and Circular Progress */}
              <div className="relative">
                {/* Pulsing Glow Background */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 -m-12 rounded-full blur-2xl"
                  style={{
                    background: "radial-gradient(circle, hsl(var(--accent) / 0.4), transparent 70%)"
                  }}
                />

                {/* Circular Progress Ring */}
                <svg className="absolute -inset-4 w-48 h-48" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                  />
                  {/* Progress circle */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                    transition={{ duration: 0.1 }}
                    style={{
                      transform: "rotate(-90deg)",
                      transformOrigin: "50% 50%",
                      filter: "drop-shadow(0 0 8px hsl(var(--accent) / 0.6))"
                    }}
                  />
                </svg>

                {/* Logo with Pulse */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10"
                >
                  <img 
                    src="/logos/chrisbenleo-high-resolution-logo-transparent.png" 
                    alt="Chris Ben Leo" 
                    className="w-40 h-40 object-contain"
                    style={{
                      filter: "drop-shadow(0 8px 24px hsl(var(--accent) / 0.3))"
                    }}
                  />
                </motion.div>
              </div>

              {/* Linear Progress Bar */}
              <div className="w-80 max-w-[90vw]">
                <div className="relative h-2 bg-border/30 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                    className="h-full rounded-full relative"
                    style={{
                      background: "var(--gradient-primary)",
                      boxShadow: "var(--shadow-glow)"
                    }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      animate={{
                        x: ["-100%", "200%"]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-foreground/30 to-transparent"
                    />
                  </motion.div>
                </div>
                
                {/* Progress Percentage */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mt-4 text-sm font-medium text-muted-foreground"
                >
                  {Math.round(progress)}%
                </motion.p>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
