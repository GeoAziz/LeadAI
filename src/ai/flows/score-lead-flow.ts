'use server';

/**
 * @fileOverview An AI agent for scoring leads.
 *
 * - scoreLead - A function that handles the lead scoring process.
 */

import {ai} from '@/ai/genkit';
import { ScoreLeadInputSchema, ScoreLeadOutputSchema, ScoreLeadInput, ScoreLeadOutput } from '@/ai/types';

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
