'use server';

/**
 * @fileOverview An AI agent for suggesting the best times for scheduling meetings.
 *
 * - suggestBestTimes - A function that handles the process of suggesting optimal meeting times.
 */

import {ai} from '@/ai/genkit';
import { SuggestBestTimesInputSchema, SuggestBestTimesOutputSchema, SuggestBestTimesInput, SuggestBestTimesOutput } from '@/ai/types';

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
