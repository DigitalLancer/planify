"use client"

import { CalendarDays, CheckCircle2, Clock3, Sparkles, MapPin } from "lucide-react";
import DashboardCalendar from "@/components/dashboard/DashboardCalendar";
import DashboardEventList from "@/components/dashboard/DashboardEventList";
import DashboardHero from "@/components/dashboard/DahsboardHero";
import StatCard from "@/components/dashboard/StatCard";
import Link from "next/link";
import { getTodayEvents, getThisWeeksEvents } from "@/lib/event";
import { useEvents } from "@/hooks/useEvents";
import DashboardWeatherForecast from "@/components/dashboard/DashboardWeatherForecast";
import { useMe, useUserById } from "@/hooks/useUser";


const wobblyBorder = "rounded-[255px_15px_225px_15px/15px_225px_15px_255px]";

export default function DashboardPage() {
  const { data = [], isLoading, error } = useEvents()


  if (isLoading) return <div>Yükleniyor...</div>
  if (error) return <div>Hata oluştu!</div>

  const todayCount = getTodayEvents(data).length
  const weekCount = getThisWeeksEvents(data).length

  return (
    <div className="min-h-screen bg-[#fdfbf7] md:p-4 font-serif text-slate-800 selection:bg-yellow-200">
      <div className="mx-auto relative">
        <div className="flex flex-col gap-8">
          <div className="relative group">
            <DashboardHero />
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-24 h-8 bg-blue-400/30 -rotate-2 backdrop-blur-sm border-x border-blue-500/20 shadow-sm" />
          </div>

          {/* İstatistik Kartları */}
          <section className="grid grid-cols-2 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Today"
              value={todayCount}
              subtitle="events scheduled"
              icon={<Clock3 className="h-5 w-5" />}
              bgcolor="bg-sky-100/70"
              rotate="-rotate-1"
            />
            <StatCard
              title="This Week"
              value={weekCount}
              subtitle="planned activities"
              icon={<CalendarDays className="h-5 w-5" />}
              bgcolor="bg-purple-100/70"
              rotate="rotate-1"
            />
            <StatCard
              title="Total"
              value={data.length}
              subtitle="future events"
              icon={<Sparkles className="h-5 w-5" />}
              bgcolor="bg-orange-100/70"
              rotate="-rotate-1"
            />
            <StatCard
              title="Completed"
              value="18"
              subtitle="done this month"
              icon={<CheckCircle2 className="h-5 w-5" />}
              bgcolor="bg-emerald-100/70"
              rotate="rotate-2"
            />
          </section>

          {/* Main Content */}
          <section className="grid grid-cols-1 gap-8 xl:grid-cols-12">
            <div className="xl:col-span-7">
              <JournalCard>
                <SectionHeader
                  title="Upcoming Events"
                  description="Your next plans at a glance"
                  actionLabel="View all"
                />
                <div className="mt-5">
                  <DashboardEventList events={data} />
                </div>
              </JournalCard>

              <JournalCard className="mt-8">
                <SectionHeader
                  title="Weather Forecast"
                  description="Don't get weather suprises!"
                />
                <h2 className="opacity-80 text-sm flex gap-1 my-3"><span><MapPin size={16}/></span> Istanbul, Turkey</h2>
                <DashboardWeatherForecast></DashboardWeatherForecast>
              </JournalCard>

            </div>

            <div className="xl:col-span-5 flex flex-col gap-8">
              <JournalCard>
                <SectionHeader
                  title="Quick Actions"
                  description="Shortcuts for faster planning"
                />
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <QuickActionButton label="Add Event" color="bg-yellow-100" />
                  <QuickActionButton label="Plan Weekend" color="bg-pink-100" />
                  <QuickActionButton label="Invite Friends" color="bg-blue-100" />
                  <QuickActionButton label="Create Reminder" color="bg-green-100" />
                </div>
              </JournalCard>

              <JournalCard>
                <SectionHeader
                  title="Calendar"
                  description="Pick a day"
                />
                <div className="mt-5 flex justify-center">
                  <DashboardCalendar />
                </div>
              </JournalCard>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function JournalCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`
      bg-white border-2 border-slate-900/10 p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,0.05)]
      ${wobblyBorder} ${className}
    `}>
      {children}
    </div>
  );
}

function SectionHeader({ title, description, actionLabel }: any) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-dashed border-slate-200 pb-4">
      <div>
        <h2 className="text-2xl font-handwriting text-slate-900 leading-none">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm font-mono opacity-60 italic">{description}</p>
        )}
      </div>
      {actionLabel && (
        <Link href={"/eventlist"} className="font-handwriting text-blue-600 hover:underline decoration-wavy">
          {actionLabel}
        </Link>
      )
      }
    </div >
  );
}

function QuickActionButton({ label, color }: { label: string; color: string }) {
  return (
    <button className={`
      ${color} ${wobblyBorder} 
      p-4 text-center font-handwriting text-lg border-b-2 border-r-2 border-black/10 
      hover:brightness-95 active:translate-y-1 transition-all
    `}>
      {label}
    </button>
  );
}