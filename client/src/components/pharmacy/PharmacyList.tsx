"use client";

import { useGetMedicinesQuery } from "@/redux/apiSlice";
import { Plus, Search, MoreVertical } from "lucide-react";
import Link from "next/link";

export default function PharmacyList() {
  const { data: medicines, isLoading, error } = useGetMedicinesQuery();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Pharmacy Management</h2>
        <div className="flex items-center space-x-2">
          <Link
            href="/dashboard/pharmacy/new"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Medicine
          </Link>
        </div>
      </div>
      
      <div className="rounded-md border bg-card mt-6">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Medicine Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Generic Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Stock</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {isLoading && <tr><td colSpan={5} className="p-4 text-center">Loading medicines...</td></tr>}
              {error && <tr><td colSpan={5} className="p-4 text-center text-red-500">Failed to load medicines</td></tr>}
              {medicines && medicines.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">No medicines available in stock.</td></tr>}
              {medicines && medicines.map((med: any) => (
                <tr key={med.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">{med.name}</td>
                  <td className="p-4 align-middle">{med.genericName}</td>
                  <td className="p-4 align-middle">{med.stockQuantity}</td>
                  <td className="p-4 align-middle">{med.category}</td>
                  <td className="p-4 align-middle text-right">
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
