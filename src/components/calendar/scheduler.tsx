'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestBestTimes, SuggestBestTimesInput, SuggestBestTimesOutput } from '@/ai/flows/suggest-best-times';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, Wand2, Clock } from 'lucide-react';

const formSchema = z.object({
    calendarData: z.string().min(1, 'Calendar data is required.'),
    meetingDurationMinutes: z.coerce.number().min(1, 'Duration must be at least 1 minute.'),
    timezone: z.string().min(1, 'Timezone is required.'),
    workingHoursStart: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
    workingHoursEnd: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
});

type FormValues = z.infer<typeof formSchema>;

export default function Scheduler() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<SuggestBestTimesOutput | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            workingHoursStart: '09:00',
            workingHoursEnd: '17:00',
            meetingDurationMinutes: 30,
        }
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await suggestBestTimes(data);
            setResult(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="calendarData">Calendar Data (iCal format)</Label>
                    <Textarea id="calendarData" {...register('calendarData')} rows={6} placeholder="Paste your iCalendar data here..." className="font-code"/>
                    {errors.calendarData && <p className="text-destructive text-sm">{errors.calendarData.message}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="meetingDurationMinutes">Meeting Duration (minutes)</Label>
                        <Input id="meetingDurationMinutes" type="number" {...register('meetingDurationMinutes')} />
                        {errors.meetingDurationMinutes && <p className="text-destructive text-sm">{errors.meetingDurationMinutes.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Input id="timezone" {...register('timezone')} />
                        {errors.timezone && <p className="text-destructive text-sm">{errors.timezone.message}</p>}
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="workingHoursStart">Working Hours Start</Label>
                        <Input id="workingHoursStart" type="time" {...register('workingHoursStart')} />
                        {errors.workingHoursStart && <p className="text-destructive text-sm">{errors.workingHoursStart.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="workingHoursEnd">Working Hours End</Label>
                        <Input id="workingHoursEnd" type="time" {...register('workingHoursEnd')} />
                        {errors.workingHoursEnd && <p className="text-destructive text-sm">{errors.workingHoursEnd.message}</p>}
                    </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full md:w-auto gap-2">
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Wand2 className="h-5 w-5" />}
                    Suggest Best Times
                </Button>
            </form>

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {result && (
                <div className="space-y-4 rounded-lg border p-4">
                    <h3 className="font-bold text-lg text-primary text-glow">AI Suggestions</h3>
                    <div>
                        <h4 className="font-semibold mb-2">Reasoning:</h4>
                        <p className="text-sm text-muted-foreground italic">{result.reasoning}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Suggested Times:</h4>
                        <ul className="space-y-2">
                            {result.suggestedTimes.map((time, index) => (
                                <li key={index} className="flex items-center gap-2 p-2 rounded-md bg-accent font-code text-sm">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <span>{new Date(time).toLocaleString()}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
