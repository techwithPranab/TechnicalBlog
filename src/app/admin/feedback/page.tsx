"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Mail, 
  Clock, 
  User,
  Star,
  CheckCircle,
  AlertCircle,
  Circle
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Feedback {
  _id: string
  type: string
  title: string
  description: string
  email?: string
  rating?: number
  anonymous: boolean
  status: 'Received' | 'In Progress' | 'Implemented' | 'Rejected'
  adminNotes?: string
  createdAt: string
  updatedAt: string
}

export default function FeedbackManagement() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)
  const [adminNotes, setAdminNotes] = useState('')
  const [updating, setUpdating] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    checkAuth()
    fetchFeedbacks()
  }, [])

  useEffect(() => {
    filterFeedbacks()
  }, [feedbacks, searchTerm, statusFilter, typeFilter])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    }
  }

  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      console.log('Fetching feedbacks with token:', token);
      const response = await fetch('/api/feedback', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setFeedbacks(data)
      } else {
        console.log('Failed to fetch feedbacks:', response.statusText)
        toast({
          title: "Error",
          description: "Failed to fetch feedback data",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error)
      toast({
        title: "Error",
        description: "Something went wrong while fetching feedback",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterFeedbacks = () => {
    let filtered = feedbacks

    if (searchTerm) {
      filtered = filtered.filter(feedback =>
        feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(feedback => feedback.status === statusFilter)
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(feedback => feedback.type === typeFilter)
    }

    setFilteredFeedbacks(filtered)
  }

  const updateFeedbackStatus = async (feedbackId: string, newStatus: string) => {
    setUpdating(true)
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/feedback/${feedbackId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: newStatus,
          adminNotes: adminNotes
        })
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Feedback status updated successfully",
        })
        fetchFeedbacks()
        setSelectedFeedback(null)
        setAdminNotes('')
      } else {
        toast({
          title: "Error",
          description: "Failed to update feedback status",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error updating feedback:', error)
      toast({
        title: "Error",
        description: "Something went wrong while updating feedback",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Received':
        return <Circle className="h-4 w-4 text-blue-500" />
      case 'In Progress':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'Implemented':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'Rejected':
        return <Circle className="h-4 w-4 text-red-500" />
      default:
        return <Circle className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bug':
        return 'destructive'
      case 'feature':
        return 'default'
      case 'improvement':
        return 'secondary'
      case 'general':
        return 'outline'
      default:
        return 'outline'
    }
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
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.push('/admin/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Feedback Management</h1>
              <p className="text-muted-foreground">Review and manage user feedback</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search feedback..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Received">Received</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Implemented">Implemented</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="improvement">Improvement</SelectItem>
                  <SelectItem value="general">General Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{feedbacks.length}</p>
                <p className="text-sm text-muted-foreground">Total Feedback</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {feedbacks.filter(f => f.status === 'Received').length}
                </p>
                <p className="text-sm text-muted-foreground">New</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {feedbacks.filter(f => f.status === 'In Progress').length}
                </p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {feedbacks.filter(f => f.status === 'Implemented').length}
                </p>
                <p className="text-sm text-muted-foreground">Implemented</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feedback List */}
        <div className="grid gap-6">
          {filteredFeedbacks.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No feedback found</h3>
                <p className="text-muted-foreground">
                  No feedback matches your current filters.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredFeedbacks.map((feedback) => (
              <Card key={feedback._id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <CardTitle className="line-clamp-1">{feedback.title}</CardTitle>
                        <Badge variant={getTypeColor(feedback.type) as any}>
                          {feedback.type}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(feedback.status)}
                          <Badge variant="outline">
                            {feedback.status}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {feedback.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {feedback.anonymous ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Mail className="h-4 w-4" />
                          )}
                          <span>
                            {feedback.anonymous ? 'Anonymous' : feedback.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
                        </div>
                        {feedback.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{feedback.rating}/5</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {feedback.adminNotes && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm"><strong>Admin Notes:</strong> {feedback.adminNotes}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedFeedback(feedback)
                          setAdminNotes(feedback.adminNotes || '')
                        }}
                      >
                        Update Status
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Update Status Modal */}
        {selectedFeedback && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle>Update Feedback Status</CardTitle>
                <CardDescription>
                  Update the status and add admin notes for this feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">{selectedFeedback.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedFeedback.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="status-select" className="text-sm font-medium">Status</label>
                  <Select
                    defaultValue={selectedFeedback.status}
                    onValueChange={(value: string) => {
                      setSelectedFeedback({
                        ...selectedFeedback,
                        status: value as 'Received' | 'In Progress' | 'Implemented' | 'Rejected'
                      })
                    }}
                  >
                    <SelectTrigger id="status-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Received">Received</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Implemented">Implemented</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="admin-notes" className="text-sm font-medium">Admin Notes</label>
                  <Textarea
                    id="admin-notes"
                    placeholder="Add notes about this feedback..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedFeedback(null)
                      setAdminNotes('')
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => updateFeedbackStatus(selectedFeedback._id, selectedFeedback.status)}
                    disabled={updating}
                  >
                    {updating ? 'Updating...' : 'Update'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
