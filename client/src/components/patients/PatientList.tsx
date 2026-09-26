import { useGetPatientsQuery } from "@/redux/apiSlice";
import { Plus, Search, MoreVertical } from "lucide-react";
import Link from "next/link";

export default function PatientList() {
  const { data: patients, isLoading, error } = useGetPatientsQuery();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
        <div className="flex items-center space-x-2">
          <Link
            href="/dashboard/patients/new"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Patient
          </Link>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 border rounded-md px-3 py-2 bg-background w-full md:w-[300px]">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search by UHID, Name, Phone..." 
          className="flex-1 bg-transparent outline-none text-sm"
        />
      </div>

      <div className="rounded-md border bg-card">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">UHID</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Gender</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Phone</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Blood Group</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {isLoading && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-muted-foreground">Loading patients...</td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-red-500">Failed to load patients</td>
                </tr>
              )}
              {patients && patients.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-muted-foreground">No patients found.</td>
                </tr>
              )}
              {patients && patients.map((patient: any) => (
                <tr key={patient.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">{patient.uhid}</td>
                  <td className="p-4 align-middle">{patient.firstName} {patient.lastName}</td>
                  <td className="p-4 align-middle">{patient.gender}</td>
                  <td className="p-4 align-middle">{patient.phone}</td>
                  <td className="p-4 align-middle">{patient.bloodGroup}</td>
                  <td className="p-4 align-middle text-right">
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 w-8">
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
