'use client';
import PageTitle from "@/components/page-title";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLeads } from "@/services/firestore";
import { Loader2 } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Pie, PieChart, Cell, Legend } from "recharts";
import { useMemo } from "react";
import { subDays, format } from 'date-fns';

const statusColors = {
    hot: "hsl(var(--primary))",
    warm: "hsl(180 50% 60%)",
    low: "hsl(180 30% 60%)",
};

const campaignColors = [
    "hsl(var(--primary))",
    "hsl(180 50% 60%)",
    "hsl(180 30% 60%)",
    "hsl(200 80% 70%)",
    "hsl(220 80% 70%)",
]

export default function AnalyticsPage() {
    const { leads, loading, error } = useLeads();

    const chartData = useMemo(() => {
        if (!leads) return { daily: [], status: [], campaign: [] };

        // Daily Leads
        const dailyCounts: { [key: string]: number } = {};
        const last7Days = Array.from({ length: 7 }, (_, i) => subDays(new Date(), i));
        last7Days.forEach(day => {
            dailyCounts[format(day, 'yyyy-MM-dd')] = 0;
        });

        leads.forEach(lead => {
            const leadDate = format(new Date(lead.date), 'yyyy-MM-dd');
            if (dailyCounts[leadDate] !== undefined) {
                dailyCounts[leadDate]++;
            }
        });
        
        const daily = Object.entries(dailyCounts)
            .map(([date, total]) => ({ name: format(new Date(date), 'MMM d'), total }))
            .reverse();
            
        // Status Distribution
        const statusCounts = leads.reduce((acc, lead) => {
            acc[lead.status] = (acc[lead.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const status = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

        // Campaign Performance
        const campaignCounts = leads.reduce((acc, lead) => {
            acc[lead.campaign] = (acc[lead.campaign] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        
        const campaign = Object.entries(campaignCounts).map(([name, value]) => ({ name, value }));

        return { daily, status, campaign };
    }, [leads]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return <p className="text-destructive text-center">{error}</p>
    }

    return (
        <div className="flex flex-col gap-8">
            <PageTitle title="Analytics & Reporting" subtitle="Visualize campaign performance and lead metrics." />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2 glassmorphism">
                    <CardHeader>
                        <CardTitle>Lead Acquisition (Last 7 Days)</CardTitle>
                        <CardDescription>Number of new leads acquired each day.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData.daily}>
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                                <Tooltip
                                    contentStyle={{ background: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                                    cursor={{ fill: "hsl(var(--accent))" }}
                                />
                                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="glassmorphism">
                    <CardHeader>
                        <CardTitle>Lead Status Distribution</CardTitle>
                        <CardDescription>Breakdown of all leads by their current status.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={chartData.status} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                    {chartData.status.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={statusColors[entry.name as keyof typeof statusColors]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: "hsl(var(--background))", borderColor: "hsl(var(--border))" }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-3 glassmorphism">
                    <CardHeader>
                        <CardTitle>Campaign Performance</CardTitle>
                        <CardDescription>Number of leads generated by each campaign.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData.campaign} layout="vertical">
                                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false}/>
                                <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={120} />
                                <Tooltip
                                    contentStyle={{ background: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                                    cursor={{ fill: "hsl(var(--accent))" }}
                                />
                                <Bar dataKey="value" barSize={20} >
                                     {chartData.campaign.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={campaignColors[index % campaignColors.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
