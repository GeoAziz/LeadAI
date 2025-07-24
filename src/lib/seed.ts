import { collection, addDoc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import { Lead } from './types';

const mockLeads: Omit<Lead, 'id'>[] = [
  { name: "Stellar Solutions Inc.", score: 92, status: "hot", summary: "Seeking urgent deployment of AI chatbots for enterprise-level support. Budget >$50k.", campaign: "Q2 Enterprise Push", date: "2024-07-21" },
  { name: "Galaxy Widgets", score: 78, status: "warm", summary: "Interested in a demo for their e-commerce platform. Timeline is 3-6 months.", campaign: "E-commerce Outreach", date: "2024-07-20" },
  { name: "Cosmic Creations", score: 45, status: "low", summary: "Early stage inquiry about pricing. No defined budget or timeline.", campaign: "Inbound Organic", date: "2024-07-20" },
  { name: "Nebula Networks", score: 85, status: "hot", summary: "Ready to sign, waiting on final proposal for multi-site license.", campaign: "Q2 Enterprise Push", date: "2024-07-19" },
  { name: "Andromeda Apps", score: 65, status: "warm", summary: "Follow-up required next week. Decision maker on vacation.", campaign: "SaaS Growth", date: "2024-07-18" },
];

export const seedDatabase = async () => {
    const leadsCollection = collection(db, 'leads');
    const snapshot = await getDocs(leadsCollection);

    if (snapshot.empty) {
        console.log('Seeding database with initial leads...');
        const batch = writeBatch(db);
        mockLeads.forEach(lead => {
            const docRef = collection(db, 'leads');
            // Firestore will auto-generate an ID, so we pass the rest of the object
            batch.set(docRef.doc(), lead);
        });
        await batch.commit();
        console.log('Database seeded!');
        alert('Database seeded successfully!');
    } else {
        console.log('Database already contains data, skipping seed.');
        alert('Database already seeded.');
    }
};
