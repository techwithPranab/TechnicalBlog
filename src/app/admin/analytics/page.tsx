"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  Users,
  MessageSquare,
  Eye,
  ThumbsUp,
  Calendar,
  Activity,
  BarChart3,
  PieChart,
  FileText
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface AnalyticsData {
  overview: {
    totalUsers: number
    totalQuestions: number
    totalAnswers: number
    totalViews: number
    userGrowth: number
    questionGrowth: number
    answerGrowth: number
    viewGrowth: number
  }
  userStats: {
    activeUsers: number
    newUsers: number
    returningUsers: number
    userRetention: number
  }
  contentStats: {
    questionsToday: number
    answersToday: number
    averageResponseTime: number
    resolutionRate: number
  }
  topTags: Array<{
    name: string
    count: number
    growth: number
  }>
  recentActivity: Array<{
    type: 'question' | 'answer' | 'user' | 'vote'
    description: string
    timestamp: string
    user: string
  }>
  weeklyStats: Array<{
    day: string
    questions: number
    answers: number
    users: number
  }>
}

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    checkAuth()
    fetchAnalytics()
  }, [timeRange])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/admin/analytics?range=${timeRange}`)
      if (response.ok) {
        const data = await response.json()
        console.log('Analytics data:', data)
        // Ensure userStats is present and valid
        if (data.userStats) {
          setAnalytics(data)
        } else {
          toast({
            title: "Error",
            description: "User statistics not found in backend response.",
            variant: "destructive",
          })
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch analytics data from backend.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      toast({
        title: "Error",
        description: "Failed to fetch analytics data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600'
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'question': return <MessageSquare className="h-4 w-4 text-blue-600" />
      case 'answer': return <FileText className="h-4 w-4 text-green-600" />
      case 'user': return <Users className="h-4 w-4 text-purple-600" />
      case 'vote': return <ThumbsUp className="h-4 w-4 text-orange-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Failed to load analytics data</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => router.push('/admin/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
                <p className="text-muted-foreground">Platform insights and performance metrics</p>
              </div>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{formatNumber(analytics.overview.totalUsers)}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                {getGrowthIcon(analytics.overview.userGrowth)}
                <span className={`ml-1 ${getGrowthColor(analytics.overview.userGrowth)}`}>
                  {Math.abs(analytics.overview.userGrowth)}%
                </span>
                <span className="text-muted-foreground ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Questions</p>
                  <p className="text-2xl font-bold">{formatNumber(analytics.overview.totalQuestions)}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                {getGrowthIcon(analytics.overview.questionGrowth)}
                <span className={`ml-1 ${getGrowthColor(analytics.overview.questionGrowth)}`}>
                  {Math.abs(analytics.overview.questionGrowth)}%
                </span>
                <span className="text-muted-foreground ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Answers</p>
                  <p className="text-2xl font-bold">{formatNumber(analytics.overview.totalAnswers)}</p>
                </div>
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                {getGrowthIcon(analytics.overview.answerGrowth)}
                <span className={`ml-1 ${getGrowthColor(analytics.overview.answerGrowth)}`}>
                  {Math.abs(analytics.overview.answerGrowth)}%
                </span>
                <span className="text-muted-foreground ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">{formatNumber(analytics.overview.totalViews)}</p>
                </div>
                <Eye className="h-8 w-8 text-orange-600" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                {getGrowthIcon(analytics.overview.viewGrowth)}
                <span className={`ml-1 ${getGrowthColor(analytics.overview.viewGrowth)}`}>
                  {Math.abs(analytics.overview.viewGrowth)}%
                </span>
                <span className="text-muted-foreground ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Active Users</span>
                  <span className="text-lg font-bold">{analytics.userStats.activeUsers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">New Users</span>
                  <span className="text-lg font-bold text-green-600">{analytics.userStats.newUsers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Returning Users</span>
                  <span className="text-lg font-bold text-blue-600">{analytics.userStats.returningUsers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">User Retention</span>
                  <span className="text-lg font-bold text-purple-600">{analytics.userStats.userRetention}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Content Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Questions Today</span>
                  <span className="text-lg font-bold">{analytics.contentStats.questionsToday}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Answers Today</span>
                  <span className="text-lg font-bold text-green-600">{analytics.contentStats.answersToday}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Avg Response Time</span>
                  <span className="text-lg font-bold text-blue-600">{analytics.contentStats.averageResponseTime}h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Resolution Rate</span>
                  <span className="text-lg font-bold text-purple-600">{analytics.contentStats.resolutionRate}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Top Tags
              </CardTitle>
              <CardDescription>Most popular question tags</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.topTags.map((tag, index) => (
                  <div key={tag.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <Badge variant="secondary">{tag.name}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{tag.count}</span>
                      <div className="flex items-center">
                        {getGrowthIcon(tag.growth)}
                        <span className={`text-xs ml-1 ${getGrowthColor(tag.growth)}`}>
                          {Math.abs(tag.growth)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest platform activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.recentActivity.map((activity) => (
                  <div key={`${activity.type}-${activity.timestamp}-${activity.user}`} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">
                        {activity.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          by {activity.user}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Activity
            </CardTitle>
            <CardDescription>Questions, answers, and user activity over the week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {analytics.weeklyStats.map((day) => (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${(day.questions / 30) * 100}px` }}
                      title={`Questions: ${day.questions}`}
                    />
                    <div 
                      className="w-full bg-green-500"
                      style={{ height: `${(day.answers / 60) * 100}px` }}
                      title={`Answers: ${day.answers}`}
                    />
                    <div 
                      className="w-full bg-purple-500 rounded-b"
                      style={{ height: `${(day.users / 70) * 100}px` }}
                      title={`Users: ${day.users}`}
                    />
                  </div>
                  <span className="text-xs font-medium">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded" />
                <span className="text-xs">Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded" />
                <span className="text-xs">Answers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded" />
                <span className="text-xs">Users</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
