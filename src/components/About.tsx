import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Sparkles, Target } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: Code2,
      title: "Technical Excellence",
      description: "Expert in React, TypeScript, Node.js, Python, and cloud architecture. Proven track record of building systems that handle millions of requests with 99.9% uptime.",
    },
    {
      icon: Target,
      title: "Strategic Problem Solver",
      description: "Data-driven decision maker who balances business impact with technical debt. Reduced infrastructure costs by 40% while improving performance metrics across the board.",
    },
    {
      icon: Sparkles,
      title: "User-Centric Design",
      description: "Bridging engineering and design to create intuitive interfaces. Increased user engagement by 65% through thoughtful UX improvements and accessibility standards.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-muted/20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 md:p-12 shadow-xl mb-12"
          >
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              I'm a full-stack software engineer with over 6 years of experience building products that scale. 
              From early-stage startups to enterprise solutions serving millions, I've architected systems that balance 
              performance, maintainability, and user delight. My approach combines technical excellence with product thinking—
              I don't just write code, I solve problems that matter.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              My expertise spans modern web technologies, cloud infrastructure, and AI integration. I've led teams through 
              complex technical migrations, reduced system costs by 40% through optimization, and mentored junior developers 
              into confident contributors. Whether it's building real-time collaboration tools or optimizing database queries 
              at scale, I thrive in environments where impact is measured and innovation is celebrated.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Beyond code, I'm passionate about open source contribution, technical writing, and staying ahead of industry 
              trends. I believe the best software is built at the intersection of empathy, craftsmanship, and continuous learning. 
              My mission is to build technology that doesn't just work—it makes a meaningful difference in people's lives.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <highlight.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                <p className="text-muted-foreground">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
