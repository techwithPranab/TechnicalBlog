import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowUp, MessageSquare, Eye, Calendar, User, TrendingUp, Hash } from 'lucide-react';
interface TagPageProps {
  params: {
    slug: string
  }
}

async function fetchTagWithQuestions(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3001';
  console.log('Base URL:', baseUrl);
  const res = await fetch(`${baseUrl}/api/tags/${slug}`, {
    next: { revalidate: 60 }
  })
  console.log('Fetching tag details for:', res);
  if (!res.ok) throw new Error('Failed to fetch tag details')
  return res.json()
}

export default async function TagPage({ params }: TagPageProps) {
  let tag: any = null
  let questions: any[] = []
  let relatedTags: any[] = []
  let metrics: any = {
    usageCount: 0,
    answeredRate: 0,
    avgScore: 0,
    activeUsers: 0,
    createdAt: null
  }
  try {
    console.log('Fetching tag details for:', params.slug);  
    const data = await fetchTagWithQuestions(params.slug)
    tag = data.tag
    questions = data.questions || []
    relatedTags = data.relatedTags || [] // used in sidebar
    metrics = data.metrics || {
      usageCount: tag.usageCount,
      answeredRate: tag.answeredRate || 0,
      avgScore: tag.avgScore || 0,
      activeUsers: tag.activeUsers || 0,
      createdAt: tag.createdAt || null
    }
  } catch (err: any) {
    // fallback UI or error message
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-destructive py-12">
          {err?.message || 'Failed to load tag details.'}
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'open':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        {/* Tag Header */}
        <div className="border-b pb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge 
                  variant="secondary" 
                  className="text-lg px-4 py-2"
                  style={{ backgroundColor: `${tag.color}20`, color: tag.color, borderColor: tag.color }}
                >
                  {tag.name}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {tag.usageCount.toLocaleString()} questions
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2">Questions tagged [{tag.name}]</h1>
              <p className="text-muted-foreground max-w-3xl">
                {tag.description}
              </p>
            </div>
            <Button asChild>
              <Link href="/questions/ask">Ask Question</Link>
            </Button>
          </div>

          {/* Tag Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-2xl font-bold">{metrics.usageCount?.toLocaleString?.() ?? metrics.usageCount}</div>
                    <div className="text-xs text-muted-foreground">Total Questions</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-2xl font-bold">{metrics.answeredRate}%</div>
                    <div className="text-xs text-muted-foreground">Answer Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-2xl font-bold">{metrics.activeUsers?.toLocaleString?.() ?? metrics.activeUsers}</div>
                    <div className="text-xs text-muted-foreground">Active Users</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-2xl font-bold">{metrics.createdAt ? formatDate(metrics.createdAt) : ''}</div>
                    <div className="text-xs text-muted-foreground">Created</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="newest" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="newest">Newest</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                  <TabsTrigger value="votes">Most Votes</TabsTrigger>
                </TabsList>
                <div className="text-sm text-muted-foreground">
                  {questions.length} questions
                </div>
              </div>

              <TabsContent value="newest" className="space-y-4">
                {questions.map((question) => (
                  <Card key={question.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Stats */}
                        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground min-w-[80px]">
                          <div className="flex items-center gap-1">
                            <ArrowUp className="h-3 w-3" />
                            <span className="font-medium">{typeof question.votes === 'object' ? question.votes.score : question.votes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{question.answers}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{question.views}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <Link href={`/questions/${question.slug}`}>
                              <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                                {question.title}
                              </h3>
                            </Link>
                            <Badge 
                              variant="outline" 
                              className={`ml-2 ${getStatusColor(question.status)}`}
                            >
                              {question.status}
                            </Badge>
                          </div>

                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {question.content}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {question.tags.map((tag: any, idx: number) => {
                              const slug = typeof tag === 'object' ? tag.slug || tag.name : tag;
                              const label = typeof tag === 'object' ? tag.name : tag;
                              return (
                                <Badge key={slug + '-' + idx} variant="secondary">
                                  <Link href={`/tags/${slug}`}>{label}</Link>
                                </Badge>
                              );
                            })}
                          </div>

                          {/* Author and Date */}
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={question.author.avatar} />
                                <AvatarFallback>
                                  {question.author.name.split(' ').map((n: string) => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <Link 
                                href={`/users/${question.author.id}`}
                                className="hover:text-primary"
                              >
                                {question.author.name}
                              </Link>
                              <span>({question.author.reputation})</span>
                            </div>
                            <div>
                              asked {formatDate(question.createdAt)}
                              {question.updatedAt !== question.createdAt && (
                                <span> • modified {formatDate(question.updatedAt)}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="active">
                <div className="text-center py-8 text-muted-foreground">
                  Active questions will be shown here
                </div>
              </TabsContent>

              <TabsContent value="unanswered">
                <div className="text-center py-8 text-muted-foreground">
                  Unanswered questions will be shown here
                </div>
              </TabsContent>

              <TabsContent value="votes">
                <div className="text-center py-8 text-muted-foreground">
                  Most voted questions will be shown here
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Tags</CardTitle>
                <CardDescription>
                  Tags commonly used with {tag.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {relatedTags.map((relatedTag: { name: string; count: number }, idx: number) => (
                  <div key={relatedTag.name + '-' + idx} className="flex items-center justify-between">
                    <Badge variant="outline">
                      <Link href={`/tags/${relatedTag.name}`}>{relatedTag.name}</Link>
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {relatedTag.count.toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <Link 
                    href="/tags" 
                    className="text-sm text-primary hover:underline"
                  >
                    View all tags →
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Tag Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tag Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium mb-1">When to use this tag</h4>
                  <p className="text-muted-foreground">
                    Use the [{tag.name}] tag for questions specifically about {tag.name} 
                    language features, syntax, or best practices.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Avoid using for</h4>
                  <p className="text-muted-foreground">
                    General programming questions that aren&apos;t specific to {tag.name}.
                    Use more specific tags when possible.
                  </p>
                </div>
                <div className="pt-2 border-t">
                  <Link 
                    href="/help/tagging" 
                    className="text-primary hover:underline"
                  >
                    Learn more about tagging →
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tag Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Total questions:</span>
                  <span className="font-medium">{metrics.usageCount?.toLocaleString?.() ?? metrics.usageCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Answered:</span>
                  <span className="font-medium text-green-600">{metrics.answeredRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. score:</span>
                  <span className="font-medium">{metrics.avgScore}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active users:</span>
                  <span className="font-medium">{metrics.activeUsers?.toLocaleString?.() ?? metrics.activeUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span className="font-medium">{metrics.createdAt ? formatDate(metrics.createdAt) : ''}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
