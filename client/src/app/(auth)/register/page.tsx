import Link from "next/link";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 py-12">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl border bg-card shadow-2xl">
        <div className="p-8">
          <div className="mb-8 flex flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Activity className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Patient Registration</h1>
            <p className="text-sm text-muted-foreground mt-2">Create your VeagleHMS patient portal account</p>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">First Name</label>
                <input type="text" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Last Name</label>
                <input type="text" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Email Address</label>
              <input type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="john@example.com" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Password</label>
              <input type="password" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
            </div>
            
            <Button className="w-full mt-6" type="button">Create Account</Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="font-medium text-primary hover:underline">Sign In here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
