import DashboardPage from "./pages/dashboard.tsx"

export const routes = [
  {
    path: "/dashboard",
    page: DashboardPage,
    method: "GET",
    ssr: true
  },
  {
    path: "/login",
    page: null,
    method: "GET",
    ssr: false
  }
]
