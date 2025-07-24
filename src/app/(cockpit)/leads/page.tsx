'use client';

import { useState, useEffect } from 'react';
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ListFilter, Search, Loader2 } from "lucide-react";
import LeadList from "@/components/leads/lead-list";
import { Lead } from '@/lib/types';
import { useLeads } from '@/services/firestore';
import { seedDatabase } from '@/lib/seed';

export default function LeadsPage() {
  const { leads, loading, error } = useLeads();
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);

  useEffect(() => {
    setFilteredLeads(leads);
  }, [leads]);
  
  return (
    <div className="flex flex-col gap-8">
      <div className='flex justify-between items-start'>
        <PageTitle title="Lead Inbox / Data Feed" subtitle="Incoming signals from across the galaxy." />
        <Button onClick={seedDatabase} variant="outline">Seed Database</Button>
      </div>
      
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
      
      {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      {error && <p className="text-destructive text-center">{error}</p>}
      {!loading && !error && <LeadList leads={filteredLeads} />}
    </div>
  );
}
