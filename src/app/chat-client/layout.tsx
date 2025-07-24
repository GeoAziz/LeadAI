import AnimatedBackground from "@/components/animated-background";

export default function ChatClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-4">
            <AnimatedBackground />
            <div className="z-10 w-full max-w-2xl h-[90vh] flex flex-col rounded-xl glassmorphism">
                {children}
            </div>
        </div>
    );
}
