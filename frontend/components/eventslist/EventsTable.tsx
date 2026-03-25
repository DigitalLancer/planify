"use client"
import { useMemo, useState, useEffect } from "react";
import type { Event, Status } from '@/types/event'
import { useDeleteEvent } from "@/hooks/useEvents";
import { formatDate, formatTime } from "@/lib/date";
import { useModal } from "@/context/ModalContext";
import Link from "next/link";
type EventTableProp = {
    data: Event[];
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

        default:
            return {
                label: status || "Unknown",
                badge: "bg-gray-50 text-gray-700 ring-1 ring-gray-200",
                dot: "bg-gray-500",
            };
    }
}

export default function EventsTable(data: EventTableProp) {

    const { mutate, isPending } = useDeleteEvent();
    const { openModal } = useModal()

    const events = data.data;
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState<Status | "all">("all");
    const [sort, setSort] = useState<"dateAsc" | "dateDesc">("dateAsc");

    const rows = useMemo(() => {
        let r = [...events];

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
    }, [events, query, status, sort]);

    const stat = useMemo(() => {
        const upcoming = events.filter((x) => x.status === "upcoming").length;
        const completed = events.filter((x) => x.status === "completed").length;
        const cancelled = events.filter((x) => x.status === "cancelled").length;
        return { upcoming, completed, cancelled, total: events.length };
    }, [events]);

    return (
        <>
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

            <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                <div className="overflow-x-auto">
                    <table className="min-w-230 w-full">
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
                                    <tr key={e.id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="min-w-0">
                                                    <div className="truncate font-semibold text-slate-800">{e.title}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-800">
                                            {formatDate(new Date(e.startDate), "short")}
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
                                            <div className="flex justify-end gap-2 opacity-100">
                                                <Link href={`/eventdetail/${e.id}`}
                                                    className="rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200
                                     hover:bg-slate-100 cursor-pointer"
                                                >
                                                    View
                                                </Link>
                                                <button onClick={() => openModal("updateEvent",e.id)}
                                                    className="rounded-2xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white
                                     hover:bg-indigo-700 cursor-pointer"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="rounded-2xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 ring-1 ring-rose-200
                                     hover:bg-rose-100 cursor-pointer" onClick={() => mutate(e.id)}
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
                                            <button onClick={() => openModal("createEvent")} className="mt-4 rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 cursor-pointer">
                                                + Add Event
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-100 bg-white px-5 py-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2 ">
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
        </>
    );
}

