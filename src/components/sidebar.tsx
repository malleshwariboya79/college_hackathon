"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Study Plan", path: "/dashboard" },
  { name: "Courses", path: "/dashboard/cources" },
  { name: "Assignments", path: "/dashboard/assignments" },
  { name: "Analytics", path: "/dashboard/analytics" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 app-sidebar p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold mb-8">Academic Planner</h1>
        <nav className="space-y-3">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <div
                className={`sidebar-link ${
                  pathname === item.path ? 'active' : 'muted'
                }`}
              >
                {item.name}
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Simple Heatmap */}
      <div>
        <h3 className="text-sm mb-2">Workload Heatmap</h3>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-green-400 rounded-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
