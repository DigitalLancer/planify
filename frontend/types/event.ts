export interface Event {
  id: number
  title: string
  description?: string
  startDate: string
  endDate?: string
  location?: string
  status: Status
  category?: Category
}
export type Status="upcoming" | "completed" | "cancelled";
export type Category =
  | "work"
  | "social"
  | "exercise"
  | "education"
  | "entertainment"
  | "community"
  | "other"


export const categories: Category[] = [
  "work",
  "social",
  "exercise",
  "education",
  "entertainment",
  "community",
  "other",
];