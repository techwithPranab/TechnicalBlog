"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Clock, 
  Eye, 
  User, 
  Calendar,
  Share,
  ThumbsUp,
  ThumbsDown,
  ExternalLink
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

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

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [helpful, setHelpful] = useState<boolean | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchArticle()
  }, [params.slug])

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/articles/${params.slug}`)
      if (!response.ok) {
        throw new Error('Article not found')
      }
      const data = await response.json()
      setArticle(data.article)
    } catch (error) {
      console.error('Error fetching article:', error)
      toast({
        title: "Error",
        description: "Failed to load article. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleHelpfulVote = async (isHelpful: boolean) => {
    if (!article) return
    
    setHelpful(isHelpful)
    toast({
      title: "Thank you!",
      description: `Your feedback helps us improve our help center.`,
    })
  }

  const shareArticle = async () => {
    const url = window.location.href
    const title = article?.title || 'Help Article'
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        })
      } catch (error) {
        // User cancelled sharing or sharing failed
        console.log('Share cancelled or failed:', error)
        // Fallback to copy to clipboard
        navigator.clipboard.writeText(url)
        toast({
          title: "Link copied!",
          description: "Article link has been copied to your clipboard.",
        })
      }
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(url)
      toast({
        title: "Link copied!",
        description: "Article link has been copied to your clipboard.",
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-12 bg-muted rounded w-3/4"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The help article you're looking for could not be found.
          </p>
          <Button asChild>
            <Link href="/help">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Help Center
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/help" className="hover:text-primary">
            Help Center
          </Link>
          <span>/</span>
          <span className="capitalize">{article.category}</span>
          <span>/</span>
          <span className="text-foreground">{article.title}</span>
        </div>

        {/* Back Button */}
        <Button variant="outline" asChild>
          <Link href="/help">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Help Center
          </Link>
        </Button>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Badge variant="secondary" className="mb-2">
              {article.category}
            </Badge>
            <h1 className="text-4xl font-bold">{article.title}</h1>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>By {article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Published {formatDate(article.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Updated {formatDate(article.updatedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{article.views} views</span>
            </div>
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Tags:</span>
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Article Content */}
        <Card>
          <CardContent className="p-8">
            <div 
              className="prose prose-gray dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </CardContent>
        </Card>

        {/* Article Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-muted rounded-lg">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-semibold">Was this article helpful?</h3>
            <p className="text-sm text-muted-foreground">
              Your feedback helps us improve our help center
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={helpful === true ? "default" : "outline"}
              size="sm"
              onClick={() => handleHelpfulVote(true)}
              disabled={helpful !== null}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              Yes
            </Button>
            <Button 
              variant={helpful === false ? "default" : "outline"}
              size="sm"
              onClick={() => handleHelpfulVote(false)}
              disabled={helpful !== null}
            >
              <ThumbsDown className="h-4 w-4 mr-2" />
              No
            </Button>
            <div className="w-px h-6 bg-border mx-2" />
            <Button variant="outline" size="sm" onClick={shareArticle}>
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Related Links */}
        <Card>
          <CardHeader>
            <CardTitle>Still Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/contact">
                <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors">
                  <div className="text-primary">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Contact Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Get personalized help from our team
                    </p>
                  </div>
                </div>
              </Link>
              
              <Link href="/faq">
                <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors">
                  <div className="text-primary">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Browse FAQ</h4>
                    <p className="text-sm text-muted-foreground">
                      Check frequently asked questions
                    </p>
                  </div>
                </div>
              </Link>
              
              <Link href="/questions/ask">
                <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors">
                  <div className="text-primary">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Ask the Community</h4>
                    <p className="text-sm text-muted-foreground">
                      Get help from other users
                    </p>
                  </div>
                </div>
              </Link>
              
              <Link href="/feedback">
                <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors">
                  <div className="text-primary">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Send Feedback</h4>
                    <p className="text-sm text-muted-foreground">
                      Help us improve TechBlog
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
