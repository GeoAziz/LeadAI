import { cn } from "@/lib/utils";

type AnimatedBackgroundProps = {
  className?: string;
};

export default function AnimatedBackground({ className }: AnimatedBackgroundProps) {
  return (
    <div
      className={cn(
        "animated-grid absolute inset-0 -z-10",
        className
      )}
    />
  );
}
