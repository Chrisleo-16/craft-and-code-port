import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "AI-Powered Analytics Platform",
      description: "Built a comprehensive analytics dashboard leveraging machine learning to provide actionable business insights, reducing decision-making time by 60%.",
      tags: ["React", "Python", "TensorFlow", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      impact: "500+ active users",
      github: "#",
      demo: "#",
    },
    {
      title: "Real-Time Collaboration Tool",
      description: "Developed a WebSocket-based collaboration platform enabling teams to work together seamlessly, improving productivity by 40%.",
      tags: ["Next.js", "WebSocket", "Redis", "MongoDB"],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      impact: "10K+ daily users",
      github: "#",
      demo: "#",
    },
    {
      title: "E-Commerce Optimization System",
      description: "Created an intelligent recommendation engine that increased conversion rates by 35% through personalized shopping experiences.",
      tags: ["TypeScript", "Node.js", "AWS", "Docker"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
      impact: "$2M+ revenue impact",
      github: "#",
      demo: "#",
    },
    {
      title: "Healthcare Appointment Platform",
      description: "Designed and built a patient management system streamlining healthcare operations and reducing no-shows by 45%.",
      tags: ["React", "Express", "PostgreSQL", "Tailwind"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
      impact: "5K+ appointments/month",
      github: "#",
      demo: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-background to-muted/20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-4" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-world solutions that make a difference
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-4">
                    <a
                      href={project.github}
                      className="p-3 bg-card rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={project.demo}
                      className="p-3 bg-card rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 mb-4 text-sm text-accent font-semibold">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
                    {project.impact}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="hover:bg-accent/10 transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
