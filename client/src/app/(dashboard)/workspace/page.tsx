"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, UserPlus, Clock, Search, FileText, Sparkles, 
  Pill, Activity, CheckCircle2, Save, Printer, Phone
} from "lucide-react";

// Mock Data for the Queue
const TODAY_QUEUE = [
  { id: "p1", name: "Rahul Sharma", age: 34, gender: "M", status: "WAITING", time: "10:00 AM", reason: "Fever and body ache" },
  { id: "p2", name: "Priya Singh", age: 28, gender: "F", status: "IN_CONSULTATION", time: "10:15 AM", reason: "Routine Checkup" },
  { id: "p3", name: "Amit Kumar", age: 45, gender: "M", status: "WAITING", time: "10:30 AM", reason: "Follow up - Hypertension" },
  { id: "p4", name: "Sneha Patel", age: 8, gender: "F", status: "WAITING", time: "11:00 AM", reason: "Vaccination" },
];

export default function DoctorWorkspace() {
  const [activePatient, setActivePatient] = useState(TODAY_QUEUE[1]);
  const [rawNote, setRawNote] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [prescriptions, setPrescriptions] = useState([{ med: "", qty: "", instructions: "" }]);

  const [aiResult, setAiResult] = useState<{ chiefComplaint: string; diagnosis: string; } | null>(null);

  const handleMagicFormat = () => {
    if (!rawNote.trim()) return;
    setIsProcessing(true);
    
    // Simulate AI Scribe Processing
    setTimeout(() => {
      setAiResult({
        chiefComplaint: "Patient reports fever and severe body aches for the past 3 days.",
        diagnosis: "Suspected Viral Infection",
      });
      setIsProcessing(false);
    }, 1500);
  };

  const addPrescriptionRow = () => {
    setPrescriptions([...prescriptions, { med: "", qty: "", instructions: "" }]);
  };

  return (
    <div className="h-[calc(100vh-6rem)] max-h-screen flex gap-6 p-4 md:p-6 overflow-hidden bg-slate-50/50 dark:bg-slate-950">
      
      {/* LEFT PANEL: Patient Queue */}
      <div className="w-80 flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex-shrink-0">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <h2 className="font-bold text-lg flex items-center gap-2 text-slate-800 dark:text-slate-100">
            <Users className="w-5 h-5 text-emerald-500" /> Today's Queue
          </h2>
          <div className="mt-4 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search patient..." 
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {TODAY_QUEUE.map((patient) => (
            <div 
              key={patient.id}
              onClick={() => setActivePatient(patient)}
              className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                activePatient.id === patient.id 
                  ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800 shadow-sm" 
                  : "bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className={`font-bold ${activePatient.id === patient.id ? "text-emerald-700 dark:text-emerald-400" : "text-slate-700 dark:text-slate-200"}`}>
                  {patient.name}
                </h4>
                <span className="text-xs font-medium text-slate-400">{patient.time}</span>
              </div>
              <p className="text-xs text-slate-500 mb-2">{patient.age} yrs • {patient.gender}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium truncate w-32 opacity-70">{patient.reason}</span>
                {patient.status === "IN_CONSULTATION" ? (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MIDDLE & RIGHT PANELS: Unified Doctor Workspace */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        
        {/* Header: Active Patient Info */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xl text-slate-600 dark:text-slate-300">
              {activePatient.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{activePatient.name}</h2>
              <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                <span>{activePatient.age} Years • {activePatient.gender}</span>
                <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> +91 9876543210</span>
                <span className="flex items-center gap-1"><Activity className="w-3 h-3"/> Vitals: Normal</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors">
              <Clock className="w-4 h-4" /> History
            </button>
            <button className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold flex items-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-lg transition-colors">
              <CheckCircle2 className="w-4 h-4" /> Mark Complete
            </button>
          </div>
        </div>

        {/* Scrollable Workspace Area */}
        <div className="flex-1 overflow-y-auto pr-2 pb-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* AI SCRIBE SECTION */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[500px]">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2"><Sparkles className="w-5 h-5 text-emerald-500" /> AI Scribe Notes</h3>
            </div>
            
            <div className="flex-1 p-5 flex flex-col gap-4">
              <textarea
                value={rawNote}
                onChange={(e) => setRawNote(e.target.value)}
                placeholder="Type your rapid consultation notes here..."
                className="w-full h-32 resize-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <button 
                onClick={handleMagicFormat}
                disabled={isProcessing || !rawNote.trim()}
                className="w-full py-3 rounded-xl bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "✨ Magic Format"}
              </button>

              <AnimatePresence>
                {aiResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-2xl p-4 space-y-4 overflow-y-auto"
                  >
                    <div>
                      <p className="text-xs font-bold uppercase text-emerald-600">Chief Complaint</p>
                      <p className="text-sm mt-1">{aiResult.chiefComplaint}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-emerald-600">Diagnosis</p>
                      <p className="text-sm mt-1">{aiResult.diagnosis}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* PRESCRIPTION SECTION */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[500px]">
             <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2"><Pill className="w-5 h-5 text-blue-500" /> Rx Prescription</h3>
              <button onClick={addPrescriptionRow} className="text-sm font-semibold text-blue-600 hover:text-blue-700">+ Add Med</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {prescriptions.map((p, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-3">
                  <input 
                    type="text" 
                    placeholder="Medicine Name (e.g. Paracetamol 500mg)" 
                    className="flex-[2] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Qty (e.g. 10)" 
                    className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Freq (e.g. 1-0-1)" 
                    className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              ))}

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                 <textarea
                  placeholder="Additional Advice / Diet instructions..."
                  className="w-full h-24 resize-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            
            <div className="p-5 border-t border-slate-100 dark:border-slate-800 flex gap-3">
              <button className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <Printer className="w-4 h-4" /> Print Rx
              </button>
              <button className="flex-[2] py-3 rounded-xl bg-blue-500 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-colors">
                <Save className="w-4 h-4" /> Send to Pharmacy
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
