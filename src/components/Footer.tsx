import { HardHat, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <HardHat className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Nirman MarketPlace
              </span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Your trusted partner for construction materials. Plan, learn, and build your dream home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-accent transition-colors">Products</Link></li>
              <li><Link to="/calculator" className="hover:text-accent transition-colors">Material Calculator</Link></li>
              <li><span className="cursor-default">Floor Plan Generator</span></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><span className="cursor-default">Construction Guide</span></li>
              <li><span className="cursor-default">FAQ</span></li>
              <li><span className="cursor-default">Privacy Policy</span></li>
              <li><span className="cursor-default">Terms of Service</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@nirmanmarketplace.in</li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5" /> Bangalore, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} Nirman MarketPlace. All rights reserved. Built for homeowners, by builders.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
