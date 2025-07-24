import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Save } from "lucide-react";

export default function ChatConfigPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageTitle title="Bot Configuration Protocol" subtitle="Fine-tune your AI agent's operational parameters." />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2 glassmorphism">
          <CardHeader>
            <CardTitle>Core Directives</CardTitle>
            <CardDescription>Set the primary interaction logic for your AI bot.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bot-tone">Default Bot Tone</Label>
              <Select defaultValue="professional">
                <SelectTrigger id="bot-tone" className="font-code">
                  <SelectValue placeholder="Select tone..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="ai-persona">AI Persona (JARVIS-like)</SelectItem>
                  <SelectItem value="direct">Direct & To-the-point</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="initial-prompt">Initial Prompt</Label>
              <Textarea id="initial-prompt" placeholder="Hello, I am the AI assistant for... How can I help you today?" className="font-code" rows={3}/>
            </div>
             <div className="space-y-2">
              <Label htmlFor="qualifying-questions">Qualifying Questions (comma-separated)</Label>
              <Input id="qualifying-questions" placeholder="What is your budget?, What is your timeline?" className="font-code" />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 glassmorphism">
          <CardHeader>
            <CardTitle>OpenAI Features</CardTitle>
            <CardDescription>Toggle advanced AI capabilities.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <Label htmlFor="summarization" className="flex flex-col space-y-1">
                  <span>Conversation Summarization</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Automatically generate summaries for long conversations.
                  </span>
                </Label>
              <Switch id="summarization" defaultChecked />
            </div>
             <div className="flex items-center justify-between rounded-lg border p-4">
                <Label htmlFor="lead-scoring" className="flex flex-col space-y-1">
                  <span>Automated Lead Scoring</span>
                   <span className="font-normal leading-snug text-muted-foreground">
                    Use GPT to rate lead quality from 1-100.
                  </span>
                </Label>
              <Switch id="lead-scoring" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
          <Bot className="h-5 w-5" />
          Deploy Bot Protocol
        </Button>
      </div>
    </div>
  );
}
