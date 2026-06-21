import {
  createContext, useContext, useState, useEffect, useRef, ReactNode,
} from "react";
import {
  sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink,
  signOut as fbSignOut, onAuthStateChanged, User as FBUser,
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
  email: string;
  name?: string;
  savedAddress?: SavedAddress;
}

interface AuthContextType {
  user: AuthUser | null;
  firebaseConfigured: boolean;
  sendEmailLink: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  saveName: (name: string) => Promise<void>;
  saveAddress: (address: SavedAddress) => Promise<void>;
  isSignInOpen: boolean;
  setIsSignInOpen: (open: boolean) => void;
  authLoading: boolean;
  authError: string;
  emailLinkSent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

const isConfigured = () =>
  !!(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID);

const loadUserProfile = async (fb: FBUser): Promise<AuthUser> => {
  if (!db) return { uid: fb.uid, email: fb.email ?? "" };
  const ref = doc(db, "users", fb.uid);
  const snap = await getDoc(ref);
  const data = snap.exists() ? snap.data() : {};
  return {
    uid: fb.uid,
    email: fb.email ?? "",
    name: data.name,
    savedAddress: data.savedAddress,
  };
};

const SITE_URL = "https://nirmanmarketplace.co.in";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [emailLinkSent, setEmailLinkSent] = useState(false);
  const configured = isConfigured();

  // Handle email link sign-in when user lands back on site after clicking link
  useEffect(() => {
    if (!configured || !auth) return;
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = localStorage.getItem("nirman-signin-email");
      if (email) {
        setAuthLoading(true);
        signInWithEmailLink(auth, email, window.location.href)
          .then(() => {
            localStorage.removeItem("nirman-signin-email");
            // Clean up the URL
            window.history.replaceState({}, document.title, window.location.pathname);
          })
          .catch(() => setAuthError("Sign-in link expired or invalid. Please try again."))
          .finally(() => setAuthLoading(false));
      }
    }
  }, [configured]);

  useEffect(() => {
    if (!configured || !auth) return;
    const unsub = onAuthStateChanged(auth, async (fb) => {
      if (fb) {
        const profile = await loadUserProfile(fb);
        setUser(profile);
        setIsSignInOpen(false);
      } else {
        setUser(null);
      }
    });
    return unsub;
  }, [configured]);

  const sendEmailLink = async (email: string) => {
    if (!configured || !auth) return;
    setAuthLoading(true);
    setAuthError("");
    try {
      await sendSignInLinkToEmail(auth, email, {
        url: SITE_URL,
        handleCodeInApp: true,
      });
      localStorage.setItem("nirman-signin-email", email);
      setEmailLinkSent(true);
    } catch {
      setAuthError("Failed to send sign-in link. Check your email and try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const saveName = async (name: string) => {
    if (!auth?.currentUser || !db) return;
    await setDoc(doc(db, "users", auth.currentUser.uid), { name }, { merge: true });
    setUser((u) => u ? { ...u, name } : u);
  };

  const saveAddress = async (address: SavedAddress) => {
    if (!auth?.currentUser || !db) return;
    await setDoc(doc(db, "users", auth.currentUser.uid), { savedAddress: address }, { merge: true });
    setUser((u) => u ? { ...u, savedAddress: address } : u);
  };

  const signOut = async () => {
    if (auth) await fbSignOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user, firebaseConfigured: configured,
      sendEmailLink, signOut, saveName, saveAddress,
      isSignInOpen, setIsSignInOpen,
      authLoading, authError, emailLinkSent,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
