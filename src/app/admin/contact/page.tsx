"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft, 
  Search, 
  Mail, 
  MessageCircle, 
  User, 
  Clock,
  AlertCircle,
  CheckCircle,
  Reply,
  Archive,
  Trash2,
  Filter
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ContactMessage {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'new' | 'in-progress' | 'resolved' | 'archived'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: string
  assignedTo?: string
  response?: string
  createdAt: string
  updatedAt: string
  respondedAt?: string
}

export default function ContactManagement() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [responseText, setResponseText] = useState('')
  const [sending, setSending] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const statusOptions = [
    { value: 'new', label: 'New', color: 'bg-blue-500' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-yellow-500' },
    { value: 'resolved', label: 'Resolved', color: 'bg-green-500' },
    { value: 'archived', label: 'Archived', color: 'bg-gray-500' }
  ]

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'bg-gray-500' },
    { value: 'medium', label: 'Medium', color: 'bg-blue-500' },
    { value: 'high', label: 'High', color: 'bg-orange-500' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-500' }
  ]

  // Categories for reference - could be used for filtering in the future
  // const categories = [
  //   'General Inquiry',
  //   'Technical Support',
  //   'Account Issues',
  //   'Feature Request',
  //   'Bug Report',
  //   'Billing',
  //   'Partnership',
  //   'Other'
  // ]

  useEffect(() => {
    checkAuth()
    fetchMessages()
  }, [])

  useEffect(() => {
    filterMessages()
  }, [messages, searchTerm, statusFilter, priorityFilter])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact')
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      } else {
        // Mock data if API fails
        const mockMessages: ContactMessage[] = [
          {
            _id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            subject: 'Unable to post questions',
            message: 'I\'m having trouble posting questions on the platform. Every time I try to submit, I get an error message.',
            status: 'new',
            priority: 'high',
            category: 'Technical Support',
            createdAt: '2024-01-15T10:00:00Z',
            updatedAt: '2024-01-15T10:00:00Z'
          },
          {
            _id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            subject: 'Account verification issue',
            message: 'I haven\'t received the verification email for my account. Can you help me resolve this?',
            status: 'in-progress',
            priority: 'medium',
            category: 'Account Issues',
            assignedTo: 'Admin User',
            createdAt: '2024-01-14T14:30:00Z',
            updatedAt: '2024-01-14T15:00:00Z'
          },
          {
            _id: '3',
            name: 'Mike Johnson',
            email: 'mike.johnson@example.com',
            subject: 'Feature request - Dark mode',
            message: 'Would it be possible to add a dark mode option to the platform? It would be great for users who prefer darker themes.',
            status: 'resolved',
            priority: 'low',
            category: 'Feature Request',
            response: 'Thank you for your suggestion! Dark mode is actually in our roadmap and we plan to implement it in the next quarter.',
            respondedAt: '2024-01-13T16:45:00Z',
            createdAt: '2024-01-13T09:15:00Z',
            updatedAt: '2024-01-13T16:45:00Z'
          },
          {
            _id: '4',
            name: 'Sarah Wilson',
            email: 'sarah.wilson@example.com',
            subject: 'Partnership opportunity',
            message: 'We would like to discuss a potential partnership opportunity with your platform. Please let us know who we should contact.',
            status: 'new',
            priority: 'urgent',
            category: 'Partnership',
            createdAt: '2024-01-16T08:20:00Z',
            updatedAt: '2024-01-16T08:20:00Z'
          }
        ]
        setMessages(mockMessages)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
      toast({
        title: "Error",
        description: "Failed to fetch contact messages",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterMessages = () => {
    let filtered = messages

    if (searchTerm) {
      filtered = filtered.filter(message =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(message => message.status === statusFilter)
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(message => message.priority === priorityFilter)
    }

    filtered.sort((a, b) => {
      // Sort by priority first (urgent > high > medium > low)
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
      if (priorityDiff !== 0) return priorityDiff
      
      // Then by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    setFilteredMessages(filtered)
  }

  const updateMessageStatus = async (messageId: string, status: string) => {
    try {
      // Here you would make API call to update status
      setMessages(prev => prev.map(msg => 
        msg._id === messageId 
          ? { ...msg, status: status as ContactMessage['status'], updatedAt: new Date().toISOString() }
          : msg
      ))
      toast({
        title: "Success",
        description: "Message status updated successfully",
      })
    } catch (error) {
      console.error('Error updating status:', error)
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive",
      })
    }
  }

  const updateMessagePriority = async (messageId: string, priority: string) => {
    try {
      // Here you would make API call to update priority
      setMessages(prev => prev.map(msg => 
        msg._id === messageId 
          ? { ...msg, priority: priority as ContactMessage['priority'], updatedAt: new Date().toISOString() }
          : msg
      ))
      toast({
        title: "Success",
        description: "Message priority updated successfully",
      })
    } catch (error) {
      console.error('Error updating priority:', error)
      toast({
        title: "Error",
        description: "Failed to update message priority",
        variant: "destructive",
      })
    }
  }

  const sendResponse = async () => {
    if (!selectedMessage || !responseText.trim()) return

    setSending(true)
    try {
      // Here you would make API call to send response
      setMessages(prev => prev.map(msg => 
        msg._id === selectedMessage._id 
          ? { 
              ...msg, 
              response: responseText,
              status: 'resolved',
              respondedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString() 
            }
          : msg
      ))
      
      toast({
        title: "Success",
        description: "Response sent successfully",
      })
      
      setSelectedMessage(null)
      setResponseText('')
    } catch (error) {
      console.error('Error sending response:', error)
      toast({
        title: "Error",
        description: "Failed to send response",
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
  }

  const deleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
      return
    }

    try {
      setMessages(prev => prev.filter(msg => msg._id !== messageId))
      toast({
        title: "Success",
        description: "Message deleted successfully",
      })
    } catch (error) {
      console.error('Error deleting message:', error)
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      })
    }
  }

  const getPriorityColor = (priority: string) => {
    return priorityOptions.find(p => p.value === priority)?.color || 'bg-gray-500'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="h-4 w-4" />
      case 'in-progress': return <Clock className="h-4 w-4" />
      case 'resolved': return <CheckCircle className="h-4 w-4" />
      case 'archived': return <Archive className="h-4 w-4" />
      default: return <MessageCircle className="h-4 w-4" />
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => router.push('/admin/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Contact Messages</h1>
                <p className="text-muted-foreground">Manage and respond to contact form submissions</p>
              </div>
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
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
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
                  <SelectItem value="all">All Status</SelectItem>
                  {statusOptions.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  {priorityOptions.map(priority => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
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
                <p className="text-2xl font-bold">{messages.length}</p>
                <p className="text-sm text-muted-foreground">Total Messages</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {messages.filter(m => m.status === 'new').length}
                </p>
                <p className="text-sm text-muted-foreground">New</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {messages.filter(m => m.status === 'in-progress').length}
                </p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {messages.filter(m => m.priority === 'urgent').length}
                </p>
                <p className="text-sm text-muted-foreground">Urgent</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No messages found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? 'No messages match your search criteria.' : 'No contact messages have been received yet.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredMessages.map((message) => (
              <Card key={message._id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(message.priority)}`} />
                        <CardTitle className="line-clamp-1">{message.subject}</CardTitle>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getStatusIcon(message.status)}
                          {statusOptions.find(s => s.value === message.status)?.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {message.name}
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {message.email}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {message.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {message.message}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Created: {new Date(message.createdAt).toLocaleDateString()}</span>
                      {message.respondedAt && (
                        <span>Responded: {new Date(message.respondedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Select
                        value={message.status}
                        onValueChange={(value) => updateMessageStatus(message._id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map(status => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={message.priority}
                        onValueChange={(value) => updateMessagePriority(message._id, value)}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {priorityOptions.map(priority => (
                            <SelectItem key={priority.value} value={priority.value}>
                              {priority.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedMessage(message)}
                      >
                        <Reply className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteMessage(message._id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {message.response && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-1">Response sent:</h4>
                      <p className="text-sm text-green-700">{message.response}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Reply Modal */}
        {selectedMessage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Reply to {selectedMessage.name}</CardTitle>
                <CardDescription>
                  Responding to: {selectedMessage.subject}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Original Message:</h4>
                    <p className="text-sm text-muted-foreground">{selectedMessage.message}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="response" className="text-sm font-medium">Your Response</label>
                    <Textarea
                      id="response"
                      placeholder="Write your response..."
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSelectedMessage(null)
                        setResponseText('')
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={sendResponse}
                      disabled={sending || !responseText.trim()}
                    >
                      {sending ? 'Sending...' : 'Send Response'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
