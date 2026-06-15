import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative bg-background text-foreground border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-foreground" style={{ fontFamily: "'Space Grotesk'" }}>
            Let's Build Something
            <br />
            <span className="text-foreground/60">Amazing Together</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mt-4 text-lg">
            Your dream home is just a few clicks away.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <img src={logo} alt="Nirman MarketPlace" className="h-10 w-auto" />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner for construction materials. Plan, learn, and build your dream home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-foreground/50">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", to: "/" },
                { label: "Products", to: "/products" },
                { label: "Material Calculator", to: "/calculator" },
                { label: "House Designs", to: "/designs" },
                { label: "Blog & Guides", to: "/blog" },
                { label: "Track Order", to: "/track-order" },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-foreground/50">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-foreground shrink-0" />
                <a href="tel:+919198391797" className="hover:text-foreground transition-colors">+91 91983 91797</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-foreground shrink-0" />
                <a href="mailto:marketplacenirman@gmail.com" className="hover:text-foreground transition-colors">marketplacenirman@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-foreground shrink-0" />
                <span>Jankipuram Extension, Lucknow, Uttar Pradesh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Nirman MarketPlace. All rights reserved.</span>
          <span>Built for homeowners, by builders.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
