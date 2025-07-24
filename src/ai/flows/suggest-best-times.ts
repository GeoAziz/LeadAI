'use server';

/**
 * @fileOverview An AI agent for suggesting the best times for scheduling meetings.
 *
 * - suggestBestTimes - A function that handles the process of suggesting optimal meeting times.
 * - SuggestBestTimesInput - The input type for the suggestBestTimes function.
 * - SuggestBestTimesOutput - The return type for the suggestBestTimes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBestTimesInputSchema = z.object({
  calendarData: z
    .string()
    .describe(
      'The user calendar data in iCalendar format.'
    ),
  meetingDurationMinutes: z.number().describe('The duration of the meeting in minutes.'),
  timezone: z.string().describe('The timezone of the user.'),
  workingHoursStart: z.string().describe('The start of the user working hours.'),
  workingHoursEnd: z.string().describe('The end of the user working hours.'),
});
export type SuggestBestTimesInput = z.infer<typeof SuggestBestTimesInputSchema>;

const SuggestBestTimesOutputSchema = z.object({
  suggestedTimes: z.array(z.string()).describe('An array of suggested meeting times in ISO format.'),
  reasoning: z.string().describe('The reasoning behind the suggested times.'),
});
export type SuggestBestTimesOutput = z.infer<typeof SuggestBestTimesOutputSchema>;

export async function suggestBestTimes(input: SuggestBestTimesInput): Promise<SuggestBestTimesOutput> {
  return suggestBestTimesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBestTimesPrompt',
  input: {schema: SuggestBestTimesInputSchema},
  output: {schema: SuggestBestTimesOutputSchema},
  prompt: `You are a meeting scheduling assistant. Given the following user calendar data, meeting duration, and timezone, suggest the best times for a meeting.

Calendar Data: {{{calendarData}}}
Meeting Duration (minutes): {{{meetingDurationMinutes}}}
Timezone: {{{timezone}}}
Working Hours Start: {{{workingHoursStart}}}
Working Hours End: {{{workingHoursEnd}}}

Consider the user's working hours and avoid suggesting times outside of those hours. 

Return the suggested times as an array of ISO format datetimes, and include the reasoning behind your suggestions.
`,
});

const suggestBestTimesFlow = ai.defineFlow(
  {
    name: 'suggestBestTimesFlow',
    inputSchema: SuggestBestTimesInputSchema,
    outputSchema: SuggestBestTimesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
