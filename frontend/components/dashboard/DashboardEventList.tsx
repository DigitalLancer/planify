'use client'
import type { EventItem } from '@/types/event'
import DashboardEventListItem from './DashboardEventListItem'
import { useState, useEffect } from 'react'


function DashboardEventList() {
    const [events, setEvents] = useState<EventItem[]>([])

    useEffect(() => {
        fetch('/mock/event.json')
            .then((r) => r.json())
            .then(setEvents)
    }, [])

    return (
        <div className='mt-3 flex flex-col gap-5 relative pl-4'>
            {/* Kenar Çizgisi (Notebook Margin Line) */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-200 opacity-50" />

            {events.map((event, index) => (
                <DashboardEventListItem data={event} key={event.id} index={index} />
            ))}
        </div>
    )
}

export default DashboardEventList