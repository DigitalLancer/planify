export function getCurrentWeekDays() {
  const today = new Date()
  const day = today.getDay()

  const diffToMonday = day === 0 ? -6 : 1 - day

  const monday = new Date(today)
  monday.setDate(today.getDate() + diffToMonday)

  const week = []

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    week.push(d)
  }

  return week
}

export function formatDate(d: Date) {
    return d.toLocaleDateString("en-EN", { day: "numeric", month: "long" })
}