'use client'

import React from 'react'
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

    const eventList: EventItem[] = [
        { id: 1, title: "Piknik", startDate: "10.03.2026", status: "upcoming" },
        { id: 2, title: "Arkadaşlarla Kahve", startDate: "12.03.2026", status: "upcoming" },
        { id: 3, title: "Dans Workshop", startDate: "20.03.2026", status: "upcoming" }
    ]

    return (
        <div className='mt-3 flex flex-col gap-4 overflow-hidden'>
            {events.map(event => (
                <DashboardEventListItem data={event} key={event.id} />
            ))}
        </div>
    )
}

export default DashboardEventList