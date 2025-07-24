'use client';
import { Fingerprint, Mail, KeyRound, ArrowRight } from "lucide-react";
import AnimatedBackground from "@/components/animated-background";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/login-form";
import SignupForm from "@/components/auth/signup-form";
import SocialLogins from "@/components/auth/social-logins";
import ResetPasswordForm from "@/components/auth/reset-password-form";
import { useState } from "react";

type AuthForm = "login" | "signup" | "reset-password";

export default function LoginPage() {
  const [authForm, setAuthForm] = useState<AuthForm>('login');

  const renderForm = () => {
    switch(authForm) {
      case 'login':
        return <LoginForm onSwitchToSignUp={() => setAuthForm('signup')} onSwitchToReset={() => setAuthForm('reset-password')} />;
      case 'signup':
        return <SignupForm onSwitchToLogin={() => setAuthForm('login')} />;
      case 'reset-password':
        return <ResetPasswordForm onSwitchToLogin={() => setAuthForm('login')} />;
    }
  }

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <AnimatedBackground />
      <div className="z-10 w-full max-w-md rounded-xl p-8 glassmorphism">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
            <Fingerprint className="z-10 h-16 w-16 text-primary" />
            <div className="absolute inset-0 rounded-full bg-primary/20 pulse-glow" />
          </div>
          <h1 className="font-headline text-3xl font-bold">Operator Access</h1>
          <p className="mt-2 text-foreground/70">
            {authForm === 'login' && 'Verify credentials to access command deck.'}
            {authForm === 'signup' && 'Create your operator credentials.'}
            {authForm === 'reset-password' && 'Reset your security key.'}
          </p>
        </div>

        <div className="mt-8">
          {renderForm()}
        </div>

      </div>
    </div>
  );
}
