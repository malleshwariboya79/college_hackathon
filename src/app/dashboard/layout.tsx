import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import FreeSlots from "@/components/FreeSlots";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col app-bg">
        <Navbar />

        <div className="flex-1 p-6 overflow-hidden">
          <div className="max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            <main className="min-h-0 overflow-y-auto">
              {children}
            </main>

            <aside className="hidden lg:block">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold mb-2">Alerts</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Assignment due in 2 days</li>
                  <li>Project meeting at 4:00 PM</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold mb-2">Free Time Slots (Today)</h4>
                <FreeSlots />
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold mb-2">Study Suggestions</h4>
                <ol className="list-decimal list-inside text-sm text-gray-700">
                  <li>Start with hardest topic for 45 mins</li>
                  <li>Short 10 min breaks every hour</li>
                  <li>Practice past questions weekly</li>
                </ol>
              </div>
            </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
