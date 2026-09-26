"use client";

import { Plus } from "lucide-react";

export default function WardsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Wards & Beds</h2>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
          <Plus className="mr-2 h-4 w-4" /> Add Ward
        </button>
      </div>

      <div className="rounded-md border bg-card mt-6 p-12 flex flex-col items-center justify-center text-center">
        <h3 className="text-lg font-semibold">Ward Management</h3>
        <p className="text-muted-foreground mt-2 max-w-sm">
          Beds and wards will be displayed here. The API integration for wards is currently pending.
        </p>
      </div>
    </div>
  );
}
