'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';
import AnimatedBackground from '@/components/animated-background';

const bootMessages = [
  "INITIALIZING AI CORE...",
  "SECURING FIREBASE CONNECTION...",
  "LOADING INTERSTELLAR INTERFACE...",
];

export default function SplashPage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    if (currentMessageIndex < bootMessages.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(currentMessageIndex + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowCTA(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex]);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <AnimatedBackground />
      <div className="z-10 flex flex-col items-center justify-center text-center">
        <div className="relative mb-8">
          <Rocket className="h-24 w-24 text-primary animate-pulse" style={{ animationDuration: '2s' }}/>
          <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/30" />
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-glow">
          LeadPilot AI
        </h1>
        <p className="mt-2 text-lg text-foreground/80">Interstellar Command</p>

        <div className="mt-12 h-20 w-full max-w-md font-code text-sm text-primary/80">
          {bootMessages.map((msg, index) => (
            <p
              key={index}
              className={`transition-opacity duration-500 ${currentMessageIndex >= index ? 'opacity-100' : 'opacity-0'}`}
            >
              {currentMessageIndex >= index && `> ${msg}`}
            </p>
          ))}
           {showCTA && (
            <p className="text-green-400 transition-opacity duration-500">> SYSTEM ONLINE</p>
          )}
        </div>

        {showCTA && (
          <Link href="/login" passHref>
            <Button
              variant="outline"
              size="lg"
              className="mt-4 animate-pulse border-primary bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
              style={{ animationDuration: '2s' }}
            >
              Enter Cockpit
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
