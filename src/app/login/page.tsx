import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnimatedBackground from "@/components/animated-background";
import { Fingerprint } from "lucide-react";

export default function LoginPage() {
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
          <p className="mt-2 text-foreground/70">Verify credentials to access command deck.</p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground/80">Operator Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="operator@leadpilot.ai"
              required
              className="bg-background/50 h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Security Key</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••••••••" 
              required
              className="bg-background/50 h-12" 
            />
          </div>
          
          <Link href="/dashboard" passHref>
            <Button type="submit" className="w-full h-12 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
              Authenticate
            </Button>
          </Link>
        </form>

        <div className="mt-6 text-center">
          <Button variant="link" className="text-foreground/60 hover:text-primary">
            Access Guest Console
          </Button>
        </div>
      </div>
    </div>
  );
}
