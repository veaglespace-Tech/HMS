"use client";

import React, { useState } from "react";
import { 
  IndianRupee, Search, Plus, FileText, Download, 
  CheckCircle2, Clock, XCircle, MoreVertical 
} from "lucide-react";
import { motion } from "framer-motion";

// Mock Data for the UI
const MOCK_BILLS = [
  {
    id: "BILL-2026-001",
    patientName: "Rahul Sharma",
    date: "2026-09-29T10:30:00",
    totalAmount: 1500,
    amountPaid: 1500,
    outstanding: 0,
    status: "PAID"
  },
  {
    id: "BILL-2026-002",
    patientName: "Priya Patel",
    date: "2026-09-29T11:15:00",
    totalAmount: 4500,
    amountPaid: 2000,
    outstanding: 2500,
    status: "PARTIALLY_PAID"
  },
  {
    id: "BILL-2026-003",
    patientName: "Amit Kumar",
    date: "2026-09-28T16:45:00",
    totalAmount: 850,
    amountPaid: 0,
    outstanding: 850,
    status: "UNPAID"
  },
  {
    id: "BILL-2026-004",
    patientName: "Sneha Reddy",
    date: "2026-09-27T09:20:00",
    totalAmount: 1200,
    amountPaid: 0,
    outstanding: 1200,
    status: "CANCELLED"
  }
];

export default function BillingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return (
          <span className="flex w-fit items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" /> Paid
          </span>
        );
      case "PARTIALLY_PAID":
        return (
          <span className="flex w-fit items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
            <Clock className="h-3.5 w-3.5" /> Partial
          </span>
        );
      case "UNPAID":
        return (
          <span className="flex w-fit items-center gap-1.5 rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-500/10 dark:text-rose-400">
            <Clock className="h-3.5 w-3.5" /> Unpaid
          </span>
        );
      case "CANCELLED":
        return (
          <span className="flex w-fit items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-500/10 dark:text-slate-400">
            <XCircle className="h-3.5 w-3.5" /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full flex-col gap-6 p-6 lg:p-8 relative">
      
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Billing & Invoices
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage patient bills, track payments, and generate PDF invoices.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800 transition-all">
            <FileText className="h-4 w-4" /> Export Report
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all">
            <Plus className="h-4 w-4" /> Generate Bill
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <p className="text-sm font-medium text-slate-500">Today's Revenue</p>
          <p className="mt-2 flex items-center text-3xl font-bold text-slate-900 dark:text-white">
            <IndianRupee className="h-6 w-6 mr-1 text-slate-400" /> 12,450
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <p className="text-sm font-medium text-slate-500">Outstanding Dues</p>
          <p className="mt-2 flex items-center text-3xl font-bold text-rose-600 dark:text-rose-400">
            <IndianRupee className="h-6 w-6 mr-1 opacity-70" /> 4,550
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <p className="text-sm font-medium text-slate-500">Bills Generated</p>
          <p className="mt-2 flex items-center text-3xl font-bold text-slate-900 dark:text-white">
            24
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-emerald-50 p-5 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">Payment Collection Rate</p>
          <p className="mt-2 flex items-center text-3xl font-bold text-emerald-700 dark:text-emerald-400">
            85%
          </p>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        
        {/* Search Bar */}
        <div className="border-b border-slate-200 p-4 dark:border-slate-800">
          <div className="relative max-w-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-xl border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:text-white dark:ring-slate-700"
              placeholder="Search by Patient Name or Bill ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-slate-900 sm:pl-6 dark:text-slate-200">Bill ID</th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-slate-900 dark:text-slate-200">Patient</th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-slate-900 dark:text-slate-200">Date</th>
                <th scope="col" className="px-3 py-3.5 text-right text-xs font-semibold text-slate-900 dark:text-slate-200">Total</th>
                <th scope="col" className="px-3 py-3.5 text-right text-xs font-semibold text-slate-900 dark:text-slate-200">Outstanding</th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-slate-900 dark:text-slate-200">Status</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-transparent">
              {MOCK_BILLS.map((bill, index) => (
                <motion.tr 
                  key={bill.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-emerald-600 sm:pl-6 dark:text-emerald-400">
                    {bill.id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                    {bill.patientName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {new Date(bill.date).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-medium text-slate-900 dark:text-white">
                    ₹{bill.totalAmount.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-medium text-slate-500 dark:text-slate-400">
                    {bill.outstanding > 0 ? (
                      <span className="text-rose-600 dark:text-rose-400">₹{bill.outstanding.toLocaleString()}</span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                    {getStatusBadge(bill.status)}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-800 dark:hover:text-emerald-400 transition-colors" title="Download PDF">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
