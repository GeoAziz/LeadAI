import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ListFilter, Search } from "lucide-react";
import LeadCard from "@/components/leads/lead-card";

const mockLeads = [
  { id: 1, name: "Stellar Solutions Inc.", score: 92, status: "hot", summary: "Seeking urgent deployment of AI chatbots for enterprise-level support. Budget >$50k.", campaign: "Q2 Enterprise Push", date: "2024-07-21" },
  { id: 2, name: "Galaxy Widgets", score: 78, status: "warm", summary: "Interested in a demo for their e-commerce platform. Timeline is 3-6 months.", campaign: "E-commerce Outreach", date: "2024-07-20" },
  { id: 3, name: "Cosmic Creations", score: 45, status: "low", summary: "Early stage inquiry about pricing. No defined budget or timeline.", campaign: "Inbound Organic", date: "2024-07-20" },
  { id: 4, name: "Nebula Networks", score: 85, status: "hot", summary: "Ready to sign, waiting on final proposal for multi-site license.", campaign: "Q2 Enterprise Push", date: "2024-07-19" },
  { id: 5, name: "Andromeda Apps", score: 65, status: "warm", summary: "Follow-up required next week. Decision maker on vacation.", campaign: "SaaS Growth", date: "2024-07-18" },
];

export default function LeadsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageTitle title="Lead Inbox / Data Feed" subtitle="Incoming signals from across the galaxy." />
      
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search leads by name, campaign..." className="pl-10" />
        </div>
        <div className="flex items-center gap-2">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ListFilter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Hot</DropdownMenuItem>
              <DropdownMenuItem>Warm</DropdownMenuItem>
              <DropdownMenuItem>Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>Export</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mockLeads.map(lead => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </div>
    </div>
  );
}
