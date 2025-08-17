import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// import { ThemeProvider } from '@/components/providers/theme-provider'
import { SessionProvider } from '@/components/providers/session-provider'
import { Toaster } from '@/components/ui/toaster'
import LayoutShell from '@/components/layout/layout-shell'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TechBlog - Q&A Coding Community',
  description: 'A community-driven Q&A platform for developers to ask questions, share knowledge, and learn together.',
  keywords: ['coding', 'programming', 'questions', 'answers', 'community', 'developers'],
  authors: [{ name: 'TechBlog Team' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'TechBlog - Q&A Coding Community',
    description: 'A community-driven Q&A platform for developers',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`light ${inter.className}`}>
        <SessionProvider>
          {/* Use client LayoutShell for conditional header/footer */}
          <LayoutShell>
            {children}
          </LayoutShell>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}
