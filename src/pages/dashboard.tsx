import React from "react"

export default function DashboardPage({ user }: { user: { id: string; name: string } }) {
  return <h1>Welcome, {user.name}</h1>
}
