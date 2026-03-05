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

    return (
        <div className='mt-3 flex flex-col gap-4 overflow-hidden'>
            {events.map((event,index) => (
                <DashboardEventListItem data={event} key={event.id} index={index}/>
            ))}
        </div>
    )
}

export default DashboardEventList