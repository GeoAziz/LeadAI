
'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/hooks/use-auth';
import { User, KeyRound, Mail, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updatePassword } from 'firebase/auth';

const formSchema = z.object({
  newPassword: z.string().min(6, 'Password must be at least 6 characters.'),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Error', description: 'You are not logged in.' });
      return;
    }
    try {
      await updatePassword(user, data.newPassword);
      toast({ title: 'Success', description: 'Your password has been updated successfully.' });
      reset();
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Update Failed', description: error.message });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <PageTitle title="Operator Profile" subtitle="Manage your personal credentials and settings." />

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="glassmorphism">
          <CardHeader>
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-primary" />
              <CardTitle>Account Information</CardTitle>
            </div>
            <CardDescription>Your registered operator details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Operator Email</Label>
              <div className="flex items-center gap-3 rounded-lg border p-3 bg-muted/50">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span className="font-code">{user?.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardHeader>
            <div className="flex items-center gap-3">
              <KeyRound className="h-6 w-6 text-primary" />
              <CardTitle>Update Security Key</CardTitle>
            </div>
            <CardDescription>Set a new password for your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" {...register('newPassword')} placeholder="Enter new password"/>
                {errors.newPassword && <p className="text-destructive text-sm">{errors.newPassword.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" {...register('confirmPassword')} placeholder="Confirm new password"/>
                {errors.confirmPassword && <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>}
              </div>
              <Button type="submit" disabled={loading} className="gap-2">
                <Save className="h-5 w-5" />
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
