import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Lead = {
    id: number;
    name: string;
    score: number;
    status: 'hot' | 'warm' | 'low';
    summary: string;
    campaign: string;
    date: string;
}

type LeadCardProps = {
    lead: Lead;
}

const statusColors = {
    hot: "border-cyan-400 shadow-cyan-400/20",
    warm: "border-purple-400 shadow-purple-400/20",
    low: "border-magenta-400 shadow-magenta-400/20",
}

export default function LeadCard({ lead }: LeadCardProps) {
  return (
    <Card className={cn(
        "glassmorphism hover:border-primary transition-all duration-300 flex flex-col",
        statusColors[lead.status],
        "border-l-4 shadow-lg"
    )}>
        <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-headline">{lead.name}</CardTitle>
                <div className="flex flex-col items-end gap-2">
                    <span className={cn("text-2xl font-bold text-glow", 
                    lead.status === 'hot' && 'text-cyan-400',
                    lead.status === 'warm' && 'text-purple-400',
                    lead.status === 'low' && 'text-magenta-400',
                    )}>{lead.score}</span>
                    <Badge variant={lead.status === 'hot' ? 'default' : 'secondary'} className={cn(
                        lead.status === 'hot' && 'bg-cyan-400/20 text-cyan-300 border-cyan-400/50',
                        lead.status === 'warm' && 'bg-purple-400/20 text-purple-300 border-purple-400/50',
                        lead.status === 'low' && 'bg-magenta-400/20 text-magenta-300 border-magenta-400/50',
                    )}>
                        {lead.status.toUpperCase()}
                    </Badge>
                </div>
            </div>
            <CardDescription>{lead.campaign}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-sm text-foreground/80">{lead.summary}</p>
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground font-code">Signal Received: {lead.date}</p>
        </CardFooter>
    </Card>
  );
}
