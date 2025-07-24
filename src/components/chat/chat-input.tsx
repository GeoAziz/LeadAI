'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
    onSend: (message: string) => void;
    isLoading: boolean;
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!message.trim() || isLoading) return;
        onSend(message);
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about our AI solutions..."
                disabled={isLoading}
                autoFocus
            />
            <Button type="submit" disabled={isLoading || !message.trim()} size="icon">
                {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
                <span className="sr-only">Send</span>
            </Button>
        </form>
    );
}
