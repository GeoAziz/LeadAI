'use client';

import { useState } from "react";
import LeadCard from "./lead-card";
import LeadScoringDialog from "./lead-scoring-dialog";
import { Lead } from "@/lib/types";
import { updateLeadScore } from "@/services/firestore";

type LeadListProps = {
    leads: Lead[];
}

export default function LeadList({ leads }: LeadListProps) {
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleLeadClick = (lead: Lead) => {
        setSelectedLead(lead);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedLead(null);
    }

    const handleNewScore = async (leadId: string, newScore: number, newStatus: 'hot' | 'warm' | 'low') => {
        await updateLeadScore(leadId, newScore, newStatus);
         if (selectedLead?.id === leadId) {
            setSelectedLead(prev => prev ? { ...prev, score: newScore, status: newStatus } : null);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {leads.map(lead => (
                    <LeadCard key={lead.id} lead={lead} onClick={() => handleLeadClick(lead)} />
                ))}
            </div>
            {selectedLead && (
                 <LeadScoringDialog
                    lead={selectedLead}
                    isOpen={isDialogOpen}
                    onClose={handleDialogClose}
                    onNewScore={handleNewScore}
                />
            )}
        </>
    );
}
