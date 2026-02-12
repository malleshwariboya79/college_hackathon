"use client";
import Calendar from "@/components/calendar";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4">AI Suggested Study Plan</h3>
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <div className="flex justify-between">
              <span>2:00 PM - DSA Review</span>
              <span className="text-gray-400">Pending</span>
            </div>

            <div className="flex justify-between">
              <span>4:00 PM - AI Lab Preparation</span>
              <span className="text-gray-400">Pending</span>
            </div>

            <div className="flex justify-between">
              <span>5:30 PM - Linear Algebra Practice</span>
              <span className="text-gray-400">Pending</span>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <h3 className="text-xl font-semibold mb-4">Calendar</h3>
          <div className="card p-6">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
}
