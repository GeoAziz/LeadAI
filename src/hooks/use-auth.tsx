'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged, User, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<UserCredential>;
  signup: (email: string, pass: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  googleSignIn: () => Promise<UserCredential>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const publicRoutes = ['/login', '/', '/chat-client'];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    if (loading) return;

    const isPublicPage = publicRoutes.includes(pathname);

    if (user && isPublicPage) {
      router.push('/dashboard');
    } else if (!user && !isPublicPage) {
      router.push('/login');
    }
  }, [user, loading, pathname, router]);

  const handleAuthRedirect = (userCredential: UserCredential) => {
    if (userCredential.user) {
      setUser(userCredential.user); // Eagerly set user to trigger redirect
      router.push('/dashboard');
    }
  };

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      handleAuthRedirect(userCredential);
      return userCredential;
    } finally {
      setLoading(false);
    }
  };
  
  const signup = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      handleAuthRedirect(userCredential);
      return userCredential;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    router.push('/login');
  };

  const sendPasswordReset = (email: string) => {
      setLoading(true);
      return sendPasswordResetEmail(auth, email).finally(() => setLoading(false));
  }

  const googleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
        const userCredential = await signInWithPopup(auth, provider);
        handleAuthRedirect(userCredential);
        return userCredential;
    } finally {
        setLoading(false);
    }
  }

  const value = { user, loading, login, signup, logout, sendPasswordReset, googleSignIn };
  
  const isPublicPage = publicRoutes.includes(pathname);

  if (loading && !isPublicPage) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
    );
  }
  
  // This check is important for protecting routes
  if (!isPublicPage && !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <p>Redirecting to login...</p>
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
