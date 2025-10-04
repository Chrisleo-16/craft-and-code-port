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
      title: "Enterprise Data Analytics Platform",
      description: "Architected and built a real-time analytics platform processing 10M+ events daily. Implemented ML-powered insights dashboard that reduced data analysis time from hours to seconds, enabling C-suite executives to make data-driven decisions 10x faster. Optimized query performance by 400% through strategic indexing and caching.",
      tags: ["React", "Python", "TensorFlow", "PostgreSQL", "Redis", "AWS"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      impact: "2,500+ enterprise users · $4.2M ARR",
      github: "#",
      demo: "#",
    },
    {
      title: "Real-Time Collaboration SaaS",
      description: "Led development of a multiplayer collaboration tool competing with Figma and Miro. Built operational transformation engine handling concurrent edits from 100+ simultaneous users with sub-50ms latency. Scaled to 50K+ DAU with 99.97% uptime. Implemented WebRTC for peer-to-peer connections, reducing server costs by 60%.",
      tags: ["Next.js", "WebSocket", "WebRTC", "Redis", "MongoDB", "Kubernetes"],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      impact: "50K+ daily active users · Series A funded",
      github: "#",
      demo: "#",
    },
    {
      title: "AI Recommendation Engine",
      description: "Designed and deployed a machine learning recommendation system for e-commerce platform with 2M+ SKUs. Implemented collaborative filtering and deep learning models achieving 35% increase in conversion rate and 42% boost in average order value. System processes 500K recommendations per minute at peak traffic.",
      tags: ["Python", "PyTorch", "Node.js", "AWS Lambda", "DynamoDB"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
      impact: "$12M+ annual revenue increase",
      github: "#",
      demo: "#",
    },
    {
      title: "Healthcare Compliance Platform",
      description: "Built HIPAA-compliant patient management system serving 300+ healthcare providers. Engineered automated appointment scheduling reducing no-shows by 52%, saving 15,000+ staff hours annually. Implemented robust audit logging and encryption meeting SOC 2 Type II requirements. Integrated with 8 major EHR systems.",
      tags: ["React", "Express", "PostgreSQL", "Docker", "AWS", "FHIR"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
      impact: "300+ clinics · 1M+ appointments managed",
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
