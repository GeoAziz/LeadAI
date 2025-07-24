'use server';

/**
 * @fileOverview A conversational AI agent for the client-facing chatbot.
 *
 * - chat - A function that handles the chat conversation.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { MessageData } from '@/lib/types';

export const ChatInputSchema = z.object({
  history: z.array(MessageData),
  message: z.string(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ChatOutputSchema = z.object({
  message: z.string(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;


const prompt = ai.definePrompt({
  name: 'chatPrompt',
  input: { schema: ChatInputSchema },
  output: { schema: ChatOutputSchema },
  prompt: `You are a helpful AI assistant for a company called LeadPilot AI. Your goal is to understand the user's needs, answer their questions, and encourage them to sign up or request a demo.

You must be friendly, professional, and slightly futuristic in your tone, matching the sci-fi theme of the company.

Here is the conversation history:
{{#each history}}
{{role}}: {{{content}}}
{{/each}}

New user message:
User: {{{message}}}

Your response should be just the message content.`,
});

export async function chat(input: ChatInput): Promise<ChatOutput> {
  const {output} = await prompt(input);
  return output!;
}
