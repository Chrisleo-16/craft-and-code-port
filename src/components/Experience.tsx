"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, Award } from "lucide-react";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      title: "Frontend Engineer Intern",
      company: "Xmobit.com",
      period: "1 Month (2025)",
      description:
        "Contributed to developing responsive interfaces and integrating RESTful APIs for a real-time analytics dashboard. Focused on improving design consistency and optimizing React component performance.",
      achievements: [
        "Implemented dynamic UI components reducing code redundancy by 25%",
        "Collaborated with design team to refine brand consistency across web pages",
        "Optimized API data fetching to improve load times by 40%",
      ],
    },
    {
      title: "Software Engineer Intern",
      company: "KIwami Tech",
      period: "4 Months (2025)",
      description:
        "Worked on full-stack development for an internal project management system. Integrated authentication, task tracking, and analytics features using React, Node.js, and Supabase.",
      achievements: [
        "Developed reusable React modules adopted across 3 internal tools",
        "Built secure authentication flow with Supabase and role-based access control",
        "Collaborated in agile sprints improving sprint velocity by 18%",
      ],
    },
  ];

  const certification = {
    title: "Certified Full Stack Software Developer",
    issuer: "Modcom Institute of Technology",
    description:
      "Gained hands-on experience at an Institute of Technology that emphasizes innovation, collaboration, and building AI-powered solutions with real-world impact.",
  };

  return (
    <section id="experience" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* --- Experience Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Professional Journey</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">
            Hands-on experience in building real-world products through short-term collaborations and internships.
          </p>
        </motion.div>

        {/* --- Experience Timeline --- */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
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

        {/* --- Single Certification Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            <Award className="w-6 h-6 text-accent" /> Certification
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-primary mx-auto mb-8" />

          <div className="max-w-md mx-auto bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <h4 className="text-2xl font-semibold mb-1">{certification.title}</h4>
            <p className="text-accent font-medium mb-2">{certification.issuer}</p>
            <p className="text-muted-foreground mb-4">{certification.description}</p>
            <img src="/logos/IMG_20251007_083248_677.jpg" alt="Certificate" className="w-full rounded-lg mt-4" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
