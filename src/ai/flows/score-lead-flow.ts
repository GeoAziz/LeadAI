'use server';

/**
 * @fileOverview An AI agent for scoring leads.
 *
 * - scoreLead - A function that handles the lead scoring process.
 * - ScoreLeadInput - The input type for the scoreLead function.
 * - ScoreLeadOutput - The return type for the scoreLead function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const ScoreLeadInputSchema = z.object({
  summary: z.string().describe('A summary of the lead\'s request or message.'),
});
export type ScoreLeadInput = z.infer<typeof ScoreLeadInputSchema>;

export const ScoreLeadOutputSchema = z.object({
  score: z.number().describe('A score from 1-100 representing the lead\'s potential value.'),
  status: z.enum(['hot', 'warm', 'low']).describe('The classification of the lead.'),
  reasoning: z.string().describe('A brief explanation for the assigned score and status.'),
});
export type ScoreLeadOutput = z.infer<typeof ScoreLeadOutputSchema>;

export async function scoreLead(input: ScoreLeadInput): Promise<ScoreLeadOutput> {
  return scoreLeadFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scoreLeadPrompt',
  input: {schema: ScoreLeadInputSchema},
  output: {schema: ScoreLeadOutputSchema},
  prompt: `You are an expert lead scoring analyst for a company selling an AI chatbot solution called "LeadPilot AI".
Your task is to evaluate a lead based on their message summary and assign a score from 1 to 100.

- **Hot (80-100):** Urgent need, clear budget, enterprise-level, ready to buy.
- **Warm (50-79):** Defined interest, exploring options, timeline of 3-6 months.
- **Low (1-49):** Vague inquiry, no clear budget or timeline, just gathering information.

Analyze the following lead summary:
"{{{summary}}}"

Provide a score, a status ('hot', 'warm', or 'low'), and your reasoning.`,
});

const scoreLeadFlow = ai.defineFlow(
  {
    name: 'scoreLeadFlow',
    inputSchema: ScoreLeadInputSchema,
    outputSchema: ScoreLeadOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
