"use client";

import { useGetDoctorsQuery } from "@/redux/apiSlice";
import { Plus } from "lucide-react";

export default function DoctorsPage() {
  const { data: doctors, isLoading } = useGetDoctorsQuery();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Doctors</h2>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
          <Plus className="mr-2 h-4 w-4" /> Add Doctor
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {isLoading && <p>Loading doctors...</p>}
        {doctors?.length === 0 && <p className="text-muted-foreground">No doctors found.</p>}
        {doctors?.map((doc: any) => (
          <div key={doc.id} className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {doc.firstName?.charAt(0)}{doc.lastName?.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold leading-none tracking-tight">Dr. {doc.firstName} {doc.lastName}</h3>
                <p className="text-sm text-muted-foreground mt-1">{doc.department || 'General Medicine'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
