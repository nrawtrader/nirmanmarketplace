import { createContext, useContext, useState, ReactNode } from "react";

export interface AuthUser {
  phone: string;
  name?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  signIn: (phone: string, name?: string) => void;
  signOut: () => void;
  isSignInOpen: boolean;
  setIsSignInOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem("nirman-user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const signIn = (phone: string, name?: string) => {
    const u: AuthUser = { phone, name };
    setUser(u);
    localStorage.setItem("nirman-user", JSON.stringify(u));
    setIsSignInOpen(false);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("nirman-user");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isSignInOpen, setIsSignInOpen }}>
      {children}
    </AuthContext.Provider>
  );
};
