export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-background">
      {/* Admin pages don't need header/footer */}
      {children}
    </div>
  )
}
