import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Phone, Send, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "chrisbenevansleo@gmail.com", link: "mailto:chrisbenevansleo@gmail.com" },
    { icon: Linkedin, label: "LinkedIn", value: "Leo Chrisben Evans", link: "https://www.linkedin.com/in/leo-chrisben-evans-a49570322/" },
    { icon: Phone, label: "Phone", value: "+254 748 333 763" },
    { icon: MapPin, label: "Location", value: "Nairobi, Kenya" },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-muted/20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          data-aos="fade-up"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Build Something Exceptional</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-4" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Open to full-time opportunities, consulting projects, and technical advisory roles. 
            Whether you're scaling a startup or solving complex problems at enterprise scale, let's connect.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Ready to Collaborate</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Whether you need a technical co-founder, a senior engineer to scale your product, 
              or an advisor to guide your technical strategy—I'm here to help turn ambitious ideas into reality.
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <info.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-semibold hover:text-accent transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-semibold">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-2xl p-8 shadow-lg">
              <div className="relative">
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="peer h-12 pt-6 pb-2"
                  placeholder=" "
                />
                <label
                  className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                    focusedField === "name" || formData.name
                      ? "top-2 text-xs text-accent"
                      : "top-3 text-sm text-muted-foreground"
                  }`}
                >
                  Your Name
                </label>
              </div>

              <div className="relative">
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="peer h-12 pt-6 pb-2"
                  placeholder=" "
                />
                <label
                  className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                    focusedField === "email" || formData.email
                      ? "top-2 text-xs text-accent"
                      : "top-3 text-sm text-muted-foreground"
                  }`}
                >
                  Your Email
                </label>
              </div>

              <div className="relative">
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  className="peer pt-6 pb-2 resize-none"
                  placeholder=" "
                />
                <label
                  className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                    focusedField === "message" || formData.message
                      ? "top-2 text-xs text-accent"
                      : "top-3 text-sm text-muted-foreground"
                  }`}
                >
                  Your Message
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 group"
              >
                Send Message
                <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
