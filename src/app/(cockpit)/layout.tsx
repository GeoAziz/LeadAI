import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { AuthProvider } from "@/hooks/use-auth";

export const metadata: Metadata = {
    title: "Dashboard - LeadPilot AI",
    description: "AI Command Dashboard",
};

export default function CockpitLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <div className="flex min-h-screen w-full">
                <Sidebar />
                <div className="flex flex-1 flex-col">
                    <Header />
                    <main className="flex-1 p-4 md:p-8 lg:p-10">{children}</main>
                </div>
            </div>
        </AuthProvider>
    );
}
