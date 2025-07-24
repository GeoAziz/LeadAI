'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, User } from "lucide-react";

const feedItems = [
  { type: 'ai', text: "Analyzed new lead 'Stellar Solutions'. High potential. Score: 92." },
  { type: 'user', text: "Archived lead 'Cosmic Creations'." },
  { type: 'ai', text: "Scheduled follow-up with 'Galaxy Widgets' for 2024-07-28." },
  { type: 'ai', text: "New campaign 'SaaS Growth' is now live. Monitoring for signals." },
];

function TypingText({ text, onComplete }: { text: string, onComplete: () => void }) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        setDisplayedText("");
        let i = 0;
        const intervalId = setInterval(() => {
            setDisplayedText(text.slice(0, i + 1));
            i++;
            if (i >= text.length) {
                clearInterval(intervalId);
                onComplete();
            }
        }, 25);
        return () => clearInterval(intervalId);
    }, [text, onComplete]);

    return <p className="font-code text-sm">{displayedText}<span className="animate-ping">|</span></p>;
}

export default function CommFeed() {
    const [visibleItems, setVisibleItems] = useState<{ type: 'ai' | 'user'; text: string; isTyped: boolean }[]>([]);

    useEffect(() => {
        const handleNewItem = (index: number) => {
            if (index >= feedItems.length) return;
            
            setVisibleItems(prev => [...prev, { ...feedItems[index], isTyped: false }]);
        };

        handleNewItem(0);
    }, []);

    const handleTypingComplete = (index: number) => {
        setVisibleItems(prev => {
            const newItems = [...prev];
            newItems[index].isTyped = true;
            return newItems;
        });
        setTimeout(() => {
            if (index + 1 < feedItems.length) {
                setVisibleItems(prev => [...prev, { ...feedItems[index + 1], isTyped: false }]);
            }
        }, 1000);
    };

    return (
        <Card className="glassmorphism h-full">
            <CardHeader>
                <CardTitle>Live AI Comm Feed</CardTitle>
                <CardDescription>Real-time stream of AI actions and system events.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {visibleItems.map((item, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <div className="rounded-full p-2 border border-primary/20 bg-accent">
                                {item.type === 'ai' ? <Bot className="h-5 w-5 text-primary" /> : <User className="h-5 w-5 text-foreground/70" />}
                            </div>
                            <div className="pt-1">
                                {item.isTyped ? (
                                    <p className="font-code text-sm">{item.text}</p>
                                ) : (
                                    <TypingText text={item.text} onComplete={() => handleTypingComplete(index)} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
