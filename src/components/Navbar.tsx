import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import EstimateForm from "./EstimateForm";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Calculator", path: "/calculator" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";
  const showSolid = scrolled || !isHome;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showSolid
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300 ${
              showSolid ? "bg-primary" : "bg-primary-foreground/10 backdrop-blur-sm"
            }`}>
              <HardHat className={`w-5 h-5 transition-colors duration-300 ${
                showSolid ? "text-primary-foreground" : "text-primary-foreground"
              }`} />
            </div>
            <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
              showSolid ? "text-foreground" : "text-primary-foreground"
            }`} style={{ fontFamily: "'Space Grotesk'" }}>
              Nirman MarketPlace
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? showSolid
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary-foreground/15 text-primary-foreground"
                    : showSolid
                      ? "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className={`transition-all duration-300 ${
                showSolid
                  ? ""
                  : "border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              }`}
            >
              Sign In
            </Button>
            <EstimateForm />
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              showSolid ? "hover:bg-secondary" : "hover:bg-primary-foreground/10"
            }`}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X className={`w-5 h-5 ${showSolid ? "text-foreground" : "text-primary-foreground"}`} />
            ) : (
              <Menu className={`w-5 h-5 ${showSolid ? "text-foreground" : "text-primary-foreground"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                <EstimateForm />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
