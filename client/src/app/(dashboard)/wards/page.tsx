"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bed, UserPlus, Info, CheckCircle2, X } from "lucide-react";

// Mock data representing the hierarchy: Wards -> Rooms -> Beds
const initialWards = [
  {
    id: "w1",
    name: "General Ward A",
    rooms: [
      {
        id: "r1",
        roomNumber: "101",
        type: "Non-AC",
        beds: [
          { id: "b1", number: "101-A", status: "AVAILABLE", patient: null },
          { id: "b2", number: "101-B", status: "OCCUPIED", patient: "Rahul Sharma" },
          { id: "b3", number: "101-C", status: "AVAILABLE", patient: null },
          { id: "b4", number: "101-D", status: "MAINTENANCE", patient: null },
        ]
      },
      {
        id: "r2",
        roomNumber: "102",
        type: "Non-AC",
        beds: [
          { id: "b5", number: "102-A", status: "AVAILABLE", patient: null },
          { id: "b6", number: "102-B", status: "AVAILABLE", patient: null },
        ]
      }
    ]
  },
  {
    id: "w2",
    name: "Intensive Care Unit (ICU)",
    rooms: [
      {
        id: "r3",
        roomNumber: "ICU-1",
        type: "AC",
        beds: [
          { id: "b7", number: "ICU-1A", status: "OCCUPIED", patient: "Priya Singh" },
          { id: "b8", number: "ICU-1B", status: "OCCUPIED", patient: "Amit Kumar" },
        ]
      },
      {
        id: "r4",
        roomNumber: "ICU-2",
        type: "AC",
        beds: [
          { id: "b9", number: "ICU-2A", status: "AVAILABLE", patient: null },
        ]
      }
    ]
  }
];

export default function BedManagementPage() {
  const [wards, setWards] = useState(initialWards);
  const [selectedBed, setSelectedBed] = useState<any>(null);
  const [isAdmitting, setIsAdmitting] = useState(false);
  const [patientName, setPatientName] = useState("");

  const handleBedClick = (bed: any, room: any, ward: any) => {
    setSelectedBed({ ...bed, room, ward });
  };

  const closeDialog = () => {
    setSelectedBed(null);
    setIsAdmitting(false);
    setPatientName("");
  };

  const handleAdmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) return;

    // Simulate API call
    // await fetch(`/api/v1/beds/${selectedBed.id}/assign/patientId`, { method: "POST" });
    
    setWards((prevWards) => 
      prevWards.map(w => 
        w.id === selectedBed.ward.id 
          ? { ...w, rooms: w.rooms.map(r => 
              r.id === selectedBed.room.id 
                ? { ...r, beds: r.beds.map(b => 
                    b.id === selectedBed.id ? { ...b, status: "OCCUPIED", patient: patientName } : b
                  )} 
                : r
            )}
          : w
      )
    );
    
    closeDialog();
  };

  const handleVacate = () => {
    setWards((prevWards) => 
      prevWards.map(w => 
        w.id === selectedBed.ward.id 
          ? { ...w, rooms: w.rooms.map(r => 
              r.id === selectedBed.room.id 
                ? { ...r, beds: r.beds.map(b => 
                    b.id === selectedBed.id ? { ...b, status: "AVAILABLE", patient: null } : b
                  )} 
                : r
            )}
          : w
      )
    );
    closeDialog();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE": return "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30";
      case "OCCUPIED": return "bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30";
      case "MAINTENANCE": return "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30";
      default: return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  const getStatusIconColor = (status: string) => {
    switch (status) {
      case "AVAILABLE": return "text-emerald-500";
      case "OCCUPIED": return "text-rose-500";
      case "MAINTENANCE": return "text-amber-500";
      default: return "text-slate-500";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen relative">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Bed Management</h1>
          <p className="text-muted-foreground mt-2">Real-time occupancy status across all wards and rooms.</p>
        </div>
        <div className="flex gap-4 text-sm font-medium">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Available</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-500"></div> Occupied</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500"></div> Maintenance</div>
        </div>
      </div>

      <div className="space-y-12">
        {wards.map((ward) => (
          <div key={ward.id} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-slate-800 dark:text-slate-100">
              {ward.name}
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ward.rooms.map((room) => (
                <div key={room.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700/50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-slate-700 dark:text-slate-300">Room {room.roomNumber}</h3>
                    <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-md text-slate-600 dark:text-slate-400">{room.type}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {room.beds.map((bed) => (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        key={bed.id}
                        onClick={() => handleBedClick(bed, room, ward)}
                        className={`cursor-pointer rounded-lg border-2 p-3 flex flex-col items-center justify-center transition-all ${getStatusColor(bed.status)}`}
                      >
                        <Bed className={`w-8 h-8 mb-2 ${getStatusIconColor(bed.status)}`} />
                        <span className="font-bold text-sm">{bed.number}</span>
                        <span className="text-[10px] font-medium uppercase tracking-wider mt-1 opacity-80">{bed.status}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bed Action Modal */}
      <AnimatePresence>
        {selectedBed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden relative"
            >
              <button onClick={closeDialog} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-xl ${getStatusColor(selectedBed.status)}`}>
                    <Bed className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedBed.number}</h2>
                    <p className="text-muted-foreground">{selectedBed.ward.name} • Room {selectedBed.room.roomNumber}</p>
                  </div>
                </div>

                {selectedBed.status === "AVAILABLE" ? (
                  isAdmitting ? (
                    <form onSubmit={handleAdmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Patient Name</label>
                        <input 
                          type="text" 
                          required
                          autoFocus
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                          placeholder="Enter patient name to admit..."
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button type="button" onClick={() => setIsAdmitting(false)} className="flex-1 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium">Cancel</button>
                        <button type="submit" className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> Confirm
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 p-4 rounded-lg flex items-start gap-3">
                        <Info className="w-5 h-5 shrink-0 mt-0.5" />
                        <p className="text-sm">This bed is fully sanitized and ready for a new patient.</p>
                      </div>
                      <button 
                        onClick={() => setIsAdmitting(true)}
                        className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium flex items-center justify-center gap-2 transition-colors"
                      >
                        <UserPlus className="w-5 h-5" /> Admit Patient
                      </button>
                    </div>
                  )
                ) : selectedBed.status === "OCCUPIED" ? (
                  <div className="space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Current Patient</p>
                      <p className="font-semibold text-lg">{selectedBed.patient}</p>
                    </div>
                    <button 
                      onClick={handleVacate}
                      className="w-full py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      Discharge & Vacate Bed
                    </button>
                  </div>
                ) : (
                  <div className="bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 p-4 rounded-lg flex items-start gap-3">
                    <Info className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm">This bed is currently undergoing maintenance and cannot be assigned.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
