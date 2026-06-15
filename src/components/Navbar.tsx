import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import EstimateForm from "./EstimateForm";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "House Designs", path: "/designs" },
  { label: "Calculator", path: "/calculator" },
  { label: "Blog", path: "/blog" },
  { label: "Track Order", path: "/track-order" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();
  const { user, signOut, setIsSignInOpen } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showSolid = true; // Always solid white navbar for clean UltraTech-inspired look

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-background border-b border-border"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <Link to="/" className="flex items-center group">
            <img
              src={logo}
              alt="Nirman MarketPlace"
              className="h-14 lg:h-16 w-auto"
            />
          </Link>

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

          <div className="hidden md:flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-lg transition-all duration-300 ${
                showSolid
                  ? "hover:bg-secondary text-foreground"
                  : "hover:bg-primary-foreground/10 text-primary-foreground"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  {user.name || `+91 ${user.phone}`}
                </span>
                <Button variant="ghost" size="sm" onClick={signOut} className="gap-1.5 text-muted-foreground hover:text-foreground">
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSignInOpen(true)}
                className={`transition-all duration-300 ${
                  showSolid ? "" : "border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                }`}
              >
                Sign In
              </Button>
            )}
            <EstimateForm />
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-lg transition-colors ${
                showSolid ? "hover:bg-secondary" : "hover:bg-primary-foreground/10"
              }`}
            >
              <ShoppingCart className={`w-5 h-5 ${showSolid ? "text-foreground" : "text-primary-foreground"}`} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className={`p-2 rounded-lg transition-colors ${showSolid ? "hover:bg-secondary" : "hover:bg-primary-foreground/10"}`}
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
      </div>

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
                <Link key={link.path} to={link.path} onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                {user ? (
                  <div className="flex items-center justify-between px-1">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      {user.name || `+91 ${user.phone}`}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => { signOut(); setOpen(false); }} className="gap-1.5 text-muted-foreground">
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" className="w-full" onClick={() => { setIsSignInOpen(true); setOpen(false); }}>
                    Sign In
                  </Button>
                )}
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
