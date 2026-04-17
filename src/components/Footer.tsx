import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk'" }}>
            Let's Build Something
            <br />
            <span className="text-accent">Amazing Together</span>
          </h2>
          <p className="text-primary-foreground/60 max-w-md mx-auto mt-4 text-lg">
            Your dream home is just a few clicks away.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <img src={logo} alt="Nirman MarketPlace" className="h-10 w-auto brightness-0 invert" />
              <span className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk'" }}>
                NIRMAN
              </span>
            </div>
            <p className="text-primary-foreground/50 text-sm leading-relaxed">
              Your trusted partner for construction materials. Plan, learn, and build your dream home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-primary-foreground/40">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", to: "/" },
                { label: "Products", to: "/products" },
                { label: "Material Calculator", to: "/calculator" },
                { label: "Floor Plan Generator", to: "#" },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-primary-foreground/60 hover:text-accent transition-colors inline-flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-primary-foreground/40">Resources</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li>Construction Guide</li>
              <li>FAQ</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-primary-foreground/40">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent" /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent" /> hello@nirmanmarketplace.in</li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-accent" /> Bangalore, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/30">
          <span>© {new Date().getFullYear()} Nirman MarketPlace. All rights reserved.</span>
          <span>Built for homeowners, by builders.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
