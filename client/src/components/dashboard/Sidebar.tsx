import Link from "next/link";
import { Activity, LayoutDashboard, Users, Calendar, Pill, Search, Stethoscope, Bed, FileText } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Patients", href: "/dashboard/patients", icon: Users },
    { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
    { name: "Wards & Beds", href: "/dashboard/wards", icon: Bed },
    { name: "Doctors", href: "/dashboard/doctors", icon: Stethoscope },
    { name: "Pharmacy", href: "/dashboard/pharmacy", icon: Pill },
    { name: "Lab Reports", href: "/dashboard/labs", icon: FileText },
  ];

  return (
    <aside className="hidden w-64 flex-col border-r bg-card md:flex h-full">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">VeagleHMS</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-4 text-sm font-medium">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
