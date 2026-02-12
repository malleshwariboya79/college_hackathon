export default function AssignmentsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Assignments</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">5 Courses</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">15 Assignments</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">92% Completion</h3>
        </div>
      </div>
    </div>
  );
}
