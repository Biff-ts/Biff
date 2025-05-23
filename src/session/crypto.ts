let counter = 0

export function generateSessionId(): string {
  counter += 1
  const raw = "mock-session"
  const signature = "et" + counter.toString(36).padStart(6, "0")
  return `${raw}.${signature}`
}
