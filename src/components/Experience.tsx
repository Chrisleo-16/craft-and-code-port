import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "DataVision AI (Series B, $45M funded)",
      period: "2022 - Present",
      description: "Technical lead for enterprise analytics platform serving Fortune 500 clients. Architecting distributed systems processing billions of events monthly. Leading team of 8 engineers across frontend, backend, and infrastructure.",
      achievements: [
        "Architected microservices migration reducing infrastructure costs by $180K/year (40% reduction)",
        "Built real-time data processing pipeline handling 10M+ events daily with 99.95% reliability",
        "Reduced P95 API latency from 2.1s to 320ms through database optimization and caching strategy",
        "Mentored 3 junior engineers who were promoted to mid-level within 12 months",
        "Led security audit achieving SOC 2 Type II compliance, unlocking $8M+ in enterprise deals",
      ],
    },
    {
      title: "Full Stack Engineer",
      company: "CollabSpace (Acquired by Microsoft 2023)",
      period: "2020 - 2022",
      description: "Core team member (#3 engineering hire) building real-time collaboration SaaS from 0 to 50K+ DAU. Owned entire frontend architecture and contributed significantly to WebSocket infrastructure. Worked directly with founders on product strategy and technical roadmap.",
      achievements: [
        "Built operational transformation engine powering real-time collaborative editing for 100+ concurrent users",
        "Implemented WebRTC peer-to-peer connections reducing CDN costs by $4K/month (60%)",
        "Created component library and design system used across 12+ product features",
        "Established CI/CD pipeline cutting deployment time from 45min to 8min (82% improvement)",
        "Scaled application from 200 to 50,000 daily active users with zero downtime",
      ],
    },
    {
      title: "Software Engineer",
      company: "MedTech Solutions (Healthcare SaaS)",
      period: "2018 - 2020",
      description: "Full-stack developer building HIPAA-compliant healthcare management platform. Worked on patient scheduling, EHR integration, and billing systems. Collaborated with compliance and product teams to meet strict healthcare regulations.",
      achievements: [
        "Developed automated appointment scheduling system reducing patient no-shows by 52%",
        "Integrated with 8 major EHR systems (Epic, Cerner, Allscripts) via FHIR/HL7 protocols",
        "Built admin dashboard managing 300+ healthcare providers and 50K+ patient records",
        "Implemented comprehensive audit logging and encryption meeting HIPAA and SOC 2 requirements",
        "Created API rate-limiting and caching layer improving system throughput by 3x",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Professional Journey</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">6+ years building products that scale from zero to millions</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary hidden md:block" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-8 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent border-4 border-background hidden md:block shadow-lg" />

                  <div className="md:ml-20 bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                        <div className="flex items-center gap-2 text-accent">
                          <Briefcase className="w-4 h-4" />
                          <span className="font-semibold">{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground mt-2 md:mt-0">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    <p className="text-foreground/80 mb-4">{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
