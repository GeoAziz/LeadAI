export type Lead = {
    id: number;
    name: string;
    score: number;
    status: 'hot' | 'warm' | 'low';
    summary: string;
    campaign: string;
    date: string;
}
