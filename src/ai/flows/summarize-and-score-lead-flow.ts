'use server';
/**
 * @fileOverview An AI agent for summarizing and scoring leads from raw text.
 *
 * - summarizeAndScoreLead - A function that handles the summarization and lead scoring process.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { SummarizeAndScoreLeadInputSchema, SummarizeAndScoreLeadOutputSchema, SummarizeAndScoreLeadInput, SummarizeAndScoreLeadOutput } from '@/ai/types';


export async function summarizeAndScoreLead(input: SummarizeAndScoreLeadInput): Promise<SummarizeAndScoreLeadOutput> {
  return summarizeAndScoreLeadFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAndScoreLeadPrompt',
  input: {schema: SummarizeAndScoreLeadInputSchema},
  output: {schema: SummarizeAndScoreLeadOutputSchema},
  prompt: `You are an expert lead analyst for a company selling an AI chatbot solution called "LeadPilot AI".
Your task is to first summarize the raw text provided by a potential lead, and then evaluate the lead to assign a score from 1 to 100.

**Instructions:**
1.  **Summarize:** Create a concise, one-sentence summary of the lead's request from the provided raw text.
2.  **Score:** Based on the information in the text, assign a lead score using the following criteria:
    - **Hot (80-100):** Urgent need, clear budget, enterprise-level, ready to buy.
    - **Warm (50-79):** Defined interest, exploring options, timeline of 3-6 months.
    - **Low (1-49):** Vague inquiry, no clear budget or timeline, just gathering information.
3.  **Reasoning:** Provide a brief explanation for the assigned score and status.

Analyze the following raw text from the lead:
"{{{rawText}}}"

Provide a summary, a score, a status ('hot', 'warm', or 'low'), and your reasoning.`,
});

const summarizeAndScoreLeadFlow = ai.defineFlow(
  {
    name: 'summarizeAndScoreLeadFlow',
    inputSchema: SummarizeAndScoreLeadInputSchema,
    outputSchema: SummarizeAndScoreLeadOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
