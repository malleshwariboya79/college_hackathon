"use client";
import { useEffect, useState } from "react";
import { computeFreeSlotsForDate } from "../lib/events";

export default function FreeSlots() {
  const [slots, setSlots] = useState<Array<{ start: string; end: string }>>([]);

  useEffect(() => {
    const update = () => {
      const today = new Date().toISOString().slice(0, 10);
      setSlots(computeFreeSlotsForDate(today));
    };

    update();
    window.addEventListener("eventsUpdated", update as EventListener);
    return () => window.removeEventListener("eventsUpdated", update as EventListener);
  }, []);

  if (!slots.length) return <div className="text-sm text-gray-700">No free slots — you are free all day.</div>;

  return (
    <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
      {slots.map((s, i) => (
        <div key={i} className="p-2 bg-green-50 rounded">{s.start} - {s.end}</div>
      ))}
    </div>
  );
}
