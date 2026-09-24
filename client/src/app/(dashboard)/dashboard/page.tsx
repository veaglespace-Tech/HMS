import { Activity, Users, Bed, Pill, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function DashboardOverview() {
  const stats = [
    { title: "Total Patients", value: "2,543", icon: Users, trend: "+12.5%", color: "text-blue-500" },
    { title: "Available Beds", value: "45 / 120", icon: Bed, trend: "32% empty", color: "text-teal-500" },
    { title: "Today's Appointments", value: "84", icon: Activity, trend: "+4.2%", color: "text-orange-500" },
    { title: "Pharmacy Orders", value: "142", icon: Pill, trend: "-1.5%", color: "text-purple-500" },
  ];

  const recentPatients = [
    { id: "UHID-2026-001", name: "Rahul Sharma", age: 45, status: "Admitted", department: "Cardiology" },
    { id: "UHID-2026-002", name: "Priya Singh", age: 28, status: "OPD", department: "Neurology" },
    { id: "UHID-2026-003", name: "Amit Kumar", age: 35, status: "Emergency", department: "Trauma" },
    { id: "UHID-2026-004", name: "Sneha Patel", age: 52, status: "Discharged", department: "Orthopedics" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome back, Dr. Admin. Here's what's happening today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> {stat.trend} from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
            <CardDescription>
              A list of patients who recently checked in or were admitted.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>UHID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Department</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>
                      <Badge variant={patient.status === 'Emergency' ? 'destructive' : patient.status === 'Admitted' ? 'default' : 'secondary'}>
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{patient.department}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-3 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Bed Occupancy</CardTitle>
            <CardDescription>Current status across wards.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[250px] text-muted-foreground border-2 border-dashed rounded-lg m-2">
            Chart Placeholder (Requires Recharts)
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
