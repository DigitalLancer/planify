"use client";

import { useMemo, useState } from "react";

type Status = "upcoming" | "completed" | "cancelled";

type EventRow = {
  id: number;
  title: string;
  startDate: string; // ISO
  endDate?: string; // ISO
  location?: string;
  status: Status;
  colorKey?: "red" | "amber" | "green" | "pink"; // dashboard’daki renkli kart hissi
};

const MOCK: EventRow[] = [
  {
    id: 1,
    title: "Kış Kampı",
    startDate: "2026-01-15T14:00:00",
    location: "Belgrad Ormanı",
    status: "upcoming",
    colorKey: "red",
  },
  {
    id: 2,
    title: "Akşam Kahve Buluşması",
    startDate: "2026-02-10T19:00:00",
    location: "Kadıköy",
    status: "upcoming",
    colorKey: "amber",
  },
  {
    id: 3,
    title: "Hafta Sonu Pikniği",
    startDate: "2026-03-04T11:00:00",
    location: "Emirgan Korusu",
    status: "upcoming",
    colorKey: "green",
  },
  {
    id: 4,
    title: "Doğa Yürüyüşü",
    startDate: "2026-03-05T09:00:00",
    location: "Polonezköy",
    status: "upcoming",
    colorKey: "pink",
  },
  {
    id: 5,
    title: "Proje Sunumu",
    startDate: "2026-02-20T10:30:00",
    location: "Online",
    status: "completed",
    colorKey: "green",
  },
  {
    id: 6,
    title: "Doktor Randevusu",
    startDate: "2026-02-22T16:00:00",
    location: "Şişli",
    status: "cancelled",
    colorKey: "red",
  },
];

function formatDateTR(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" });
}
function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}

function statusMeta(status: Status) {
  switch (status) {
    case "upcoming":
      return {
        label: "Upcoming",
        badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
        dot: "bg-emerald-500",
      };
    case "completed":
      return {
        label: "Completed",
        badge: "bg-slate-50 text-slate-700 ring-1 ring-slate-200",
        dot: "bg-slate-500",
      };
    case "cancelled":
      return {
        label: "Cancelled",
        badge: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
        dot: "bg-rose-500",
      };
  }
}

function colorStripe(colorKey: EventRow["colorKey"]) {
  // dashboard’daki renkli kartların “soldan sağa akış” hissi için minik accent
  switch (colorKey) {
    case "red":
      return "from-rose-500 to-red-400";
    case "amber":
      return "from-amber-400 to-orange-400";
    case "green":
      return "from-emerald-500 to-teal-400";
    case "pink":
      return "from-pink-500 to-rose-400";
    default:
      return "from-indigo-500 to-fuchsia-500";
  }
}

export default function EventsTablePage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status | "all">("all");
  const [sort, setSort] = useState<"dateAsc" | "dateDesc">("dateAsc");

  const rows = useMemo(() => {
    let r = [...MOCK];

    if (query.trim()) {
      const q = query.toLowerCase();
      r = r.filter((x) => {
        return (
          x.title.toLowerCase().includes(q) ||
          (x.location ?? "").toLowerCase().includes(q)
        );
      });
    }

    if (status !== "all") r = r.filter((x) => x.status === status);

    r.sort((a, b) => {
      const da = new Date(a.startDate).getTime();
      const db = new Date(b.startDate).getTime();
      return sort === "dateAsc" ? da - db : db - da;
    });

    return r;
  }, [query, status, sort]);

  const stat = useMemo(() => {
    const upcoming = MOCK.filter((x) => x.status === "upcoming").length;
    const completed = MOCK.filter((x) => x.status === "completed").length;
    const cancelled = MOCK.filter((x) => x.status === "cancelled").length;
    return { upcoming, completed, cancelled, total: MOCK.length };
  }, []);

  return (
    <div className="min-h-[calc(100vh-24px)] p-2">
      {/* Page header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Events List</h1>
          <p className="mt-1 text-sm text-slate-600">
            Etkinlikleri ara, filtrele, düzenle — dashboard tasarımına uyumlu modern tablo.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm
                       hover:bg-indigo-700 active:translate-y-[1px]"
          >
            + Add Event
          </button>
          <button
            className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200
                       hover:bg-slate-50 active:translate-y-[1px]"
          >
            Export
          </button>
        </div>
      </div>

      {/* Quick stats (dashboard'daki kart hissi) */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard title="Total" value={stat.total} accent="from-indigo-500 to-fuchsia-500" />
        <StatCard title="Upcoming" value={stat.upcoming} accent="from-emerald-500 to-teal-400" />
        <StatCard title="Completed" value={stat.completed} accent="from-slate-500 to-slate-400" />
        <StatCard title="Cancelled" value={stat.cancelled} accent="from-rose-500 to-red-400" />
      </div>

      {/* Controls */}
      <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative w-full md:max-w-md">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title or location..."
                className="w-full rounded-2xl bg-slate-50 px-4 py-2.5 text-sm text-slate-900
                           ring-1 ring-slate-200 placeholder:text-slate-400
                           focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="rounded-2xl bg-white px-3 py-2.5 text-sm text-slate-800 ring-1 ring-slate-200
                         focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="rounded-2xl bg-white px-3 py-2.5 text-sm text-slate-800 ring-1 ring-slate-200
                         focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="dateAsc">Date ↑</option>
              <option value="dateDesc">Date ↓</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="hidden md:inline">Showing</span>
            <span className="rounded-xl bg-slate-50 px-2 py-1 text-slate-700 ring-1 ring-slate-200">
              {rows.length}
            </span>
            <span>events</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="overflow-x-auto">
          <table className="min-w-[920px] w-full">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-5 py-4">Event</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Time</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {rows.map((e) => {
                const s = statusMeta(e.status);
                return (
                  <tr key={e.id} className="group hover:bg-slate-50/60">
                    {/* Event cell */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="min-w-0">
                          <div className="truncate font-semibold text-slate-900">{e.title}</div>
                          <div className="mt-0.5 text-xs text-slate-500">#{String(e.id).padStart(4, "0")}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-800">
                      {formatDateTR(e.startDate)}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-1.5 ring-1 ring-slate-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-500" />
                        {formatTime(e.startDate)}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {e.location ?? <span className="text-slate-400">—</span>}
                    </td>

                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${s.badge}`}>
                        <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                        {s.label}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
                        <button
                          className="rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200
                                     hover:bg-slate-50"
                        >
                          View
                        </button>
                        <button
                          className="rounded-2xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white
                                     hover:bg-indigo-700"
                        >
                          Edit
                        </button>
                        <button
                          className="rounded-2xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 ring-1 ring-rose-200
                                     hover:bg-rose-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <div className="mx-auto max-w-md">
                      <div className="text-base font-semibold text-slate-900">No events found</div>
                      <div className="mt-1 text-sm text-slate-600">
                        Arama/filtreleri gevşet veya yeni etkinlik ekle.
                      </div>
                      <button className="mt-4 rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                        + Add Event
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-slate-100 bg-white px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-slate-600">
            Tip: Row hover’da actions görünür (desktop). Mobile’da her zaman görünür.
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50">
              Prev
            </button>
            <button className="rounded-2xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
              1
            </button>
            <button className="rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50">
              2
            </button>
            <button className="rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard(props: { title: string; value: number; accent: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-700">{props.title}</div>
          <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{props.value}</div>
        </div>
        <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${props.accent} shadow-sm`} />
      </div>
    </div>
  );
}