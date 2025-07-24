import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { KeyRound, DatabaseZap, ShieldCheck, BarChartHorizontal } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageTitle title="Settings / Admin Console" subtitle="Manage system-wide configurations and integrations." />

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="glassmorphism">
          <CardHeader>
            <div className="flex items-center gap-3">
              <KeyRound className="h-6 w-6 text-primary" />
              <CardTitle>API Configuration</CardTitle>
            </div>
            <CardDescription>Manage your OpenAI API key for all AI-powered features.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">OpenAI API Key</Label>
              <Input id="api-key" type="password" defaultValue="••••••••••••••••••••••••••••••••••" />
            </div>
            <Button>Update Key</Button>
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardHeader>
            <div className="flex items-center gap-3">
              <DatabaseZap className="h-6 w-6 text-primary" />
              <CardTitle>Data & Sync</CardTitle>
            </div>
            <CardDescription>Control data logging and test your Firebase connection.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between rounded-lg border p-4">
                <Label htmlFor="data-logging" className="flex flex-col space-y-1">
                  <span>Enable Data Logging</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Store interaction logs for analysis.
                  </span>
                </Label>
              <Switch id="data-logging" defaultChecked />
            </div>
            <Button variant="outline">Test Firebase Sync</Button>
          </CardContent>
        </Card>

         <Card className="glassmorphism md:col-span-2">
          <CardHeader>
             <div className="flex items-center gap-3">
              <BarChartHorizontal className="h-6 w-6 text-primary" />
              <CardTitle>App Usage Overview</CardTitle>
            </div>
            <CardDescription>High-level view of resource consumption.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3 font-code">
              <div className="flex flex-col gap-2 rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">API Calls This Month</p>
                <p className="text-2xl font-bold text-glow">1,402,312</p>
              </div>
               <div className="flex flex-col gap-2 rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Firestore Reads</p>
                <p className="text-2xl font-bold text-glow">8.2M</p>
              </div>
               <div className="flex flex-col gap-2 rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Data Storage</p>
                <p className="text-2xl font-bold text-glow">1.7 GB</p>
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
