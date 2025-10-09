import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <img src="/logos/chrisbenleo-high-resolution-logo-transparent.png" alt="" className="w-20 h-12 md:w-20 md:h-14 object-contain " />
            <p className="text-muted-foreground">
              Building the future, one line of code at a time.
            </p>
          </div>

          <div className="flex gap-6">
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Mail, href: "#contact", label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-muted-foreground hover:text-accent transition-colors hover:scale-110 transition-transform"
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            © {currentYear} Portfolio. Made with <Heart className="w-4 h-4 text-accent fill-accent" /> by a passionate developer.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
