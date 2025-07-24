'use client';

import { useAuth } from "@/hooks/use-auth";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function SocialLogins() {
    const { googleSignIn } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            await googleSignIn();
            toast({ title: "Signed in with Google" });
        } catch (error: any) {
            toast({ variant: "destructive", title: "Google Sign-In Failed", description: error.message });
            setLoading(false);
        }
    }

    return (
        <div className="space-y-4">
             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                    </span>
                </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 261.8 0 120.5 109.8 8 244 8c66.8 0 126 23.4 171.3 62.6l-67.4 64.2C324.7 114.6 289.3 96 244 96c-83.8 0-152.3 68.5-152.3 152.8s68.5 152.8 152.3 152.8c93.6 0 130.3-67.5 135.2-104.3H244v-75.3h236.2c2.4 12.7 3.8 26.1 3.8 40.2z"></path>
                </svg>
                }
                Google
            </Button>
        </div>
    )
}
