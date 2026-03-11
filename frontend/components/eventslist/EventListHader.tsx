"use client"

import { useModal } from "@/context/ModalContext"

export default function EventsListHeader() {
  const { openModal } = useModal()

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b-2 border-dashed border-slate-200 pb-8">
      <div>
        <h1 className="text-4xl font-handwriting text-slate-900 tracking-tight">
          Events List
          <span className="text-xl ml-2 opacity-30 font-mono">/ index.02</span>
        </h1>
        <p className="mt-2 text-sm font-mono italic text-slate-500 max-w-lg">
          "Every recorded plan is a promise to your future self."
          <br />
          Search, filter, and curate your journey.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={openModal}
          className="wobbly-journal shadow bg-indigo-500/90 px-6 py-2 text-lg font-handwriting text-white 
                     hover:scale-105 transition-all rotate-1 hover:rotate-0 active:scale-95 cursor-pointer"
        >
          + Add New Event
        </button>

        <button
          className="wobbly-journal bg-white px-6 py-2 text-lg font-handwriting shadow text-slate-700
                     hover:bg-slate-50 transition-all -rotate-1 hover:rotate-0 active:scale-95 cursor-pointer"
        >
          Export Table
        </button>
      </div>
    </div>
  )
}