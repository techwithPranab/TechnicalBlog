"use client"

import { usePathname } from "next/navigation"
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function LayoutShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')
  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Header />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
