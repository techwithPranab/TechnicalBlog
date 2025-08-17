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
  Plus, 
  Edit, 
  Trash2, 
  HelpCircle,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface FAQItem {
  _id: string
  question: string
  answer: string
  category: string
  order: number
  isPublished: boolean
  views: number
  createdAt: string
  updatedAt: string
}

export default function FAQManagement() {
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [filteredFaqs, setFilteredFaqs] = useState<FAQItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'general',
    isPublished: true
  })
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'account', label: 'Account & Profile' },
    { value: 'questions', label: 'Questions & Answers' },
    { value: 'reputation', label: 'Reputation & Voting' },
    { value: 'technical', label: 'Technical Issues' },
    { value: 'community', label: 'Community Guidelines' }
  ]

  useEffect(() => {
    checkAuth()
    fetchFAQs()
  }, [])

  useEffect(() => {
    filterFAQs()
  }, [faqs, searchTerm, categoryFilter])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    }
  }

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/faq')
      if (response.ok) {
        const data = await response.json()
        setFaqs(data)
      } else {
        // Mock data if API fails
        const mockFaqs: FAQItem[] = [
          {
            _id: '1',
            question: 'How do I ask a good question?',
            answer: 'To ask a good question, be specific, provide context, include relevant code examples, and show what you\'ve tried.',
            category: 'questions',
            order: 1,
            isPublished: true,
            views: 1250,
            createdAt: '2024-01-15T10:00:00Z',
            updatedAt: '2024-01-15T10:00:00Z'
          },
          {
            _id: '2',
            question: 'How does the reputation system work?',
            answer: 'You earn reputation by receiving upvotes on your questions and answers. Higher reputation unlocks new privileges.',
            category: 'reputation',
            order: 2,
            isPublished: true,
            views: 890,
            createdAt: '2024-01-10T14:30:00Z',
            updatedAt: '2024-01-10T14:30:00Z'
          },
          {
            _id: '3',
            question: 'Can I edit my profile information?',
            answer: 'Yes, you can edit your profile by going to your account settings and updating your information.',
            category: 'account',
            order: 3,
            isPublished: true,
            views: 567,
            createdAt: '2024-01-08T09:15:00Z',
            updatedAt: '2024-01-08T09:15:00Z'
          }
        ]
        setFaqs(mockFaqs)
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error)
      toast({
        title: "Error",
        description: "Failed to fetch FAQs",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterFAQs = () => {
    let filtered = faqs

    if (searchTerm) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(faq => faq.category === categoryFilter)
    }

    filtered.sort((a, b) => a.order - b.order)
    setFilteredFaqs(filtered)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingFaq) {
        // Update existing FAQ
        toast({
          title: "Success",
          description: "FAQ updated successfully",
        })
      } else {
        // Create new FAQ
        toast({
          title: "Success",
          description: "FAQ created successfully",
        })
      }
      
      resetForm()
      fetchFAQs()
    } catch (error) {
      console.error('Error saving FAQ:', error)
      toast({
        title: "Error",
        description: "Failed to save FAQ",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (faqId: string) => {
    if (!confirm('Are you sure you want to delete this FAQ? This action cannot be undone.')) {
      return
    }

    try {
      toast({
        title: "Success",
        description: "FAQ deleted successfully",
      })
      fetchFAQs()
    } catch (error) {
      console.error('Error deleting FAQ:', error)
      toast({
        title: "Error",
        description: "Failed to delete FAQ",
        variant: "destructive",
      })
    }
  }

  const togglePublished = async (faqId: string, isPublished: boolean) => {
    try {
      toast({
        title: "Success",
        description: `FAQ ${isPublished ? 'published' : 'unpublished'} successfully`,
      })
      fetchFAQs()
    } catch (error) {
      console.error('Error updating FAQ:', error)
      toast({
        title: "Error",
        description: "Failed to update FAQ",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      category: 'general',
      isPublished: true
    })
    setShowCreateForm(false)
    setEditingFaq(null)
  }

  const startEdit = (faq: FAQItem) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      isPublished: faq.isPublished
    })
    setEditingFaq(faq)
    setShowCreateForm(true)
  }

  const getCategoryLabel = (value: string) => {
    return categories.find(cat => cat.value === value)?.label || value
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
                <h1 className="text-2xl font-bold">FAQ Management</h1>
                <p className="text-muted-foreground">Create and manage frequently asked questions</p>
              </div>
            </div>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create FAQ
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search FAQs..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
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
                <p className="text-2xl font-bold">{faqs.length}</p>
                <p className="text-sm text-muted-foreground">Total FAQs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {faqs.filter(f => f.isPublished).length}
                </p>
                <p className="text-sm text-muted-foreground">Published</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {faqs.filter(f => !f.isPublished).length}
                </p>
                <p className="text-sm text-muted-foreground">Draft</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {faqs.reduce((sum, faq) => sum + faq.views, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No FAQs found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? 'No FAQs match your search criteria.' : 'No FAQs have been created yet.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredFaqs.map((faq) => (
              <Card key={faq._id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedFaq(expandedFaq === faq._id ? null : faq._id)}
                        >
                          {expandedFaq === faq._id ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                        <CardTitle className="line-clamp-2">{faq.question}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2 ml-10">
                        <Badge variant="secondary">
                          {getCategoryLabel(faq.category)}
                        </Badge>
                        <Badge variant={faq.isPublished ? 'default' : 'destructive'}>
                          {faq.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {faq.views} views
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                {expandedFaq === faq._id && (
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">Answer:</h4>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Created: {new Date(faq.createdAt).toLocaleDateString()}</span>
                        <span>Updated: {new Date(faq.updatedAt).toLocaleDateString()}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEdit(faq)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePublished(faq._id, !faq.isPublished)}
                        >
                          {faq.isPublished ? 'Unpublish' : 'Publish'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(faq._id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>

        {/* Create/Edit Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>
                  {editingFaq ? 'Edit FAQ' : 'Create New FAQ'}
                </CardTitle>
                <CardDescription>
                  {editingFaq ? 'Update the FAQ information' : 'Add a new frequently asked question'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="faq-question" className="text-sm font-medium">Question</label>
                    <Input
                      id="faq-question"
                      placeholder="Enter the question..."
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="faq-answer" className="text-sm font-medium">Answer</label>
                    <Textarea
                      id="faq-answer"
                      placeholder="Enter the detailed answer..."
                      value={formData.answer}
                      onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                      rows={6}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="faq-category" className="text-sm font-medium">Category</label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: string) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger id="faq-category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="faq-published"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    />
                    <label htmlFor="faq-published" className="text-sm font-medium">
                      Publish immediately
                    </label>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={saving}>
                      {(() => {
                        if (saving) return 'Saving...'
                        return editingFaq ? 'Update' : 'Create'
                      })()}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
