import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Users, Bot, BarChart } from "lucide-react";
import PageTitle from "@/components/page-title";
import SystemHealth from "@/components/dashboard/system-health";
import CommFeed from "@/components/dashboard/comm-feed";

const stats = [
  { title: "Leads Acquired", value: "1,284", icon: Users, change: "+20.1% from last month", color: "text-cyan-400" },
  { title: "Campaigns Active", value: "23", icon: Rocket, change: "+2 new campaigns", color: "text-purple-400" },
  { title: "Bot Interactions", value: "34,591", icon: Bot, change: "+12.5% this week", color: "text-magenta-400" },
  { title: "Conversion Rate", value: "12.3%", icon: BarChart, change: "+1.2% from last month", color: "text-green-400" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageTitle title="AI Command Dashboard" subtitle="Live overview of all interstellar operations" />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
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
