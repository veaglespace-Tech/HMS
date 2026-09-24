import Link from "next/link";
import { Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">VeagleHMS</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A comprehensive healthcare management system designed to streamline clinical and operational workflows.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#features" className="hover:text-primary">Features</Link></li>
              <li><Link href="#about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/login" className="hover:text-primary">Staff Login</Link></li>
              <li><Link href="/register" className="hover:text-primary">Patient Portal</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary">HIPAA Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Veagle Space Technology Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
