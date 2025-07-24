'use client';

import { useState } from 'react';
import { Message, useChat } from 'ai/react';
import { chat } from '@/ai/flows/chat-flow';
import ChatInput from '@/components/chat/chat-input';
import ChatMessages from '@/components/chat/chat-messages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, User, Loader2 } from 'lucide-react';

export default function ChatClientPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const handleSend = async (messageContent: string) => {
        setIsLoading(true);
        setError(null);
        
        const userMessage: Message = { id: Date.now().toString(), role: 'user', content: messageContent };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);

        try {
            const chatHistory = newMessages.map(m => ({ role: m.role, content: m.content }));
            const response = await chat({
                history: chatHistory.slice(0, -1), // Send history without the latest user message
                message: messageContent
            });

            const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response.message };
            setMessages(prevMessages => [...prevMessages, assistantMessage]);
        } catch (err: any) {
            setError(err);
            const errorMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: "Sorry, I've encountered an error. Please try again." };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-headline flex items-center justify-center gap-2">
                    <Bot className="h-8 w-8 text-primary" />
                    <span>LeadPilot AI Assistant</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto p-4">
                <ChatMessages messages={messages} isLoading={isLoading} />
            </CardContent>
            <div className="p-4 border-t">
                <ChatInput onSend={handleSend} isLoading={isLoading} />
            </div>
        </div>
    );
}
