"use client"

import eventsJson from "@/public/mock/event.json"
import type { Event } from "@/types/event"
import EventsTable from "@/components/eventslist/EventsTable"
import StatCard from "@/components/eventslist/StatCard"
import EventsListHeader from "@/components/eventslist/EventListHader"
import { useEvents } from "@/hooks/useEvents"

export default function EventsListPage() {
  const { data = [], isLoading, error } = useEvents()
  const upcoming = data.filter((x) => x.status === "upcoming").length
  const completed = data.filter((x) => x.status === "completed").length
  const cancelled = data.filter((x) => x.status === "cancelled").length

  const events = eventsJson as Event[]
  if (isLoading) return <div>Yükleniyor...</div>
  if (error) return <div>Hata oluştu!</div>
  
  return (
    <div className="min-h-screen bg-[#fdfbf7] p-6 font-serif">
      <EventsListHeader />

      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
        <StatCard title="Total" value={data.length} color="bg-blue-100/70" rotate="-rotate-1" />
        <StatCard title="Upcoming" value={upcoming} color="bg-emerald-100/70" rotate="rotate-2" />
        <StatCard title="Completed" value={completed} color="bg-purple-100/70" rotate="-rotate-2" />
        <StatCard title="Cancelled" value={cancelled} color="bg-rose-100/70" rotate="rotate-1" />
      </div>

      <div className="mt-10 wobbly-journal bg-white p-6 shadow-sm min-h-[500px]">
        <EventsTable data={data} />
      </div>
    </div>
  )
}