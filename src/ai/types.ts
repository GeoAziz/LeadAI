import {z} from 'genkit';

/**
 * @fileOverview Shared types for AI flows
 */

export const ScoreLeadInputSchema = z.object({
  summary: z.string().describe("A summary of the lead's request or message."),
});
export type ScoreLeadInput = z.infer<typeof ScoreLeadInputSchema>;

export const ScoreLeadOutputSchema = z.object({
  score: z
    .number()
    .describe("A score from 1-100 representing the lead's potential value."),
  status: z
    .enum(['hot', 'warm', 'low'])
    .describe('The classification of the lead.'),
  reasoning: z
    .string()
    .describe('A brief explanation for the assigned score and status.'),
});
export type ScoreLeadOutput = z.infer<typeof ScoreLeadOutputSchema>;

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
