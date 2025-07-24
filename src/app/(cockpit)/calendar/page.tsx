import PageTitle from "@/components/page-title";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Scheduler from "@/components/calendar/scheduler";
import { CheckCircle2, Link, BarChart2 } from "lucide-react";

export default function CalendarPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageTitle title="Scheduler Sync Panel" subtitle="Manage and optimize your mission briefing schedule." />
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="glassmorphism h-full">
            <CardHeader>
              <CardTitle>AI Time Suggestion Engine</CardTitle>
              <CardDescription>Input calendar data and parameters to find optimal meeting slots.</CardDescription>
            </CardHeader>
            <CardContent>
              <Scheduler />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-8">
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Link className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Google Calendar Sync</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Connected</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BarChart2 className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Follow-up Success Rate</span>
                </div>
                <span className="font-bold text-primary text-glow">87%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Upcoming Briefings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 font-code text-sm">
                <div className="flex justify-between items-center">
                    <p>Stellar Solutions Debrief</p>
                    <p className="text-muted-foreground">Today @ 14:00</p>
                </div>
                <div className="flex justify-between items-center">
                    <p>Galaxy Widgets Demo</p>
                    <p className="text-muted-foreground">Tomorrow @ 10:30</p>
                </div>
                 <div className="flex justify-between items-center">
                    <p>Nebula Networks Finalization</p>
                    <p className="text-muted-foreground">July 24 @ 11:00</p>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
