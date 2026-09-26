import Link from "next/link";
import { Activity, Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
            <Activity className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">Veagle<span className="text-primary">HMS</span></span>
        </Link>
        
        <nav className="hidden gap-6 md:flex">
          <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Features</Link>
          <Link href="#about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">About Us</Link>
          <Link href="#contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:block">
            Sign In
          </Link>
          <Link href="/register" className={cn(buttonVariants(), "rounded-full px-6 shadow-md transition-transform hover:-translate-y-0.5")}>
            Patient Portal
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
