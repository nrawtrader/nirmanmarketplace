import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Phone, Shield, ArrowLeft, CheckCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type Step = "phone" | "otp" | "name";

const RESEND_SECONDS = 30;

const SignInDialog = () => {
  const { isSignInOpen, setIsSignInOpen, sendOtp, verifyOtp, saveName, authLoading, authError, user } = useAuth();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [name, setName] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // When user signs in via Firebase, move to name step if no name yet
  useEffect(() => {
    if (user && isSignInOpen) {
      if (!user.name) {
        setStep("name");
      } else {
        setIsSignInOpen(false);
      }
    }
  }, [user, isSignInOpen]);

  useEffect(() => {
    if (!isSignInOpen) {
      setTimeout(() => {
        setStep("phone");
        setPhone("");
        setOtp(["", "", "", "", "", ""]);
        setName("");
        setPhoneError("");
        setResendTimer(0);
        if (timerRef.current) clearInterval(timerRef.current);
      }, 300);
    }
  }, [isSignInOpen]);

  const startResendTimer = () => {
    setResendTimer(RESEND_SECONDS);
    timerRef.current = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) { clearInterval(timerRef.current!); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setPhoneError("Enter a valid 10-digit Indian mobile number");
      return;
    }
    setPhoneError("");
    await sendOtp(phone);
    if (!authError) {
      setStep("otp");
      startResendTimer();
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
    if (newOtp.every(d => d) && newOtp.join("").length === 6) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      const newOtp = pasted.split("");
      setOtp(newOtp);
      otpRefs.current[5]?.focus();
      setTimeout(() => handleVerify(pasted), 100);
    }
  };

  const handleVerify = async (code: string) => {
    await verifyOtp(code);
    // AuthContext will update user — useEffect above handles next step
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setOtp(["", "", "", "", "", ""]);
    await sendOtp(phone);
    if (!authError) {
      startResendTimer();
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveName(name.trim());
    toast.success("Signed in successfully!", { description: `Welcome${name.trim() ? `, ${name.trim()}` : ""}!` });
    setIsSignInOpen(false);
  };

  return (
    <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <Phone className="w-4 h-4 text-accent" />
            </div>
            Sign In
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === "phone" && (
            <motion.div key="phone" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <form onSubmit={handlePhoneSubmit} className="space-y-4 mt-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Enter your mobile number to receive a one-time password (OTP).
                  </p>
                  <Label htmlFor="signin-phone" className="text-sm font-medium">Mobile Number</Label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">+91</span>
                    <Input
                      id="signin-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setPhoneError(""); }}
                      placeholder="10-digit mobile number"
                      className={`pl-12 ${phoneError ? "border-destructive" : ""}`}
                      autoFocus
                    />
                  </div>
                  {(phoneError || authError) && (
                    <p className="text-xs text-destructive mt-1">{phoneError || authError}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 rounded-lg p-3">
                  <Shield className="w-3.5 h-3.5 shrink-0 text-accent" />
                  Your number is used only for order updates. We never share it.
                </div>
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={authLoading}>
                  {authLoading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </form>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="space-y-4 mt-2">
                <button onClick={() => setStep("phone")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Change number
                </button>
                <p className="text-sm text-muted-foreground">
                  OTP sent to <strong className="text-foreground">+91 {phone}</strong>. Enter the 6-digit code below.
                </p>
                <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className={`w-11 h-12 text-center text-lg font-bold rounded-lg border-2 bg-background outline-none transition-colors
                        ${digit ? "border-accent" : "border-border"}
                        ${authError ? "border-destructive" : ""}
                        focus:border-accent`}
                    />
                  ))}
                </div>
                {authError && <p className="text-xs text-destructive text-center">{authError}</p>}
                {authLoading && <p className="text-xs text-muted-foreground text-center">Verifying...</p>}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Didn't receive OTP?</span>
                  <button
                    onClick={handleResend}
                    disabled={resendTimer > 0 || authLoading}
                    className={`flex items-center gap-1 font-medium transition-colors ${resendTimer > 0 ? "text-muted-foreground" : "text-accent hover:underline"}`}
                  >
                    <RefreshCw className="w-3 h-3" />
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                  </button>
                </div>
                <Button
                  onClick={() => handleVerify(otp.join(""))}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  disabled={otp.join("").length < 6 || authLoading}
                >
                  {authLoading ? "Verifying..." : "Verify OTP"}
                </Button>
              </div>
            </motion.div>
          )}

          {step === "name" && (
            <motion.div key="name" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <form onSubmit={handleNameSubmit} className="space-y-4 mt-2">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  <strong className="text-foreground">+91 {phone || user?.phone}</strong> verified!
                </p>
                <div>
                  <Label htmlFor="signin-name" className="text-sm font-medium">Your Name <span className="text-muted-foreground font-normal">(optional)</span></Label>
                  <Input
                    id="signin-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="mt-1.5"
                    autoFocus
                  />
                </div>
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Continue
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
