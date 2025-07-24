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

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

type ResetPasswordFormValues = z.infer<typeof formSchema>;

interface ResetPasswordFormProps {
  onSwitchToLogin: () => void;
}

export default function ResetPasswordForm({ onSwitchToLogin }: ResetPasswordFormProps) {
  const { sendPasswordReset, loading } = useAuth();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setError(null);
    try {
      await sendPasswordReset(values.email);
      toast({ title: "Password Reset Email Sent", description: "Check your inbox for instructions." });
    } catch (err: any) {
      setError(err.message);
      toast({ variant: "destructive", title: "Error", description: err.message });
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
        <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Send Reset Link"}
        </Button>
        <div className="text-center">
            <Button variant="link" type="button" onClick={onSwitchToLogin}>
                Back to Login
            </Button>
        </div>
      </form>
    </Form>
  );
}
