"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Skills and logos
  const skills = [
    { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
    { name: "Kotlin", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { name: "Supabase", logo: "/logos/supabase-logo-icon.png" },
    { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
    { name: "Insomnia", logo: "https://raw.githubusercontent.com/get-icon/geticon/master/icons/insomnia.svg" },
    { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
    { name: "Netlify", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" },
    { name: "PythonAnywhere", logo: "/logos/Pythonanywhere--Streamline-Simple-Icons.svg" },
    { name: "Machine Learning", logo: "https://cdn-icons-png.flaticon.com/512/4149/4149677.png" },
    { name: "Data Science", logo: "https://cdn-icons-png.flaticon.com/512/2889/2889676.png" },
    { name: "MPESA API", logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg" },
  ];

  const row1 = skills.slice(0, 7);
  const row2 = skills.slice(7, 14);
  const row3 = skills.slice(14);

  // ✅ Type-safe continuous marquee animation
  const marqueeAnimation = (direction: "left" | "right"): TargetAndTransition => ({
    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 40,
      ease: "linear",
    },
  });

  return (
    <section
      id="skills"
      className="relative py-20 bg-gradient-to-b from-background to-muted/10 overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto px-4 text-center">
        {/* Header Animation */}
        <motion.div
          data-aos="fade-up"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Full Stack Expertise</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
            Technologies and tools I use to craft scalable, performant, and intelligent digital products.
          </p>
        </motion.div>

        {/* Continuous Skill Marquee Rows */}
        <div className="space-y-12">
          {[row1, row2, row3].map((row, rowIndex) => {
            const direction = rowIndex % 2 === 0 ? "left" : "right";
            return (
              <div key={rowIndex} className="relative overflow-hidden">
                <motion.div
                  className="flex gap-6 w-max"
                  animate={marqueeAnimation(direction)}
                >
                  {/* Double the items for seamless looping */}
                  {[...row, ...row].map((skill, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-card border border-border/40 rounded-full px-5 py-3 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <img src={skill.logo} alt={skill.name} className="w-6 h-6 object-contain" />
                      <span className="font-medium text-foreground">{skill.name}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Gradient fade edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background via-background/70 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background via-background/70 to-transparent pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
