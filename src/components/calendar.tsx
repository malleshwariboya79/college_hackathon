"use client";
import { useEffect, useMemo, useState } from "react";
import { getEventsForMonth, saveEvent, removeEvent, EventItem } from "../lib/events";

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

export default function Calendar() {
  const [current, setCurrent] = useState(() => startOfMonth(new Date()));
  const [selected, setSelected] = useState<string | null>(null); // ISO date
  const [eventsMapTick, setEventsMapTick] = useState(0);
  // eventsMapTick is used to force recompute when events change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const eventsMap = useMemo(() => getEventsForMonth(current), [current, eventsMapTick]);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  useEffect(() => {
    function onUpdate() {
      setEventsMapTick((t) => t + 1);
    }

    window.addEventListener("eventsUpdated", onUpdate as EventListener);
    return () => window.removeEventListener("eventsUpdated", onUpdate as EventListener);
  }, []);

  const weeks = useMemo(() => {
    const start = new Date(current.getFullYear(), current.getMonth(), 1);
    const startDay = start.getDay();
    const daysInMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();

    const cells: Array<{ date: Date; iso: string }>[] = [];
    let week: Array<{ date: Date; iso: string }> = [];

    // fill previous empty cells
    for (let i = 0; i < startDay; i++) {
      week.push({ date: new Date(0), iso: "" });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(current.getFullYear(), current.getMonth(), d);
      week.push({ date, iso: date.toISOString().slice(0, 10) });
      if (week.length === 7) {
        cells.push(week);
        week = [];
      }
    }

    if (week.length) {
      while (week.length < 7) week.push({ date: new Date(0), iso: "" });
      cells.push(week);
    }

    return cells;
  }, [current]);

  const openAdd = (iso: string) => {
    setSelected(iso);
    setTitle("");
    setStartTime("09:00");
    setEndTime("10:00");
  };

  const handleAdd = () => {
    if (!selected) return;
    const ev = {
      id: String(Date.now()) + Math.random().toString(36).slice(2, 8),
      title: title || "Study",
      date: selected,
      start: startTime,
      end: endTime,
    };
    saveEvent(ev);
    window.dispatchEvent(new Event("eventsUpdated"));
    setSelected(null);
  };

  const handleDelete = (id: string) => {
    removeEvent(id);
    window.dispatchEvent(new Event("eventsUpdated"));
  };

  return (
    <div className="calendar-card card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button aria-label="prev" className="px-3 py-1 rounded bg-gray-100 smooth-transition" onClick={() => setCurrent(addMonths(current, -1))}>{'<'}</button>
          <div className="text-lg font-semibold">{current.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
          <button aria-label="next" className="px-3 py-1 rounded bg-gray-100 smooth-transition" onClick={() => setCurrent(addMonths(current, 1))}>{'>'}</button>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-2 py-1 rounded text-sm border">Week</button>
          <button className="px-2 py-1 rounded text-sm bg-blue-50 border">Month</button>
          <button className="px-2 py-1 rounded text-sm border">Agenda</button>
        </div>
      </div>

      <div className="overflow-hidden rounded-md">
        <div className="grid grid-cols-7 gap-1 text-sm text-gray-600 mb-2 bg-transparent px-1">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
            <div key={d} className="text-center font-medium py-2">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weeks.flat().map((cell, idx) => {
            if (!cell.iso) return <div key={idx} className="min-h-[110px] p-3 bg-transparent rounded" />;
            const evs: EventItem[] = eventsMap.get(cell.iso) || [];
            return (
              <div key={cell.iso} className="min-h-[110px] p-3 bg-white rounded-lg border">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm text-gray-500">{cell.date.getDate()}</div>
                  <button className="text-xs text-blue-600" onClick={() => openAdd(cell.iso)}>Add</button>
                </div>

                <div className="space-y-2">
                  {evs.map((e) => (
                    <div key={e.id} className="inline-flex w-full items-center justify-between gap-2 bg-[rgba(59,130,246,0.08)] text-sm rounded px-2 py-1">
                      <div className="flex-1">
                        <div className="font-medium text-[13px] truncate">{e.title}</div>
                        <div className="text-gray-500 text-xs">{e.start} - {e.end}</div>
                      </div>
                      <button className="ml-2 text-red-500" onClick={() => handleDelete(e.id)}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-2">Add Event</h3>
            <input className="w-full mb-2 p-2 border rounded" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <div className="flex gap-2 mb-2">
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="flex-1 p-2 border rounded" />
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="flex-1 p-2 border rounded" />
            </div>
            <div className="flex justify-end gap-2">
              <button className="px-3 py-1" onClick={() => setSelected(null)}>Cancel</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={handleAdd}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
