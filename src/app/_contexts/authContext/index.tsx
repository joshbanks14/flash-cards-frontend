"use client"
import { useContext, useState, createContext, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/_lib/firebase/firebase";

type AuthContext = {
  currentUser: User | null;
  setCurrentUser: (currentUser: User | null) => void;
};

const AuthContext = createContext<AuthContext>({
  currentUser: null,
  setCurrentUser: () => undefined,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
