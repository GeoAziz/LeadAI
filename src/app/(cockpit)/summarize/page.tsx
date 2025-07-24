'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { summarizeAndScoreLead } from '@/ai/flows/summarize-and-score-lead-flow';
import type { SummarizeAndScoreLeadOutput } from '@/ai/types';
import PageTitle from "@/components/page-title";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, Wand2, Star, TrendingUp, Info, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
    rawText: z.string().min(10, 'Please provide at least 10 characters of text to analyze.'),
});

type FormValues = z.infer<typeof formSchema>;

const statusColors = {
    hot: "text-cyan-400",
    warm: "text-purple-400",
    low: "text-magenta-400",
};

export default function SummarizePage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<SummarizeAndScoreLeadOutput | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await summarizeAndScoreLead(data);
            setResult(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <PageTitle title="AI Summarizer & Scorer" subtitle="Paste raw text to generate a summary and lead score." />
            
            <div className="grid gap-8 lg:grid-cols-2">
                <Card className="glassmorphism">
                    <CardHeader>
                        <CardTitle>Input Text</CardTitle>
                        <CardDescription>Paste the lead's email, message, or notes below.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Textarea id="rawText" {...register('rawText')} rows={15} placeholder="We are a large enterprise looking for an AI solution to handle customer support across 10 countries. Our budget is flexible, and we need to implement this within the next quarter. Please provide a quote and a demo."/>
                                {errors.rawText && <p className="text-destructive text-sm">{errors.rawText.message}</p>}
                            </div>
                            <Button type="submit" disabled={loading} className="w-full md:w-auto gap-2">
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Wand2 className="h-5 w-5" />}
                                Analyze Text
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    {loading && (
                        <Card className="glassmorphism h-full flex items-center justify-center">
                            <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
                                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                <p className="font-code text-muted-foreground">ANALYZING SIGNAL...</p>
                            </div>
                        </Card>
                    )}

                    {error && (
                         <Card className="glassmorphism">
                            <CardContent className="pt-6">
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Analysis Failed</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            </CardContent>
                        </Card>
                    )}

                    {result && (
                        <Card className="glassmorphism">
                            <CardHeader>
                                <CardTitle>Analysis Result</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                               <div className="flex flex-col gap-2 rounded-lg border p-4">
                                 <div className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-primary" />
                                    <p className="text-sm font-semibold">AI-Generated Summary</p>
                                </div>
                                <p className="text-sm text-muted-foreground italic">"{result.summary}"</p>
                              </div>

                               <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2 rounded-lg border p-4 items-center justify-center">
                                        <Star className="h-8 w-8 text-primary" />
                                        <p className="text-sm text-muted-foreground">Lead Score</p>
                                        <p className={cn("text-5xl font-bold text-glow", statusColors[result.status])}>
                                            {result.score}
                                        </p>
                                  </div>
                                   <div className="flex flex-col gap-2 rounded-lg border p-4 items-center justify-center">
                                        <TrendingUp className="h-8 w-8 text-primary" />
                                        <p className="text-sm text-muted-foreground">Status</p>
                                         <Badge variant={result.status === 'hot' ? 'default' : 'secondary'} className={cn(
                                            "text-2xl px-4 py-1",
                                            result.status === 'hot' && 'bg-cyan-400/20 text-cyan-300 border-cyan-400/50',
                                            result.status === 'warm' && 'bg-purple-400/20 text-purple-300 border-purple-400/50',
                                            result.status === 'low' && 'bg-magenta-400/20 text-magenta-300 border-magenta-400/50',
                                        )}>
                                            {result.status.toUpperCase()}
                                        </Badge>
                                  </div>
                                </div>

                              <div className="flex flex-col gap-2 rounded-lg border p-4">
                                 <div className="flex items-center gap-2">
                                    <Info className="h-5 w-5 text-primary" />
                                    <p className="text-sm font-semibold">AI Reasoning</p>
                                </div>
                                <p className="text-sm text-muted-foreground italic">"{result.reasoning}"</p>
                              </div>
                            </CardContent>
                        </Card>
                    )}

                    {!loading && !result && !error && (
                         <Card className="glassmorphism h-full flex items-center justify-center">
                            <div className="text-center text-muted-foreground p-8">
                                <p>Analysis results will appear here.</p>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
