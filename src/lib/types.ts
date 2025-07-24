export type Lead = {
    id: string;
    name: string;
    score: number;
    status: 'hot' | 'warm' | 'low';
    summary: string;
    campaign: string;
    date: string;
}
