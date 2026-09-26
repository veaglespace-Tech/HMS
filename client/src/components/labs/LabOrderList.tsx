"use client";

import { useGetLabOrdersQuery } from "@/redux/apiSlice";
import { Plus, MoreVertical } from "lucide-react";

export default function LabOrderList() {
  const { data: orders, isLoading, error } = useGetLabOrdersQuery();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Laboratory Orders</h2>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
          <Plus className="mr-2 h-4 w-4" /> New Test Order
        </button>
      </div>

      <div className="rounded-md border bg-card mt-6">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Patient ID</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Test Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {isLoading && <tr><td colSpan={5} className="p-4 text-center">Loading lab orders...</td></tr>}
              {orders && orders.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">No pending lab orders.</td></tr>}
              {orders && orders.map((order: any) => (
                <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="p-4 align-middle">{order.patient?.uhid}</td>
                  <td className="p-4 align-middle">{order.testName}</td>
                  <td className="p-4 align-middle">{order.status}</td>
                  <td className="p-4 align-middle text-right">
                    <button className="inline-flex items-center justify-center rounded-md text-sm hover:bg-accent h-8 w-8">
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
