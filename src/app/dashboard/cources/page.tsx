"use client";
import { useState, useEffect } from "react";
import CourseChat from "@/components/CourseChat";

type Course = { id: string; name: string; instructor: string; credits: number; color: string };

const colors = ["bg-gradient-to-br from-blue-400 to-blue-600", "bg-gradient-to-br from-purple-400 to-purple-600", "bg-gradient-to-br from-pink-400 to-pink-600", "bg-gradient-to-br from-green-400 to-green-600", "bg-gradient-to-br from-yellow-400 to-yellow-600", "bg-gradient-to-br from-indigo-400 to-indigo-600"];
const STORAGE_KEY = "ap_courses_v1";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [name, setName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [credits, setCredits] = useState(3);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMount = true;
    const loadCourses = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          return JSON.parse(raw);
        } else {
          // Default courses
          const defaults: Course[] = [
            { id: "1", name: "Data Structures & Algorithms", instructor: "Dr. Smith", credits: 4, color: colors[0] },
            { id: "2", name: "Artificial Intelligence", instructor: "Dr. Johnson", credits: 3, color: colors[1] },
          ];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
          return defaults;
        }
      } catch (e) {
        console.error(e);
        return [];
      }
    };
    if (isMount) {
      setCourses(loadCourses());
    }
    return () => { isMount = false; };
  }, []);

  function addCourse() {
    if (!name.trim() || !instructor.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError(null);
    const color = colors[courses.length % colors.length];
    const course: Course = { id: String(Date.now()), name: name.trim(), instructor: instructor.trim(), credits, color };
    const next = [...courses, course];
    setCourses(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setName("");
    setInstructor("");
    setCredits(3);
    setShowForm(false);
  }

  function removeCourse(id: string) {
    const next = courses.filter((c) => c.id !== id);
    setCourses(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    if (selectedCourse?.id === id) setSelectedCourse(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">My Courses</h2>
        <button className="btn-primary px-4 py-2 rounded-lg" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Course"}
        </button>
      </div>

      {/* Add Course Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <h3 className="text-xl font-semibold mb-4">Add New Course</h3>
          {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
          <div className="grid grid-cols-1 gap-3">
            <input type="text" placeholder="Course Name" value={name} onChange={(e) => setName(e.target.value)} className="p-3 border rounded-lg" />
            <input type="text" placeholder="Instructor Name" value={instructor} onChange={(e) => setInstructor(e.target.value)} className="p-3 border rounded-lg" />
            <div className="flex gap-3">
              <input type="number" min={1} max={6} placeholder="Credits" value={credits} onChange={(e) => setCredits(Number(e.target.value))} className="p-3 border rounded-lg w-24" />
              <button className="btn-primary px-4 py-2 rounded-lg" onClick={addCourse}>Add Course</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Courses List */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-lg font-semibold">Available Courses ({courses.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <div key={course.id} className={`${course.color} text-white rounded-xl shadow-lg p-5 cursor-pointer hover:shadow-xl transition-shadow`} onClick={() => setSelectedCourse(course)}>
                <h4 className="font-bold text-lg mb-2">{course.name}</h4>
                <p className="text-sm opacity-90">Instructor: {course.instructor}</p>
                <p className="text-sm opacity-90">Credits: {course.credits}</p>
                <div className="flex gap-2 mt-4">
                  <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-lg text-sm" onClick={(e) => { e.stopPropagation(); setSelectedCourse(course); }}>
                    Study Plan
                  </button>
                  <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-lg text-sm" onClick={(e) => { e.stopPropagation(); removeCourse(course.id); }}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Assistant */}
        <div className="lg:col-span-1">
          {selectedCourse ? (
            <div className="bg-white rounded-xl shadow-lg p-4 h-full flex flex-col">
              <h3 className="text-lg font-semibold mb-2">Study Assistant</h3>
              <div className={`${selectedCourse.color} text-white p-3 rounded-lg mb-3`}>
                <p className="font-semibold">{selectedCourse.name}</p>
                <p className="text-sm opacity-90">{selectedCourse.instructor}</p>
              </div>
              <CourseChat course={selectedCourse} />
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg p-6 text-center">
              <p className="text-gray-500">Select a course to start planning your study.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
