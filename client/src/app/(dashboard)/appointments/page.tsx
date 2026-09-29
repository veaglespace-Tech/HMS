"use client";

import React, { useState } from "react";
import { format, addDays, startOfWeek, subWeeks, addWeeks } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, User, Clock, Plus, X, Phone, FileText, CheckCircle2 } from "lucide-react";

// Mock Data
const DOCTORS = [
  { id: "all", name: "All Doctors", spec: "Hospital Wide" },
  { id: "d1", name: "Dr. Sarah Jenkins", spec: "Cardiology", color: "bg-blue-500" },
  { id: "d2", name: "Dr. Ramesh Gupta", spec: "Neurology", color: "bg-purple-500" },
  { id: "d3", name: "Dr. Emily Chen", spec: "Pediatrics", color: "bg-emerald-500" },
];

const MOCK_APPOINTMENTS = [
  { id: 1, doctorId: "d1", patient: "Rahul Sharma", time: "10:00", dayOffset: 1, type: "Follow-up", color: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800" },
  { id: 2, doctorId: "d1", patient: "Priya Singh", time: "14:00", dayOffset: 1, type: "Consultation", color: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800" },
  { id: 3, doctorId: "d2", patient: "Amit Kumar", time: "11:00", dayOffset: 2, type: "Routine", color: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800" },
  { id: 4, doctorId: "d3", patient: "Sneha Patel", time: "09:00", dayOffset: 3, type: "Vaccination", color: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800" },
  { id: 5, doctorId: "d2", patient: "Vikram Das", time: "15:00", dayOffset: 4, type: "Consultation", color: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800" },
];

const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export default function InteractiveCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState(DOCTORS[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: Date; time: string } | null>(null);

  // Generate Week Days
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday
  const weekDays = Array.from({ length: 6 }).map((_, i) => addDays(startOfCurrentWeek, i)); // Mon-Sat

  const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const prevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const today = () => setCurrentDate(new Date());

  const handleSlotClick = (day: Date, time: string, isOccupied: boolean) => {
    if (!isOccupied) {
      setSelectedSlot({ day, time });
      setIsModalOpen(true);
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto min-h-screen flex flex-col relative">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Appointment Calendar</h1>
          <p className="text-muted-foreground mt-2">Manage doctor schedules and book interactive time slots.</p>
        </div>

        <div className="flex items-center gap-4 bg-white/60 dark:bg-slate-900/60 p-2 rounded-xl backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-sm">
          <select 
            value={selectedDoctor} 
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="bg-transparent border-none outline-none font-medium text-slate-700 dark:text-slate-200 px-2 cursor-pointer"
          >
            {DOCTORS.map(doc => (
              <option key={doc.id} value={doc.id}>{doc.name}</option>
            ))}
          </select>
          <div className="w-px h-6 bg-slate-300 dark:bg-slate-700"></div>
          <div className="flex items-center gap-1">
            <button onClick={prevWeek} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
            <button onClick={today} className="px-3 py-1.5 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-700 dark:text-slate-300">
              Today
            </button>
            <button onClick={nextWeek} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="p-4 border-r border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400">
            <Clock className="w-5 h-5" />
          </div>
          {weekDays.map((day, i) => (
            <div key={i} className="p-4 text-center border-r border-slate-200 dark:border-slate-800 last:border-r-0">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{format(day, 'EEE')}</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{format(day, 'dd')}</p>
            </div>
          ))}
        </div>

        {/* Time Slots Body */}
        <div className="flex-1 overflow-y-auto">
          {TIME_SLOTS.map((time, timeIndex) => (
            <div key={time} className="grid grid-cols-7 border-b border-slate-100 dark:border-slate-800/50 last:border-b-0 min-h-[100px]">
              {/* Time Column */}
              <div className="p-4 border-r border-slate-100 dark:border-slate-800/50 text-sm font-medium text-slate-500 flex items-start justify-center pt-3 bg-slate-50/30 dark:bg-slate-900/30">
                {time}
              </div>

              {/* Day Cells */}
              {weekDays.map((day, dayIndex) => {
                // Find appointment for this specific cell
                const appointment = MOCK_APPOINTMENTS.find(apt => 
                  apt.time === time && 
                  apt.dayOffset === dayIndex &&
                  (selectedDoctor === "all" || apt.doctorId === selectedDoctor)
                );

                const doctorInfo = DOCTORS.find(d => d.id === appointment?.doctorId);

                return (
                  <div 
                    key={dayIndex} 
                    onClick={() => handleSlotClick(day, time, !!appointment)}
                    className={`p-2 border-r border-slate-100 dark:border-slate-800/50 last:border-r-0 relative group transition-colors ${
                      !appointment ? "hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer" : "cursor-default"
                    }`}
                  >
                    {!appointment ? (
                      <div className="w-full h-full rounded-lg border-2 border-dashed border-transparent group-hover:border-slate-300 dark:group-hover:border-slate-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <Plus className="w-6 h-6 text-slate-400" />
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`w-full h-full rounded-xl p-3 border ${appointment.color} shadow-sm relative overflow-hidden group/card cursor-pointer`}
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-current opacity-50"></div>
                        <h4 className="font-bold text-sm truncate">{appointment.patient}</h4>
                        <p className="text-xs font-medium opacity-80 mt-1">{appointment.type}</p>
                        
                        {selectedDoctor === "all" && doctorInfo && (
                          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
                            <div className={`w-2 h-2 rounded-full ${doctorInfo.color}`}></div>
                            <span className="truncate">{doctorInfo.name}</span>
                          </div>
                        )}
                        
                        <div className="absolute inset-0 bg-black/5 dark:bg-white/10 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* New Appointment Modal */}
      <AnimatePresence>
        {isModalOpen && selectedSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden relative"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">New Appointment</h2>
                <div className="flex items-center gap-4 mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-lg">
                  <CalendarIcon className="w-4 h-4" />
                  {format(selectedSlot.day, "EEEE, MMMM d, yyyy")}
                  <div className="w-1 h-1 bg-current rounded-full"></div>
                  <Clock className="w-4 h-4" />
                  {selectedSlot.time}
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Assign Doctor</label>
                  <select className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none">
                    {DOCTORS.filter(d => d.id !== "all").map(doc => (
                      <option key={doc.id} value={doc.id}>{doc.name} - {doc.spec}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Patient Details</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input type="text" placeholder="Full Name" className="w-full rounded-t-xl border-slate-200 dark:border-slate-700 border-b-0 bg-slate-50 dark:bg-slate-800 pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none z-10 relative" />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input type="text" placeholder="Phone Number" className="w-full border-slate-200 dark:border-slate-700 border-y-0 bg-slate-50 dark:bg-slate-800 pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none z-10 relative" />
                  </div>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input type="text" placeholder="Reason for visit" className="w-full rounded-b-xl border-slate-200 dark:border-slate-700 border-t-0 bg-slate-50 dark:bg-slate-800 pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none z-10 relative" />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold transition-colors text-slate-700 dark:text-slate-300">
                    Cancel
                  </button>
                  <button className="flex-[2] py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-colors">
                    <CheckCircle2 className="w-5 h-5" /> Confirm Booking
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
