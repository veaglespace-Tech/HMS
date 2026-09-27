"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, FileText, CheckCircle2, User, Activity, Clock, Stethoscope, Save, Loader2 } from "lucide-react";

export default function AiScribePage() {
  const [rawNote, setRawNote] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    chiefComplaint: string;
    diagnosis: string;
    treatmentPlan: string;
  } | null>(null);

  const handleMagicFormat = () => {
    if (!rawNote.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate network delay and backend AI processing
    setTimeout(() => {
      const lowerInput = rawNote.toLowerCase();
      
      // Basic heuristic to mock the backend's behavior
      let cc = "General consultation";
      let dx = "Pending evaluation";
      let tx = "Standard care protocol";
      
      if (lowerInput.includes("fever") || lowerInput.includes("pain")) cc = "Fever and generalized pain";
      if (lowerInput.includes("viral") || lowerInput.includes("infection")) dx = "Viral Infection";
      if (lowerInput.includes("paracetamol") || lowerInput.includes("rest")) tx = "Prescribed Paracetamol 500mg, recommended 3 days rest.";
      
      // If there are no obvious keywords, just extract parts of the text to look realistic
      if (cc === "General consultation" && rawNote.length > 20) {
        cc = "Patient reports: " + rawNote.substring(0, 30) + "...";
        dx = "Evaluation based on symptoms";
        tx = "Symptomatic management, follow up if symptoms persist.";
      }

      setResult({
        chiefComplaint: cc,
        diagnosis: dx,
        treatmentPlan: tx
      });
      setIsProcessing(false);
    }, 2000); // 2 second mock delay for "AI processing"
  };

  const handleSave = () => {
    alert("Clinical Note saved to Encounter successfully!");
    // In real app, this would redirect or show a toast notification
  };

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen relative">
      {/* Decorative background gradients */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: "1s" }}></div>

      <div className="relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-emerald-500" />
            AI Clinical Scribe
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Type your unstructured thoughts below, and let the AI instantly format them into a professional clinical note.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-[600px] bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-sm overflow-hidden relative"
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex justify-between items-center">
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-400" />
                Raw Consultation Notes
              </h3>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
                <Clock className="w-3.5 h-3.5" /> Auto-saving...
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <textarea
                value={rawNote}
                onChange={(e) => setRawNote(e.target.value)}
                placeholder="E.g., pt came in with high fever for 3 days, body ache. looks like viral. give pcm 500mg tid and tell them to rest for 3 days."
                className="w-full h-full resize-none bg-transparent outline-none text-slate-700 dark:text-slate-200 text-lg leading-relaxed placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>
            
            <div className="p-6 bg-gradient-to-t from-white dark:from-slate-900 via-white/80 dark:via-slate-900/80 to-transparent pt-12">
              <button
                onClick={handleMagicFormat}
                disabled={isProcessing || !rawNote.trim()}
                className="w-full group relative flex items-center justify-center gap-3 bg-slate-900 dark:bg-emerald-500 hover:bg-slate-800 dark:hover:bg-emerald-600 text-white p-4 rounded-2xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 dark:group-hover:opacity-0 transition-opacity"></div>
                {isProcessing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin relative z-10" />
                    <span className="relative z-10">Formatting Note...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 relative z-10" />
                    <span className="relative z-10">✨ Magic Format</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Result Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-[600px] bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-inner relative overflow-hidden"
          >
            {/* Patient Context Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100">Patient: Rahul Sharma</h3>
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5" /> Encounter ID: #ENC-9284
                </p>
              </div>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {!result && !isProcessing ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 text-center px-8"
                  >
                    <Stethoscope className="w-16 h-16 mb-4 opacity-20" />
                    <p className="font-medium text-lg text-slate-500 dark:text-slate-400 mb-2">Awaiting processing</p>
                    <p className="text-sm">Type your notes and hit the magic format button to see the structured output here.</p>
                  </motion.div>
                ) : isProcessing ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center space-y-6"
                  >
                    {/* Skeleton Loading State */}
                    <div className="w-full space-y-8">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-3">
                          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-1/3 animate-pulse"></div>
                          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-full animate-pulse"></div>
                          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-5/6 animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Chief Complaint
                      </h4>
                      <p className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        {result?.chiefComplaint}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Diagnosis
                      </h4>
                      <p className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        {result?.diagnosis}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Treatment Plan
                      </h4>
                      <p className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        {result?.treatmentPlan}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Save Action */}
            <AnimatePresence>
              {result && !isProcessing && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700"
                >
                  <button 
                    onClick={handleSave}
                    className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg"
                  >
                    <Save className="w-5 h-5" /> Save to Encounter Record
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
