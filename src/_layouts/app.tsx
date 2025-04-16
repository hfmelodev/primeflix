import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 antialiased">
      <h1 className="h-16">Header App</h1>

      <div className="flex flex-col flex-1 container mx-auto p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}
