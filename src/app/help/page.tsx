"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  BookOpen, 
  MessageSquare, 
  Users, 
  Code, 
  Shield, 
  Settings, 
  ExternalLink,
  Clock,
  Eye,
  FileText
} from 'lucide-react'

interface Article {
  _id: string
  title: string
  content: string
  category: string
  slug: string
  tags: string[]
  author: string
  views: number
  createdAt: string
  updatedAt: string
}

export default function HelpCenterPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'all', name: 'All Articles', icon: <FileText className="h-5 w-5" /> },
    { id: 'getting-started', name: 'Getting Started', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'account', name: 'Account & Profile', icon: <Shield className="h-5 w-5" /> },
    { id: 'questions', name: 'Questions & Answers', icon: <MessageSquare className="h-5 w-5" /> },
    { id: 'community', name: 'Community Guidelines', icon: <Users className="h-5 w-5" /> },
    { id: 'technical', name: 'Technical Help', icon: <Code className="h-5 w-5" /> },
    { id: 'billing', name: 'Billing & Plans', icon: <Settings className="h-5 w-5" /> }
  ]

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then((data: Article[]) => {
        setArticles(data)
        setFilteredArticles(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching articles:', error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    let filtered = articles

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredArticles(filtered)
  }, [articles, selectedCategory, searchTerm])

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return articles.length
    return articles.filter(article => article.category === categoryId).length
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getExcerpt = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Help Center</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to your questions and learn how to get the most out of TechBlog.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search help articles..."
              className="pl-12 h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <Badge variant={selectedCategory === category.id ? 'secondary' : 'outline'}>
                      {getCategoryCount(category.id)}
                    </Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/contact" className="flex items-center gap-2 text-sm hover:text-primary">
                  <ExternalLink className="h-4 w-4" />
                  Contact Support
                </Link>
                <Link href="/faq" className="flex items-center gap-2 text-sm hover:text-primary">
                  <ExternalLink className="h-4 w-4" />
                  Frequently Asked Questions
                </Link>
                <Link href="/community-guidelines" className="flex items-center gap-2 text-sm hover:text-primary">
                  <ExternalLink className="h-4 w-4" />
                  Community Guidelines
                </Link>
                <Link href="/feedback" className="flex items-center gap-2 text-sm hover:text-primary">
                  <ExternalLink className="h-4 w-4" />
                  Send Feedback
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Articles */}
          <div className="lg:col-span-3">
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading articles...</p>
              </div>
            )}
            
            {!loading && filteredArticles.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No articles found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm ? 'Try adjusting your search terms or browse by category.' : 'No articles available in this category.'}
                  </p>
                </CardContent>
              </Card>
            )}
            
            {!loading && filteredArticles.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {selectedCategory === 'all' ? 'All Articles' : categories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="grid gap-6">
                  {filteredArticles.map((article) => (
                    <Card key={article._id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <Link href={`/help/${article.slug}`}>
                              <CardTitle className="hover:text-primary transition-colors line-clamp-2">
                                {article.title}
                              </CardTitle>
                            </Link>
                            <CardDescription className="line-clamp-3">
                              {getExcerpt(article.content)}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {formatDate(article.createdAt)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {article.views} views
                            </div>
                            <span>by {article.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {article.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {article.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{article.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="mt-4">
                          <Link href={`/help/${article.slug}`}>
                            <Button variant="outline" size="sm">
                              Read Article
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Support */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
            <p className="mb-6 opacity-90">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" asChild>
                <Link href="/contact">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Support
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/questions/ask">
                  <Users className="h-4 w-4 mr-2" />
                  Ask the Community
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
