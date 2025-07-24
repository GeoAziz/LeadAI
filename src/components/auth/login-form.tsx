'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SocialLogins from "./social-logins";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSwitchToSignUp: () => void;
  onSwitchToReset: () => void;
}

export default function LoginForm({ onSwitchToSignUp, onSwitchToReset }: LoginFormProps) {
  const { login, loading } = useAuth();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setError(null);
    try {
      await login(values.email, values.password);
      toast({ title: "Login Successful", description: "Redirecting to dashboard..." });
    } catch (err: any) {
      setError(err.message);
      toast({ variant: "destructive", title: "Login Failed", description: err.message });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operator Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="operator@leadpilot.ai" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Security Key</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Authenticate"}
        </Button>

        <SocialLogins />
        
        <div className="text-center text-sm">
          <Button variant="link" type="button" onClick={onSwitchToReset} className="text-muted-foreground">
            Forgot Password?
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or
            </span>
          </div>
        </div>

        <div className="text-center">
            <Button variant="link" type="button" onClick={onSwitchToSignUp}>
                Don't have an account? Create one
            </Button>
        </div>
      </form>
    </Form>
  );
}
