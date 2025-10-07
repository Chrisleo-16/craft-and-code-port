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
      title: "Zenith Crypto Shop",
      description: "Modern VPN commerce platform revolutionizing digital services marketplace. Built secure crypto payment integration supporting Bitcoin, Ethereum, and major altcoins for maximum privacy. Engineered instant delivery system with real-time activation for VPN services and digital accounts. Implemented responsive dashboard for seamless product management across devices. Deployed on Vercel with 99.9% uptime.",
      tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Crypto API"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
      impact: "Live Production · Crypto-powered marketplace",
      github: "https://github.com/Chrisleo-16/zenith-shop-crypto",
      demo: "https://zenith-shop-crypto.vercel.app/",
    },
    {
      title: "EcoVanguard Ventures",
      description: "Next.js environmental sustainability platform empowering eco-conscious businesses. Architected scalable event management system for green initiatives and sustainable practices. Built interactive dashboard tracking carbon footprint reduction and environmental impact metrics. Implemented real-time collaboration features for community-driven sustainability projects. Optimized performance for lightning-fast page loads.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Vercel"],
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
      impact: "Sustainability-focused · Community platform",
      github: "https://github.com/Chrisleo-16/ECOVENT",
      demo: "#",
    },
    {
      title: "JewaPropertyPro",
      description: "Comprehensive real estate management platform streamlining property listings and client interactions. Engineered intuitive property search with advanced filtering and geolocation features. Built responsive UI optimized for both property seekers and real estate agents. Implemented secure contact forms and lead management system. Designed mobile-first approach ensuring seamless experience across all devices.",
      tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "PHP"],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
      impact: "Property Management · Real Estate Solution",
      github: "https://github.com/Chrisleo-16/JewaPropertyPro",
      demo: "#",
    },
    {
      title: "SoundWave Music Platform",
      description: "Dynamic music streaming and discovery platform built for audiophiles. Developed rich audio player with playlist management and personalized recommendations. Implemented responsive design ensuring flawless playback across desktop and mobile devices. Engineered smooth animations and transitions for premium user experience. Integrated social features for music sharing and community engagement.",
      tags: ["JavaScript", "HTML5", "CSS3", "Web Audio API", "Responsive Design"],
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
      impact: "Music Discovery · Audio Streaming",
      github: "https://github.com/Chrisleo-16/soundwave",
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
