
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/services/auth";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loginEmail !== 'litubabu2000@gmail.com' || loginPassword !== 'Lintu@2000') {
      toast({ title: "Error", description: "Invalid credentials. Please try again.", variant: "destructive" });
      return;
    }

    try {
      await signIn(loginEmail, loginPassword);
      router.push("/admin/dashboard");
    } catch (error: any) {
      // This might catch errors if the user exists but the password is wrong in Firebase,
      // or if there's a network issue.
      let errorMessage = error.message;
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
          errorMessage = "Invalid credentials. Please try again.";
      }
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Panel</CardTitle>
          <CardDescription>Login to manage your website</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email-login">Email</Label>
                <Input
                  id="email-login"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password-login">Password</Label>
                <Input 
                  id="password-login" 
                  type="password" 
                  required 
                  value={loginPassword} 
                  onChange={(e) => setLoginPassword(e.target.value)} 
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
    