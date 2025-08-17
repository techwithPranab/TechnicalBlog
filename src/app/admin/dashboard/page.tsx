"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  MessageSquare, 
  HelpCircle, 
  Tag, 
  Mail, 
  FileText,
  BarChart3,
  LogOut,
  Shield,
  Activity,
  TrendingUp
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface AdminData {
  username: string
  email: string
  role: string
  permissions: string[]
  lastLogin?: string
}

interface DashboardStats {
  totalUsers: number
  totalQuestions: number
  totalFeedback: number
  totalFAQs: number
  totalContacts: number
  totalArticles: number
}

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState<AdminData | null>(null)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    checkAuth()
    fetchDashboardStats()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    const userData = localStorage.getItem('adminData')
    
    if (!token || !userData) {
      router.push('/admin/login')
      return
    }

    try {
      const admin = JSON.parse(userData)
      setAdminData(admin)
    } catch (error) {
      console.error('Error parsing admin data:', error)
      router.push('/admin/login')
    }
  }

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard-stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      } else {
        console.error('Error fetching stats: API response not ok')
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push('/admin/login')
  }

  const navigationItems = [
    {
      title: 'Users Management',
      description: 'Manage user accounts and permissions',
      icon: Users,
      href: '/admin/users',
      permission: 'manage_users',
      count: stats?.totalUsers
    },
    {
      title: 'Questions & Answers',
      description: 'Moderate questions and answers',
      icon: MessageSquare,
      href: '/admin/questions',
      permission: 'manage_questions',
      count: stats?.totalQuestions
    },
    {
      title: 'Feedback Management',
      description: 'Review and respond to user feedback',
      icon: Mail,
      href: '/admin/feedback',
      permission: 'manage_feedback',
      count: stats?.totalFeedback
    },
    {
      title: 'FAQ Management',
      description: 'Create and manage frequently asked questions',
      icon: HelpCircle,
      href: '/admin/faq',
      permission: 'manage_faq',
      count: stats?.totalFAQs
    },
    {
      title: 'Contact Messages',
      description: 'Review and respond to contact inquiries',
      icon: Mail,
      href: '/admin/contact',
      permission: 'manage_contacts',
      count: stats?.totalContacts
    },
    {
      title: 'Articles Management',
      description: 'Manage help center articles',
      icon: FileText,
      href: '/admin/articles',
      permission: 'manage_articles',
      count: stats?.totalArticles
    },
    {
      title: 'Tags Management',
      description: 'Organize and manage question tags',
      icon: Tag,
      href: '/admin/tags',
      permission: 'manage_tags'
    },
    {
      title: 'Analytics',
      description: 'View platform statistics and insights',
      icon: BarChart3,
      href: '/admin/analytics',
      permission: 'view_analytics'
    }
  ]

  const hasPermission = (permission: string) => {
    return adminData?.permissions.includes(permission) || adminData?.role === 'super_admin'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">TechBlog Administration Panel</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">{adminData?.username}</p>
                <Badge variant={adminData?.role === 'super_admin' ? 'default' : 'secondary'}>
                  {adminData?.role}
                </Badge>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Welcome back, {adminData?.username}!</h2>
                <p className="text-muted-foreground">
                  Last login: {adminData?.lastLogin ? new Date(adminData.lastLogin).toLocaleString() : 'First time login'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{stats?.totalUsers || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 p-3">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Questions</p>
                  <p className="text-2xl font-bold">{stats?.totalQuestions || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-orange-100 p-3">
                  <Mail className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Feedback</p>
                  <p className="text-2xl font-bold">{stats?.totalFeedback || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-purple-100 p-3">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Today</p>
                  <p className="text-2xl font-bold">247</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationItems.map((item) => {
            if (!hasPermission(item.permission)) return null
            
            const Icon = item.icon
            
            return (
              <Card key={item.href} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        {item.count !== undefined && (
                          <Badge variant="secondary" className="mt-1">
                            {item.count} items
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => router.push(item.href)}
                  >
                    Manage
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
