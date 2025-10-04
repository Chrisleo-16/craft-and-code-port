import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      category: "Frontend Development",
      skills: [
        { name: "React / Next.js", level: 95 },
        { name: "TypeScript / JavaScript", level: 94 },
        { name: "Vue.js / Nuxt", level: 85 },
        { name: "Tailwind / CSS-in-JS", level: 92 },
        { name: "State Management (Redux, Zustand)", level: 90 },
      ],
    },
    {
      category: "Backend & Database",
      skills: [
        { name: "Node.js / Express / Fastify", level: 93 },
        { name: "Python / Django / FastAPI", level: 88 },
        { name: "PostgreSQL / MongoDB", level: 90 },
        { name: "GraphQL / REST APIs", level: 92 },
        { name: "Redis / Caching Strategies", level: 85 },
      ],
    },
    {
      category: "DevOps & Cloud",
      skills: [
        { name: "AWS / GCP / Azure", level: 87 },
        { name: "Docker / Kubernetes", level: 84 },
        { name: "CI/CD Pipelines", level: 90 },
        { name: "Terraform / Infrastructure as Code", level: 82 },
        { name: "Monitoring (Datadog, Grafana)", level: 85 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto" />
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-accent font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.1 + 0.3,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
