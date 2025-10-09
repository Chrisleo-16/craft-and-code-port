import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 2;

  const projects = [
    {
      title: "Zenith Crypto Shop",
      description:
        "Modern VPN commerce platform revolutionizing digital services marketplace. Built secure crypto payment integration supporting Bitcoin, Ethereum, and major altcoins for maximum privacy. Engineered instant delivery system with real-time activation for VPN services and digital accounts. Implemented responsive dashboard for seamless product management across devices. Deployed on Vercel with 99.9% uptime.",
      tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Crypto API"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
      impact: "Live Production · Crypto-powered marketplace",
      github: "https://github.com/Chrisleo-16/zenith-shop-crypto",
      demo: "https://zenith-shop-crypto.vercel.app/",
    },
    {
      title: "ComSaP - Community Platform",
      description:
        "Innovative community engagement and social platform built with React. Architected scalable user interaction system with real-time updates and dynamic content management. Engineered responsive UI optimized for community discussions and collaborative projects. Implemented modern CSS animations and transitions for premium user experience. Deployed on Vercel delivering seamless performance across devices.",
      tags: ["React", "CSS3", "JavaScript", "Vercel", "Responsive Design"],
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
      impact: "Live Production · Community Engagement",
      github: "https://github.com/Chrisleo-16/ComSaP",
      demo: "https://comsap.vercel.app/",
    },
    {
      title: "Digital Delights",
      description:
        "Interactive digital experience platform powered by React and Vite. Built lightning-fast application with modern JavaScript architecture and optimized build tooling. Implemented smooth user interactions with responsive design patterns and clean UI components. Leveraged Vite's HMR for exceptional development experience. Deployed with optimized performance metrics on Vercel.",
      tags: ["React", "Vite", "JavaScript", "ESLint", "Vercel"],
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800",
      impact: "Live Production · Interactive Experience",
      github: "https://github.com/Chrisleo-16/digital-delights",
      demo: "https://digital-delights-delta.vercel.app/",
    },
    {
      title: "EcoVanguard Ventures",
      description:
        "Next.js environmental sustainability platform empowering eco-conscious businesses. Architected scalable event management system for green initiatives and sustainable practices. Built interactive dashboard tracking carbon footprint reduction and environmental impact metrics. Implemented real-time collaboration features for community-driven sustainability projects. Optimized performance for lightning-fast page loads.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Vercel"],
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
      impact: "Sustainability-focused · Community platform",
      github: "https://github.com/Chrisleo-16/ECOVENT",
      demo: "#",
    },
    {
      title: "JewaPropertyPro",
      description:
        "Comprehensive real estate management platform streamlining property listings and client interactions. Engineered intuitive property search with advanced filtering and geolocation features. Built responsive UI optimized for both property seekers and real estate agents. Implemented secure contact forms and lead management system. Designed mobile-first approach ensuring seamless experience across all devices.",
      tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "PHP"],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
      impact: "Property Management · Real Estate Solution",
      github: "https://github.com/Chrisleo-16/JewaPropertyPro",
      demo: "#",
    },
    {
      title: "SoundWave Music Platform",
      description:
        "Dynamic music streaming and discovery platform built for audiophiles. Developed rich audio player with playlist management and personalized recommendations. Implemented responsive design ensuring flawless playback across desktop and mobile devices. Engineered smooth animations and transitions for premium user experience. Integrated social features for music sharing and community engagement.",
      tags: ["JavaScript", "HTML5", "CSS3", "Web Audio API", "Responsive Design"],
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
      impact: "Music Discovery · Audio Streaming",
      github: "https://github.com/Chrisleo-16/soundwave",
      demo: "#",
    },
  ];

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + projectsPerPage);

  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

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

        {/* Animated Paginated Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8"
          >
            {currentProjects.map((project, index) => (
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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-card rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
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
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="hover:bg-accent/10 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>

          <div className="text-sm font-semibold">
            Page <span className="text-accent">{currentPage}</span> of {totalPages}
          </div>

          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2"
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
