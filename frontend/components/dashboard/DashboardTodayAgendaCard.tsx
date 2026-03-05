"use client";

import React from "react";
import type { EventItem } from "@/types/event";
import { Clock, CalendarDays } from "lucide-react";

type Props = {
  events: EventItem[];
  title?: string;
  maxItems?: number;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatTimeHHMM(d: Date) {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function formatDayLabelTR(d: Date) {
  // ör: "Perşembe, 5 Mart"
  return d.toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function DashboardTodayAgendaCard({
  events,
  title = "Today",
  maxItems = 4,
}: Props) {
  const now = new Date();

  const todayEvents = React.useMemo(() => {
    return events
      .filter((e) => {
        const sd = new Date(e.startDate);
        return isSameDay(sd, now) && e.status !== "cancelled";
      })
      .sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));
  }, [events]);

  const upcomingCount = todayEvents.filter((e) => +new Date(e.startDate) >= +now).length;
  const pastCount = todayEvents.length - upcomingCount;

  const shown = todayEvents.slice(0, maxItems);

  return (
    <div className="h-full rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-5 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="mt-1 text-xs text-gray-500 flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            {formatDayLabelTR(now)}
          </p>
        </div>

        {/* Mini stats */}
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-gray-50 ring-1 ring-black/5 px-3 py-2">
            <p className="text-[10px] text-gray-500">Total</p>
            <p className="text-sm font-semibold text-gray-900">{todayEvents.length}</p>
          </div>
          <div className="rounded-xl bg-gray-50 ring-1 ring-black/5 px-3 py-2">
            <p className="text-[10px] text-gray-500">Upcoming</p>
            <p className="text-sm font-semibold text-gray-900">{upcomingCount}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 flex-1">
        {todayEvents.length === 0 ? (
          <div className="h-full rounded-2xl border border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-center p-6">
            <div className="w-12 h-12 rounded-2xl bg-white ring-1 ring-black/5 flex items-center justify-center">
              <Clock className="w-5 h-5 text-gray-700" />
            </div>
            <p className="mt-3 text-sm font-semibold text-gray-900">
              Bugün etkinlik yok
            </p>
            <p className="mt-1 text-xs text-gray-500 max-w-[26ch]">
              Yeni bir etkinlik ekleyip gününü planlayabilirsin.
            </p>
            <button
              type="button"
              className="mt-4 rounded-full bg-gray-900 text-white text-xs font-semibold px-4 py-2 hover:bg-gray-800 active:scale-[0.99] transition"
            >
              + Quick add
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {shown.map((e) => {
              const sd = new Date(e.startDate);
              const isPast = +sd < +now;

              return (
                <div
                  key={e.id}
                  className="group rounded-2xl bg-gray-50 ring-1 ring-black/5 px-4 py-3 flex items-center justify-between gap-3 hover:bg-gray-100 transition"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {e.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      {formatTimeHHMM(sd)}
                      {e.location ? (
                        <span className="truncate">• {e.location}</span>
                      ) : null}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span
                      className={[
                        "text-[11px] font-semibold px-2.5 py-1 rounded-full ring-1",
                        isPast
                          ? "bg-white text-gray-600 ring-black/5"
                          : "bg-white text-gray-900 ring-black/10",
                      ].join(" ")}
                    >
                      {isPast ? "Done" : "Next"}
                    </span>

                    <button
                      type="button"
                      className="opacity-0 group-hover:opacity-100 transition text-xs font-semibold text-gray-700 hover:text-gray-900"
                      title="Open"
                    >
                      Open →
                    </button>
                  </div>
                </div>
              );
            })}

            {todayEvents.length > maxItems ? (
              <button
                type="button"
                className="w-full rounded-2xl bg-white ring-1 ring-black/5 px-4 py-3 text-xs font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition"
              >
                View all today’s events ({todayEvents.length})
              </button>
            ) : null}

            {/* tiny footer */}
            <div className="pt-1 text-[11px] text-gray-500 flex justify-between">
              <span>Completed: {pastCount}</span>
              <span>Remaining: {upcomingCount}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}