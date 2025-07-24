'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Calendar, LayoutDashboard, Settings, Target, BarChart } from "lucide-react";
import Logo from "../logo";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/leads", icon: Target, label: "Leads" },
  { href: "/chat-config", icon: Bot, label: "Chat Config" },
  { href: "/calendar", icon: Calendar, label: "Calendar" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

type NavLinkProps = {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
};

const NavLink = ({ href, icon: Icon, label, isActive }: NavLinkProps) => (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-4 rounded-lg px-4 py-3 text-foreground/70 transition-all hover:text-foreground hover:bg-accent",
        isActive && "bg-accent font-bold text-primary text-glow"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
);

export default function Sidebar({ isMobile = false }) {
  const pathname = usePathname();

  return (
    <div className={cn("hidden h-screen flex-col border-r bg-background lg:flex", isMobile && "flex w-full")}>
      <div className="flex h-16 items-center border-b px-6">
        <Logo />
      </div>
      <div className="flex-1">
        <nav className="grid items-start gap-2 px-4 py-6 text-sm font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={pathname.startsWith(item.href)}
            />
          ))}
        </nav>
      </div>
       <div className="mt-auto p-4">
        <div className="rounded-lg border p-4 glassmorphism">
          <div className="flex items-center gap-3 mb-2">
            <BarChart className="h-5 w-5 text-primary"/>
            <p className="text-sm font-bold">Monthly Usage</p>
          </div>
          <p className="text-xs text-muted-foreground mb-2">Your AI is operating at 75% capacity.</p>
           <div className="w-full bg-muted rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{width: "75%"}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
