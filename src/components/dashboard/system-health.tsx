'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const chartData = [
  { name: "Mon", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Tue", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Wed", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Thu", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Fri", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sat", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sun", total: Math.floor(Math.random() * 5000) + 1000 },
];

export default function SystemHealth() {
    return (
        <Card className="glassmorphism h-full">
            <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Status of core services and APIs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">OpenAI API</span>
                    <div className="flex items-center gap-2 text-sm text-green-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Operational</span>
                    </div>
                </div>
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Firebase Firestore</span>
                    <div className="flex items-center gap-2 text-sm text-green-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Operational</span>
                    </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">API Usage (Last 7 Days)</p>
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={chartData}>
                      <XAxis
                        dataKey="name"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value / 1000}k`}
                      />
                       <Tooltip
                          contentStyle={{
                            background: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))",
                            color: "hsl(var(--foreground))"
                          }}
                          cursor={{ fill: "hsl(var(--accent))" }}
                      />
                      <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
