import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Shield, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const SignInDialog = () => {
  const { isSignInOpen, setIsSignInOpen, sendEmailLink, authLoading, authError, emailLinkSent } = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address");
      return;
    }
    setEmailError("");
    await sendEmailLink(email);
  };

  return (
    <Dialog open={isSignInOpen} onOpenChange={(o) => { setIsSignInOpen(o); setEmail(""); setEmailError(""); }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <Mail className="w-4 h-4 text-accent" />
            </div>
            Sign In
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!emailLinkSent ? (
            <motion.div key="email" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <p className="text-sm text-muted-foreground">
                  Enter your email — we'll send you a sign-in link. No password needed.
                </p>
                <div>
                  <Label htmlFor="signin-email" className="text-sm font-medium">Email Address</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                    placeholder="your@email.com"
                    className={`mt-1.5 ${emailError ? "border-destructive" : ""}`}
                    autoFocus
                  />
                  {(emailError || authError) && (
                    <p className="text-xs text-destructive mt-1">{emailError || authError}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 rounded-lg p-3">
                  <Shield className="w-3.5 h-3.5 shrink-0 text-accent" />
                  Sign in to save your address and view past orders across all devices.
                </div>
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={authLoading}>
                  {authLoading ? "Sending link..." : "Send Sign-In Link"}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Sign in is optional — you can place orders without an account too.
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div key="sent" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="space-y-4 mt-2 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Check your email!</p>
                  <p className="text-sm text-muted-foreground">
                    We sent a sign-in link to <strong className="text-foreground">{email}</strong>.
                    Click the link in the email to sign in.
                  </p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3 text-xs text-muted-foreground text-left">
                  <p>• Check your spam/junk folder if you don't see it</p>
                  <p>• The link expires in 1 hour</p>
                  <p>• You can close this and continue browsing</p>
                </div>
                <Button variant="outline" className="w-full" onClick={() => setIsSignInOpen(false)}>
                  Close & Continue
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
