import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Bot, User, Loader2 } from "lucide-react";

interface ChatMessageProps {
    message: Message;
    isLoading?: boolean;
}

export default function ChatMessage({ message, isLoading = false }: ChatMessageProps) {
    const isAssistant = message.role === 'assistant';

    return (
        <div className={cn("flex items-start gap-4", isAssistant ? "" : "justify-end")}>
            {isAssistant && (
                <div className="rounded-full p-2 border border-primary/20 bg-accent">
                    <Bot className="h-5 w-5 text-primary" />
                </div>
            )}
            <div className={cn(
                "max-w-[75%] rounded-lg p-3 text-sm",
                isAssistant
                    ? "bg-secondary"
                    : "bg-primary text-primary-foreground"
            )}>
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Thinking...</span>
                    </div>
                ) : (
                    <p>{message.content}</p>
                )}
            </div>
            {!isAssistant && (
                 <div className="rounded-full p-2 border border-border bg-card">
                    <User className="h-5 w-5 text-muted-foreground" />
                </div>
            )}
        </div>
    );
}
