import type { Event } from '@/types/event'
import DashboardEventListItem from './DashboardEventListItem'

export default  function DashboardEventList({ events }: { events: Event[] }) {
    const today = new Date();
    const sortedEvents = events.sort((a, b) => {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    })
    const startIndex = sortedEvents.findIndex(
        e => new Date(e.startDate) > today
    )
    const firsFiveEvent = events.slice(startIndex,startIndex+6);

    return (
        <div className='mt-3 flex flex-col gap-5 relative pl-4'>
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-200 opacity-50" />
            {firsFiveEvent.map((event, index) => (
                <DashboardEventListItem data={event} key={event.id} index={index} />
            ))}
        </div>
    )
}

