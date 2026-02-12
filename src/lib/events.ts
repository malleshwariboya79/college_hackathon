const STORAGE_KEY = "ap_events_v1";

export type EventItem = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  start: string; // HH:MM
  end: string; // HH:MM
};

function readAll(): EventItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as EventItem[];
  } catch {
    return [];
  }
}

function writeAll(items: EventItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getEventsForMonth(date: Date): Map<string, EventItem[]> {
  const all = readAll();
  const map = new Map<string, EventItem[]>();
  const year = date.getFullYear();
  const month = date.getMonth();
  all.forEach((ev) => {
    const d = new Date(ev.date + "T00:00:00");
    if (d.getFullYear() === year && d.getMonth() === month) {
      const list = map.get(ev.date) || [];
      list.push(ev);
      map.set(ev.date, list.sort((a, b) => a.start.localeCompare(b.start)));
    }
  });
  return map;
}

export function getEventsForDate(iso: string): EventItem[] {
  const all = readAll();
  return all.filter((e) => e.date === iso).sort((a, b) => a.start.localeCompare(b.start));
}

export function saveEvent(ev: EventItem) {
  const all = readAll();
  all.push(ev);
  writeAll(all);
}

export function removeEvent(id: string) {
  const all = readAll();
  const next = all.filter((e) => e.id !== id);
  writeAll(next);
}

// Compute free slots between 08:00 and 22:00 in 30-min increments
export function computeFreeSlotsForDate(iso: string) {
  const events = getEventsForDate(iso);
  const startBase = toMinutes("08:00");
  const endBase = toMinutes("22:00");

  const occupied = events
    .map((e) => [toMinutes(e.start), toMinutes(e.end)] as [number, number])
    .sort((a, b) => a[0] - b[0]);

  const free: Array<{ start: string; end: string }> = [];
  let cursor = startBase;

  for (const [s, e] of occupied) {
    if (e <= cursor) continue;
    if (s > cursor) {
      free.push({ start: minutesToHHMM(cursor), end: minutesToHHMM(Math.min(s, endBase)) });
    }
    cursor = Math.max(cursor, e);
  }

  if (cursor < endBase) free.push({ start: minutesToHHMM(cursor), end: minutesToHHMM(endBase) });

  return free;
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map((n) => parseInt(n, 10));
  return h * 60 + m;
}

function minutesToHHMM(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
