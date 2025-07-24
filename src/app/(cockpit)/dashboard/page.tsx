'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Users, Bot, BarChart, Loader2 } from "lucide-react";
import PageTitle from "@/components/page-title";
import SystemHealth from "@/components/dashboard/system-health";
import CommFeed from "@/components/dashboard/comm-feed";
import { useLeads } from "@/services/firestore";
import { useMemo } from "react";

export default function DashboardPage() {
  const { leads, loading } = useLeads();

  const stats = useMemo(() => {
    if (!leads) {
      return {
        leadsAcquired: { value: 0, change: "" },
        conversionRate: { value: "0%", change: "" },
      };
    }

    const totalLeads = leads.length;
    const hotLeads = leads.filter(lead => lead.status === 'hot').length;
    const conversionRate = totalLeads > 0 ? ((hotLeads / totalLeads) * 100).toFixed(1) + "%" : "0%";

    return {
      leadsAcquired: { value: totalLeads.toString(), change: "from live data" },
      conversionRate: { value: conversionRate, change: `based on ${hotLeads} hot leads` },
    }
  }, [leads]);

  const staticStats = [
    { title: "Campaigns Active", value: "3", icon: Rocket, change: "Check Analytics page", color: "text-purple-400" },
    { title: "Bot Interactions", value: "N/A", icon: Bot, change: "Coming soon", color: "text-magenta-400" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <PageTitle title="AI Command Dashboard" subtitle="Live overview of all interstellar operations" />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glassmorphism">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">Leads Acquired</CardTitle>
            <Users className="h-5 w-5 text-cyan-400" />
          </CardHeader>
          <CardContent>
            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <div className="text-3xl font-bold font-headline">{stats.leadsAcquired.value}</div>}
            <p className="text-xs text-muted-foreground">{stats.leadsAcquired.change}</p>
          </CardContent>
        </Card>
        
        {staticStats.map((stat, index) => (
          <Card key={index} className="glassmorphism">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground/80">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-headline">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}

         <Card className="glassmorphism">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">Hot Lead Rate</CardTitle>
            <BarChart className="h-5 w-5 text-green-400" />
          </CardHeader>
          <CardContent>
             {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <div className="text-3xl font-bold font-headline">{stats.conversionRate.value}</div>}
            <p className="text-xs text-muted-foreground">{stats.conversionRate.change}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CommFeed />
        </div>
        <div className="lg:col-span-1">
          <SystemHealth />
        </div>
      </div>
    </div>
  );
}
