import { Message } from "ai/react";
import ChatMessage from "./chat-message";
import { useEffect, useRef } from "react";

interface ChatMessagesProps {
    messages: Message[];
    isLoading: boolean;
}

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
    const scrollableContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
        }
    }, [messages, isLoading]);
    
    return (
        <div ref={scrollableContainerRef} className="space-y-4 h-full overflow-y-auto pr-4">
            {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <ChatMessage
                    message={{ id: "loading", role: "assistant", content: "..." }}
                    isLoading={true}
                />
            )}
             {messages.length === 0 && !isLoading && (
                <div className="text-center text-muted-foreground pt-8">
                    <p>Ask me anything about LeadPilot AI!</p>
                    <p className="text-xs">e.g., "What can you do?" or "How do you integrate with my website?"</p>
                </div>
            )}
        </div>
    );
}
