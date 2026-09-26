"use client";

import { useGetAppointmentsQuery } from "@/redux/apiSlice";
import { Plus, Search, MoreVertical } from "lucide-react";
import Link from "next/link";

export default function AppointmentList() {
  const { data: appointments, isLoading, error } = useGetAppointmentsQuery();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
        <div className="flex items-center space-x-2">
          <Link
            href="/dashboard/appointments/new"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            <Plus className="mr-2 h-4 w-4" /> Book Appointment
          </Link>
        </div>
      </div>

      <div className="rounded-md border bg-card mt-6">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b hover:bg-muted/50">
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Date & Time</th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Patient</th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Doctor</th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Status</th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Type</th>
                <th className="h-12 px-4 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <tr><td colSpan={6} className="p-4 text-center">Loading appointments...</td></tr>}
              {appointments?.length === 0 && <tr><td colSpan={6} className="p-4 text-center">No appointments scheduled.</td></tr>}
              {appointments?.map((app: any) => (
                <tr key={app.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">{new Date(app.appointmentDate).toLocaleString()}</td>
                  <td className="p-4 align-middle">{app.patient?.firstName} {app.patient?.lastName}</td>
                  <td className="p-4 align-middle">Dr. {app.doctor?.firstName} {app.doctor?.lastName}</td>
                  <td className="p-4 align-middle">{app.status}</td>
                  <td className="p-4 align-middle">{app.appointmentType}</td>
                  <td className="p-4 align-middle text-right">
                    <button className="inline-flex items-center rounded-md hover:bg-accent p-2">
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
