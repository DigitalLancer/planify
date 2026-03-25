"use client"

import type { Event } from "@/types/event"
import EventsTable from "@/components/eventslist/EventsTable"
import StatCard from "@/components/eventslist/StatCard"
import EventsListHeader from "@/components/eventslist/EventListHader"
import { useEvents } from "@/hooks/useEvents"
import ArchiveEventList from "@/components/eventslist/ArchiveEventList"

export default function EventsListPage() {
  const today = new Date();
  const { data = [], isLoading, error } = useEvents()

  const upcoming = data.filter((x) => x.status === "upcoming").length
  const completed = data.filter((x) => x.status === "completed").length
  const cancelled = data.filter((x) => x.status === "cancelled").length

  if (isLoading) return <div>Yükleniyor...</div>
  if (error) return <div>Hata oluştu!</div>

  const activeEvents = data.filter(
    (event) => new Date(event.startDate) >= today
  );

  const pastEvents = data.filter(
    (event) => new Date(event.startDate) < today
  );

  return (
    <div className="min-h-screen bg-[#fdfbf7] p-6 font-serif">
      <EventsListHeader />

      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
        <StatCard title="Total" value={data.length} color="bg-blue-100/70" rotate="-rotate-1" />
        <StatCard title="Upcoming" value={activeEvents.length} color="bg-emerald-100/70" rotate="rotate-2" />
        <StatCard title="Completed" value={pastEvents.length} color="bg-purple-100/70" rotate="-rotate-2" />
        <StatCard title="Cancelled" value={cancelled} color="bg-rose-100/70" rotate="rotate-1" />
      </div>

      <div className="mt-10 wobbly-journal bg-white shadow-sm overflow-hidden border border-slate-100">
        <details className="group" open>
          {/* Başlık Alanı (Tıklanabilir kısım) */}
          <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-slate-50 transition-all">
            <div className="flex items-center gap-3">
              {/* Küçük bir takvim ikonu veya nokta ekleyerek görseli zenginleştirebilirsin */}
              <span className="text-sm font-bold text-slate-800 uppercase tracking-widest">
                Upcoming Events
              </span>
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-full">
                {activeEvents?.length || 0}
              </span>
            </div>

            {/* Dönüş Animasyonlu Chevron İkonu */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-slate-400 transition-transform duration-300 group-open:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>

          {/* İçerik Alanı (Table) */}
          <div className="px-6 pb-6 transition-all duration-300 ease-in-out">
            <div className="border-t border-slate-50">
              <EventsTable data={activeEvents} />
            </div>
          </div>
        </details>
      </div>


      <div className="mt-10 wobbly-journal bg-white shadow-sm overflow-hidden border border-slate-100">
        <details className="group">
          {/* Başlık Alanı (Tıklanabilir kısım) */}
          <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-slate-50 transition-all">
            <div className="flex items-center gap-3">
              {/* Küçük bir takvim ikonu veya nokta ekleyerek görseli zenginleştirebilirsin */}
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                Past Events
              </span>
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-gray-100 text-slate-700 rounded-full">
                {pastEvents?.length || 0}
              </span>
            </div>

            {/* Dönüş Animasyonlu Chevron İkonu */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-slate-400 transition-transform duration-300 group-open:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>

          {/* İçerik Alanı (Table) */}
          <div className="px-6 pb-6 transition-all duration-300 ease-in-out">
            <div className="border-t border-slate-50">
              <ArchiveEventList data={pastEvents} />
            </div>
          </div>
        </details>
      </div>
    </div>
  )
}