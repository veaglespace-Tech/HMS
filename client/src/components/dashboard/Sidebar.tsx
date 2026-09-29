"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Activity, LayoutDashboard, Users, Calendar, 
  Pill, Stethoscope, Bed, FileText, IndianRupee, ShieldCheck
} from "lucide-react";

// In a real app, this would come from a global AuthContext or Redux store
type Role = "HOSPITAL_ADMIN" | "DOCTOR" | "NURSE" | "RECEPTIONIST" | "BILLING_MANAGER";

const navItems = [
  { 
    name: "Overview", 
    href: "/dashboard", 
    icon: LayoutDashboard, 
    roles: ["HOSPITAL_ADMIN", "BILLING_MANAGER", "DOCTOR", "RECEPTIONIST", "NURSE"] 
  },
  { 
    name: "Appointments", 
    href: "/appointments", 
    icon: Calendar, 
    roles: ["HOSPITAL_ADMIN", "RECEPTIONIST", "DOCTOR"] 
  },
  { 
    name: "Doctor Workspace", 
    href: "/workspace", 
    icon: Stethoscope, 
    roles: ["DOCTOR", "HOSPITAL_ADMIN"] 
  },
  { 
    name: "Encounters & Scribe", 
    href: "/encounters/ai-scribe", 
    icon: Stethoscope, 
    roles: ["DOCTOR", "NURSE", "HOSPITAL_ADMIN"] 
  },

  { 
    name: "Pharmacy Inventory", 
    href: "/pharmacy", 
    icon: Pill, 
    roles: ["HOSPITAL_ADMIN", "BILLING_MANAGER"] 
  },
  { 
    name: "Billing & Invoices", 
    href: "/billing", 
    icon: IndianRupee, 
    roles: ["HOSPITAL_ADMIN", "BILLING_MANAGER"] 
  },
  { 
    name: "Patient Records", 
    href: "/patients", 
    icon: Users, 
    roles: ["HOSPITAL_ADMIN", "DOCTOR", "RECEPTIONIST", "NURSE"] 
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  
  // MOCK STATE: Allows you to toggle roles dynamically to test the UX!
  const [currentRole, setCurrentRole] = useState<Role>("HOSPITAL_ADMIN");

  // Filter links based on the active role
  const visibleNavItems = navItems.filter(item => item.roles.includes(currentRole));

  return (
    <aside className="w-72 flex-col border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl hidden md:flex h-full relative z-20">
      
      {/* Brand Logo */}
      <div className="flex h-20 items-center border-b border-slate-200 dark:border-slate-800 px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
            <Activity className="h-6 w-6" />
          </div>
          <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
            ArogyaHMS
          </span>
        </Link>
      </div>

      {/* Role Switcher (Mock for Demo Purposes) */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" /> View As Role
        </label>
        <select 
          value={currentRole}
          onChange={(e) => setCurrentRole(e.target.value as Role)}
          className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer font-medium"
        >
          <option value="HOSPITAL_ADMIN">Hospital Admin</option>
          <option value="DOCTOR">Doctor</option>
          <option value="NURSE">Nurse</option>
          <option value="RECEPTIONIST">Receptionist</option>
          <option value="BILLING_MANAGER">Billing Manager</option>
        </select>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-auto py-6 px-4">
        <nav className="space-y-1.5">
          {visibleNavItems.map((item) => {
            const isActive = pathname === item.href || (pathname !== "/dashboard" && pathname.startsWith(item.href) && item.href !== "/dashboard");
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 group ${
                  isActive 
                    ? "text-emerald-700 dark:text-emerald-400" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                {/* Active Background Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <item.icon className={`h-5 w-5 relative z-10 ${isActive ? "text-emerald-600 dark:text-emerald-400" : "opacity-70 group-hover:opacity-100"}`} />
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile Snippet */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300">
            {currentRole.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate w-36">
              Demo User
            </p>
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {currentRole.replace("_", " ")}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
