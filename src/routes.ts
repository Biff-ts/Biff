import DashboardPage from "./pages/dashboard.tsx"
import LoginPage from "./pages/login.tsx"

export const routes = [
  {
    path: "/dashboard",
    page: DashboardPage,
    method: "GET",
    ssr: true
  },
  {
    path: "/login",
    page: LoginPage,
    method: "GET",
    ssr: true
  }
]
