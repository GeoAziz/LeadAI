'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Lead } from '@/lib/types';

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, 'leads'),
      (snapshot) => {
        const leadsData: Lead[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Lead));
        setLeads(leadsData);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError('Failed to fetch leads.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { leads, loading, error };
};

export const updateLeadScore = async (leadId: string, score: number, status: 'hot' | 'warm' | 'low') => {
  const leadRef = doc(db, 'leads', leadId);
  try {
    await updateDoc(leadRef, { score, status });
  } catch (error) {
    console.error("Error updating lead score: ", error);
    throw new Error("Failed to update lead score.");
  }
};
