import { Rocket } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/dashboard" className={cn("flex items-center gap-2 text-xl font-bold text-glow", className)}>
      <Rocket className="h-6 w-6 text-primary" />
      <span className="font-headline">LeadPilot AI</span>
    </Link>
  );
}
