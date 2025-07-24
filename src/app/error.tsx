'use client';

import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <PageTitle title="System Malfunction" subtitle="A critical error was detected in the command console." />
        <Card className="mt-8 max-w-lg glassmorphism">
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <p className="text-destructive text-glow font-bold">Error Code: {error.digest || 'Unknown'}</p>
                    <p className="text-muted-foreground font-code bg-muted/50 p-4 rounded-md">{error.message}</p>
                    <Button onClick={() => reset()}>
                        Attempt System Reboot
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
