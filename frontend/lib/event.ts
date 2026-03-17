import { EventItem } from "@/types/event";

export function getThisWeeksEvents(events: EventItem[]) {
    const now = new Date();

    const start = new Date(now);
    const day = now.getDay();
    const diff = day === 0 ? -6 : 1 - day;

    start.setDate(now.getDate() + diff);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);

    return events.filter(e => {
        const d = new Date(e.startDate);
        return d >= start && d <= end;
    });
}

export function getTodayEvents(events: EventItem[]) {
    const now = new Date();

    return events.filter(event => {
        const d = new Date(event.startDate);
        const today = new Date();
        return d.toDateString() === today.toDateString();
    });

}