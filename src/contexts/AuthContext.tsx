import {
  createContext, useContext, useState, useEffect, useRef, ReactNode,
} from "react";
import {
  RecaptchaVerifier, signInWithPhoneNumber, signOut as fbSignOut,
  onAuthStateChanged, ConfirmationResult, User as FBUser,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export interface SavedAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface AuthUser {
  uid: string;
  phone: string;
  name?: string;
  savedAddress?: SavedAddress;
}

interface AuthContextType {
  user: AuthUser | null;
  firebaseConfigured: boolean;
  sendOtp: (phone: string) => Promise<void>;
  verifyOtp: (code: string) => Promise<void>;
  saveName: (name: string) => Promise<void>;
  saveAddress: (address: SavedAddress) => Promise<void>;
  signOut: () => Promise<void>;
  isSignInOpen: boolean;
  setIsSignInOpen: (open: boolean) => void;
  otpSent: boolean;
  authLoading: boolean;
  authError: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

const isConfigured = () =>
  !!(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID
  );

const loadUserProfile = async (fb: FBUser): Promise<AuthUser> => {
  if (!db) return { uid: fb.uid, phone: fb.phoneNumber?.replace("+91", "") ?? "" };
  const ref = doc(db, "users", fb.uid);
  const snap = await getDoc(ref);
  const data = snap.exists() ? snap.data() : {};
  return {
    uid: fb.uid,
    phone: fb.phoneNumber?.replace("+91", "") ?? "",
    name: data.name,
    savedAddress: data.savedAddress,
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);
  const configured = isConfigured();

  useEffect(() => {
    if (!configured) return;
    const unsub = onAuthStateChanged(auth!, async (fb) => {
      if (fb) {
        const profile = await loadUserProfile(fb);
        setUser(profile);
      } else {
        setUser(null);
      }
    });
    return unsub;
  }, [configured]);

  const getRecaptcha = () => {
    if (recaptchaRef.current) return recaptchaRef.current;
    const verifier = new RecaptchaVerifier(auth!, "recaptcha-container", {
      size: "invisible",
    });
    recaptchaRef.current = verifier;
    return verifier;
  };

  const sendOtp = async (phone: string) => {
    if (!configured) return;
    setAuthLoading(true);
    setAuthError("");
    try {
      const verifier = getRecaptcha();
      const result = await signInWithPhoneNumber(auth!, `+91${phone}`, verifier);
      confirmationRef.current = result;
      setOtpSent(true);
    } catch (err: unknown) {
      recaptchaRef.current = null;
      const msg = err instanceof Error ? err.message : "Failed to send OTP";
      setAuthError(msg.includes("TOO_SHORT") ? "Enter a valid 10-digit number" : "Failed to send OTP. Try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const verifyOtp = async (code: string) => {
    if (!confirmationRef.current) return;
    setAuthLoading(true);
    setAuthError("");
    try {
      await confirmationRef.current.confirm(code);
      setOtpSent(false);
      setIsSignInOpen(false);
    } catch {
      setAuthError("Incorrect OTP. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const saveName = async (name: string) => {
    if (!auth?.currentUser || !db) return;
    const ref = doc(db, "users", auth.currentUser.uid);
    await setDoc(ref, { name }, { merge: true });
    setUser((u) => u ? { ...u, name } : u);
  };

  const saveAddress = async (address: SavedAddress) => {
    if (!auth?.currentUser || !db) return;
    const ref = doc(db, "users", auth.currentUser.uid);
    await setDoc(ref, { savedAddress: address }, { merge: true });
    setUser((u) => u ? { ...u, savedAddress: address } : u);
  };

  const signOut = async () => {
    if (auth) await fbSignOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user, firebaseConfigured: configured,
      sendOtp, verifyOtp, saveName, saveAddress, signOut,
      isSignInOpen, setIsSignInOpen,
      otpSent, authLoading, authError,
    }}>
      {/* invisible recaptcha mount point */}
      <div id="recaptcha-container" />
      {children}
    </AuthContext.Provider>
  );
};
