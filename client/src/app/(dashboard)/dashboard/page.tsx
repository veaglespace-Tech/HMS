"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Users, Stethoscope, IndianRupee, TrendingUp, TrendingDown, Calendar, ArrowRight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";

const patientData = [
  { name: "Mon", patients: 120, emergency: 20 },
  { name: "Tue", patients: 150, emergency: 35 },
  { name: "Wed", patients: 180, emergency: 25 },
  { name: "Thu", patients: 140, emergency: 15 },
  { name: "Fri", patients: 210, emergency: 45 },
  { name: "Sat", patients: 250, emergency: 60 },
  { name: "Sun", patients: 220, emergency: 50 },
];

const stats = [
  { title: "Today's Revenue", value: "₹2,45,000", icon: IndianRupee, trend: "+14.5%", isPositive: true, color: "bg-blue-500/10 text-blue-500" },
  { title: "Total Consultations", value: "48", icon: Stethoscope, trend: "+12%", isPositive: true, color: "bg-teal-500/10 text-teal-500" },
  { title: "Total Appointments", value: "142", icon: Calendar, trend: "+5.2%", isPositive: true, color: "bg-purple-500/10 text-purple-500" },
  { title: "Avg Wait Time", value: "14 min", icon: Activity, trend: "-2.1%", isPositive: true, color: "bg-orange-500/10 text-orange-500" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function PremiumDashboard() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6 md:p-8 rounded-xl overflow-hidden relative">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: "2s" }}></div>
      
      <motion.div 
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <motion.h1 variants={itemVariants} className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400">
              Hospital Command Center
            </motion.h1>
            <motion.p variants={itemVariants} className="text-muted-foreground mt-2 text-lg">
              Live overview of hospital operations and patient influx.
            </motion.p>
          </div>
          <motion.div variants={itemVariants} className="mt-4 md:mt-0">
            <Badge variant="outline" className="px-4 py-2 bg-white/50 dark:bg-black/50 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm text-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Live Data Sync Active
            </Badge>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
                hoveredCard === i ? 'scale-105 shadow-xl shadow-slate-200/50 dark:shadow-black/50' : 'scale-100 shadow-sm'
              } bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4">
                <stat.icon size={80} />
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-slate-500 dark:text-slate-400">{stat.title}</h3>
              </div>
              
              <div className="flex items-end justify-between">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</h2>
                <div className={`flex items-center text-sm font-medium ${stat.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  {stat.trend}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {/* Main Chart */}
          <motion.div 
            variants={itemVariants}
            className="col-span-3 lg:col-span-2 rounded-2xl p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Weekly Patient Influx</h3>
                <p className="text-sm text-muted-foreground">Total vs Emergency visits over the last 7 days</p>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={patientData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEmergency" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(8px)' }}
                    itemStyle={{ fontWeight: 600, color: '#1e293b' }}
                  />
                  <Area type="monotone" dataKey="patients" name="Total Patients" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" />
                  <Area type="monotone" dataKey="emergency" name="Emergency" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorEmergency)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Quick Actions / Recent Activity */}
          <motion.div 
            variants={itemVariants}
            className="col-span-3 lg:col-span-1 rounded-2xl p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-sm flex flex-col"
          >
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">Recent Check-ins</h3>
            <div className="flex-1 overflow-auto space-y-4">
              {[
                { name: "Rahul Sharma", time: "10 min ago", status: "Admitted", color: "bg-blue-500" },
                { name: "Priya Singh", time: "32 min ago", status: "OPD", color: "bg-teal-500" },
                { name: "Amit Kumar", time: "1 hr ago", status: "Emergency", color: "bg-rose-500" },
                { name: "Sneha Patel", time: "2 hrs ago", status: "OPD", color: "bg-teal-500" },
              ].map((patient, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group border border-transparent hover:border-slate-200 dark:hover:border-slate-800">
                  <div className={`w-2 h-10 rounded-full ${patient.color}`}></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">{patient.name}</h4>
                    <p className="text-xs text-muted-foreground">{patient.time} • {patient.status}</p>
                  </div>
                  <Badge variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-200 dark:bg-slate-700">
                    <ArrowRight className="w-3 h-3 text-slate-700 dark:text-slate-200" />
                  </Badge>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium hover:bg-slate-800 dark:hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              View All Patients
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
