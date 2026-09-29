"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, Phone, MapPin, Calendar as CalendarIcon, 
  Stethoscope, Clock, ShieldCheck, ChevronRight, Activity 
} from "lucide-react";
import Link from "next/link";

export default function NewPatientRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request to backend (POST /api/v1/patients & POST /api/v1/encounters)
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-6rem)]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 text-center max-w-md shadow-xl"
        >
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Patient Registered!</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            The patient has been successfully added to the system and placed in the doctor's active queue.
          </p>
          <div className="flex gap-4">
            <button onClick={() => setSuccess(false)} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Register Another
            </button>
            <Link href="/workspace" className="flex-1 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 shadow-lg transition-colors flex items-center justify-center gap-2">
              View Queue <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-[calc(100vh-6rem)] relative">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      
      <div className="relative z-10 mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <User className="w-8 h-8 text-emerald-500" />
            New Patient Registration
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Quickly onboard a walk-in patient and assign them to a doctor's queue.
          </p>
        </div>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-sm overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          
          {/* Section 1: Personal Info */}
          <div className="p-8 border-r border-b lg:border-b-0 border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-black">1</span> 
              Personal Details
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-600 dark:text-slate-400">Full Name</label>
                <input required type="text" placeholder="John Doe" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-600 dark:text-slate-400">Age</label>
                  <input required type="number" placeholder="Years" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-600 dark:text-slate-400">Gender</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-600 dark:text-slate-400">Date of Birth</label>
                <div className="relative">
                  <CalendarIcon className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                  <input type="date" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Contact Info */}
          <div className="p-8 border-r border-b md:border-b-0 border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-black">2</span> 
              Contact Info
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-600 dark:text-slate-400">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                  <input required type="tel" placeholder="+91 98765 43210" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-600 dark:text-slate-400">Address / City</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                  <textarea rows={4} placeholder="Enter full address" className="w-full resize-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Visit Details */}
          <div className="p-8 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col h-full">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-black">3</span> 
              Visit Details
            </h3>
            
            <div className="space-y-5 flex-1">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-600 dark:text-slate-400">Assign To Doctor</label>
                <div className="relative">
                  <Stethoscope className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                  <select className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none font-medium">
                    <option>Dr. Sarah Jenkins - Cardiology</option>
                    <option>Dr. Ramesh Gupta - Neurology</option>
                    <option>Dr. Emily Chen - Pediatrics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-600 dark:text-slate-400">Reason for Visit (Chief Complaint)</label>
                <div className="relative">
                  <Activity className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                  <input required type="text" placeholder="E.g., Fever, Headache" className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-slate-900 dark:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Registering Patient..." : "Register Patient & Generate Token"}
              </button>
            </div>
          </div>
          
        </div>
      </motion.form>
    </div>
  );
}
