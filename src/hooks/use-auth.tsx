'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged, User, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  signup: (email: string, pass: string) => Promise<any>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  googleSignIn: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const publicRoutes = ['/login', '/', '/chat-client'];

// This is a mock user for test mode
const mockUser = {
  uid: 'test-user-uid',
  email: 'test-operator@leadpilot.ai',
  displayName: 'Test Operator',
  photoURL: '',
  emailVerified: true,
} as User;


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If test mode is enabled, bypass Firebase and set a mock user
    if (process.env.NEXT_PUBLIC_TEST_MODE === 'true') {
      setUser(mockUser);
      setLoading(false);
      return;
    }
    
    // Otherwise, proceed with real Firebase authentication
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_TEST_MODE === 'true') return;

    if (!loading) {
      if (user && (pathname === '/login' || pathname === '/')) {
        router.push('/dashboard');
      } else if (!user && !publicRoutes.includes(pathname)) {
        router.push('/login');
      }
    }
  }, [user, loading, pathname, router]);

  const login = (email: string, pass: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass).finally(() => setLoading(false));
  };
  
  const signup = (email: string, pass: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass).finally(() => setLoading(false));
  };
  
  const logout = () => {
    if (process.env.NEXT_PUBLIC_TEST_MODE === 'true') {
      setUser(null);
      router.push('/login');
      return Promise.resolve();
    }
    return signOut(auth);
  };

  const sendPasswordReset = (email: string) => {
      setLoading(true);
      return sendPasswordResetEmail(auth, email).finally(() => setLoading(false));
  }

  const googleSignIn = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).finally(() => setLoading(false));
  }

  const value = { user, loading, login, signup, logout, sendPasswordReset, googleSignIn };
  
  const isPublicPage = publicRoutes.includes(pathname);

  // Show loading indicator while checking for user, unless in test mode on a public page
  if (loading && !isPublicPage) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
    );
  }

  // If not a public page and not a user (and not in test mode), show loader while redirecting
  if (!isPublicPage && !user && process.env.NEXT_PUBLIC_TEST_MODE !== 'true') {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
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
