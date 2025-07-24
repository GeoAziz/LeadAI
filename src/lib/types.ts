import { z } from "zod";

export type Lead = {
    id: string;
    name: string;
    score: number;
    status: 'hot' | 'warm' | 'low';
    summary: string;
    campaign: string;
    date: string;
}

export const MessageData = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});
