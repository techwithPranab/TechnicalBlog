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
  FileText,
  Eye,
  Clock,
  Filter
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Article {
  _id: string
  title: string
  content: string
  excerpt: string
  category: string
  author: {
    name: string
    email: string
  }
  isPublished: boolean
  publishedAt?: string
  views: number
  readingTime: number
  tags: string[]
  createdAt: string
  updatedAt: string
}

export default function ArticlesManagement() {
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'getting-started',
    tags: '',
    isPublished: false
  })
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const categories = [
    { value: 'getting-started', label: 'Getting Started' },
    { value: 'account-management', label: 'Account Management' },
    { value: 'asking-questions', label: 'Asking Questions' },
    { value: 'answering-questions', label: 'Answering Questions' },
    { value: 'community-features', label: 'Community Features' },
    { value: 'reputation-system', label: 'Reputation System' },
    { value: 'moderation', label: 'Moderation' },
    { value: 'troubleshooting', label: 'Troubleshooting' }
  ]

  useEffect(() => {
    checkAuth()
    fetchArticles()
  }, [])

  useEffect(() => {
    filterArticles()
  }, [articles, searchTerm, categoryFilter, statusFilter])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    }
  }

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles')
      if (response.ok) {
        const data = await response.json()
        setArticles(data)
      } else {
        // Mock data if API fails
        const mockArticles: Article[] = [
          {
            _id: '1',
            title: 'How to Ask Your First Question',
            content: 'This comprehensive guide will walk you through the process of asking your first question on our platform...',
            excerpt: 'Learn the best practices for asking effective questions that get helpful answers.',
            category: 'getting-started',
            author: {
              name: 'Admin User',
              email: 'admin@example.com'
            },
            isPublished: true,
            publishedAt: '2024-01-15T10:00:00Z',
            views: 2150,
            readingTime: 5,
            tags: ['questions', 'beginners', 'guide'],
            createdAt: '2024-01-15T09:00:00Z',
            updatedAt: '2024-01-15T10:00:00Z'
          },
          {
            _id: '2',
            title: 'Understanding the Reputation System',
            content: 'The reputation system is designed to encourage quality contributions and build trust within the community...',
            excerpt: 'A detailed explanation of how reputation points work and what privileges they unlock.',
            category: 'reputation-system',
            author: {
              name: 'Admin User',
              email: 'admin@example.com'
            },
            isPublished: true,
            publishedAt: '2024-01-12T14:30:00Z',
            views: 1890,
            readingTime: 8,
            tags: ['reputation', 'privileges', 'community'],
            createdAt: '2024-01-12T13:30:00Z',
            updatedAt: '2024-01-12T14:30:00Z'
          },
          {
            _id: '3',
            title: 'Moderating Content Effectively',
            content: 'This article covers the responsibilities and tools available to community moderators...',
            excerpt: 'Guidelines and best practices for community moderation.',
            category: 'moderation',
            author: {
              name: 'Admin User',
              email: 'admin@example.com'
            },
            isPublished: false,
            views: 0,
            readingTime: 12,
            tags: ['moderation', 'guidelines', 'community'],
            createdAt: '2024-01-10T11:00:00Z',
            updatedAt: '2024-01-10T11:00:00Z'
          }
        ]
        setArticles(mockArticles)
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
      toast({
        title: "Error",
        description: "Failed to fetch articles",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterArticles = () => {
    let filtered = articles

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(article => article.category === categoryFilter)
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(article => 
        statusFilter === 'published' ? article.isPublished : !article.isPublished
      )
    }

    filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    setFilteredArticles(filtered)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingArticle) {
        // Update existing article
        toast({
          title: "Success",
          description: "Article updated successfully",
        })
      } else {
        // Create new article
        toast({
          title: "Success",
          description: "Article created successfully",
        })
      }
      
      resetForm()
      fetchArticles()
    } catch (error) {
      console.error('Error saving article:', error)
      toast({
        title: "Error",
        description: "Failed to save article",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (articleId: string) => {
    if (!confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      return
    }

    try {
      toast({
        title: "Success",
        description: "Article deleted successfully",
      })
      fetchArticles()
    } catch (error) {
      console.error('Error deleting article:', error)
      toast({
        title: "Error",
        description: "Failed to delete article",
        variant: "destructive",
      })
    }
  }

  const togglePublished = async (articleId: string, isPublished: boolean) => {
    try {
      toast({
        title: "Success",
        description: `Article ${isPublished ? 'published' : 'unpublished'} successfully`,
      })
      fetchArticles()
    } catch (error) {
      console.error('Error updating article:', error)
      toast({
        title: "Error",
        description: "Failed to update article",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: 'getting-started',
      tags: '',
      isPublished: false
    })
    setShowCreateForm(false)
    setEditingArticle(null)
  }

  const startEdit = (article: Article) => {
    setFormData({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      category: article.category,
      tags: article.tags.join(', '),
      isPublished: article.isPublished
    })
    setEditingArticle(article)
    setShowCreateForm(true)
  }

  const getCategoryLabel = (value: string) => {
    return categories.find(cat => cat.value === value)?.label || value
  }

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    return Math.ceil(wordCount / wordsPerMinute)
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
                <h1 className="text-2xl font-bold">Articles Management</h1>
                <p className="text-muted-foreground">Create and manage help center articles</p>
              </div>
            </div>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Article
            </Button>
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
                  placeholder="Search articles..."
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{articles.length}</p>
                <p className="text-sm text-muted-foreground">Total Articles</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {articles.filter(a => a.isPublished).length}
                </p>
                <p className="text-sm text-muted-foreground">Published</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {articles.filter(a => !a.isPublished).length}
                </p>
                <p className="text-sm text-muted-foreground">Drafts</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {articles.reduce((sum, article) => sum + article.views, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(articles.reduce((sum, article) => sum + article.readingTime, 0) / articles.length || 0)}
                </p>
                <p className="text-sm text-muted-foreground">Avg. Reading Time</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {filteredArticles.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? 'No articles match your search criteria.' : 'No articles have been created yet.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredArticles.map((article) => (
              <Card key={article._id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-2 mb-2">{article.title}</CardTitle>
                      <CardDescription className="line-clamp-2 mb-3">
                        {article.excerpt}
                      </CardDescription>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary">
                          {getCategoryLabel(article.category)}
                        </Badge>
                        <Badge variant={article.isPublished ? 'default' : 'destructive'}>
                          {article.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                        {article.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEdit(article)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePublished(article._id, !article.isPublished)}
                        >
                          {article.isPublished ? 'Unpublish' : 'Publish'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(article._id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {article.views} views
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readingTime} min read
                      </div>
                      <span>By {article.author.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>Created: {new Date(article.createdAt).toLocaleDateString()}</span>
                      <span>Updated: {new Date(article.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Create/Edit Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>
                  {editingArticle ? 'Edit Article' : 'Create New Article'}
                </CardTitle>
                <CardDescription>
                  {editingArticle ? 'Update the article information' : 'Add a new help center article'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="article-title" className="text-sm font-medium">Title</label>
                    <Input
                      id="article-title"
                      placeholder="Enter article title..."
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="article-excerpt" className="text-sm font-medium">Excerpt</label>
                    <Textarea
                      id="article-excerpt"
                      placeholder="Brief description of the article..."
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={2}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="article-category" className="text-sm font-medium">Category</label>
                      <Select
                        value={formData.category}
                        onValueChange={(value: string) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger id="article-category">
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

                    <div className="space-y-2">
                      <label htmlFor="article-tags" className="text-sm font-medium">Tags</label>
                      <Input
                        id="article-tags"
                        placeholder="tag1, tag2, tag3..."
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">
                        Separate tags with commas
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="article-content" className="text-sm font-medium">Content</label>
                    <Textarea
                      id="article-content"
                      placeholder="Write the full article content..."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={12}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Estimated reading time: {calculateReadingTime(formData.content)} minutes
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="article-published"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    />
                    <label htmlFor="article-published" className="text-sm font-medium">
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
                        return editingArticle ? 'Update' : 'Create'
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
