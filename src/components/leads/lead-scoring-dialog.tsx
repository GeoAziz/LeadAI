'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { scoreLead } from '@/ai/flows/score-lead-flow';
import type { ScoreLeadOutput } from '@/ai/types';
import { Loader2, Wand2, Star, TrendingUp, Info } from 'lucide-react';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Lead } from '@/lib/types';

type LeadScoringDialogProps = {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onNewScore: (leadId: string, newScore: number, newStatus: 'hot' | 'warm' | 'low') => void;
};

const statusColors = {
    hot: "text-cyan-400",
    warm: "text-purple-400",
    low: "text-magenta-400",
};

export default function LeadScoringDialog({ lead, isOpen, onClose, onNewScore }: LeadScoringDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScoreLeadOutput | null>(null);

  const handleScoreLead = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await scoreLead({ summary: lead.summary });
      setResult(response);
      onNewScore(lead.id, response.score, response.status);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };
  
  // Automatically score lead when dialog opens
  useEffect(() => {
    if (isOpen) {
        setResult(null);
        setError(null);
        handleScoreLead();
    }
  }, [isOpen, lead.id]);


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glassmorphism">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Wand2 className="h-6 w-6 text-primary" />
            AI Lead Analysis: {lead.name}
          </DialogTitle>
          <DialogDescription>
            The AI is analyzing the lead data to provide a score and status.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 space-y-4">
          {loading && (
            <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="font-code text-muted-foreground">ANALYZING SIGNAL...</p>
            </div>
          )}

          {error && (
            <div className="text-destructive-foreground bg-destructive/50 p-4 rounded-md text-center">
                <p className="font-bold">Analysis Failed</p>
                <p className="text-sm">{error}</p>
            </div>
          )}
          
          {result && (
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 rounded-lg border p-4 items-center justify-center">
                    <Star className="h-8 w-8 text-primary" />
                    <p className="text-sm text-muted-foreground">New Score</p>
                    <p className={cn("text-5xl font-bold text-glow", statusColors[result.status])}>
                        {result.score}
                    </p>
              </div>
               <div className="flex flex-col gap-2 rounded-lg border p-4 items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-primary" />
                    <p className="text-sm text-muted-foreground">New Status</p>
                     <Badge variant={result.status === 'hot' ? 'default' : 'secondary'} className={cn(
                        "text-2xl px-4 py-1",
                        result.status === 'hot' && 'bg-cyan-400/20 text-cyan-300 border-cyan-400/50',
                        result.status === 'warm' && 'bg-purple-400/20 text-purple-300 border-purple-400/50',
                        result.status === 'low' && 'bg-magenta-400/20 text-magenta-300 border-magenta-400/50',
                    )}>
                        {result.status.toUpperCase()}
                    </Badge>
              </div>
              <div className="col-span-2 flex flex-col gap-2 rounded-lg border p-4">
                 <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    <p className="text-sm font-semibold">AI Reasoning</p>
                </div>
                <p className="text-sm text-muted-foreground italic">"{result.reasoning}"</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={onClose} variant="outline">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
