"use client"
import Link from 'next/link'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Search, MessageSquare, Eye, Calendar, User, ArrowUp, ArrowDown } from 'lucide-react'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

function QuestionsContent() {
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ questions: 0, answers: 0, users: 0 })
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsError, setStatsError] = useState('')
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    async function fetchQuestions() {
      //setLoading(true)
      const res = await fetch('/api/questions')
      const data = await res.json()
      setQuestions(data)
      //setLoading(false)
    }
    async function fetchStats() {
      setStatsLoading(true)
      setStatsError('')
      try {
        const res = await fetch('/api/stats')
        const data = await res.json()
        setStats({
          questions: data.questions || 0,
          answers: data.answers || 0,
          users: data.users || 0
        })
      } catch (err: any) {
        setStatsError('Failed to fetch stats')
      } finally {
        setStatsLoading(false)
      }
    }
    fetchQuestions()
    fetchStats()
  }, [])
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">All Questions</h1>
              <p className="text-muted-foreground">{loading ? 'Loading...' : `${questions.length} questions`}</p>
            </div>
            <Button asChild>
              <Link href="/questions/ask">Ask Question</Link>
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              className="pl-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <Tabs defaultValue="newest" className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="newest">Newest</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              <TabsTrigger value="votes">Most Votes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="newest" className="space-y-4">
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading...</div>
              ) : (
                questions
                  .filter(q => {
                    const qStr = `${q.title} ${q.body}`.toLowerCase();
                    return qStr.includes(searchQuery.toLowerCase());
                  })
                  .map((question) => (
                    <QuestionCard key={question._id} question={question} />
                  ))
              )}
            </TabsContent>
            
            <TabsContent value="active" className="space-y-4">
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading...</div>
              ) : (
                questions.map((question) => (
                  <QuestionCard key={question._id} question={question} />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="unanswered" className="space-y-4">
              <div className="text-center py-8">
                <p className="text-muted-foreground">No unanswered questions found.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="votes" className="space-y-4">
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading...</div>
              ) : (
                [...questions]
                  .sort((a, b) => (b.votes?.score || 0) - (a.votes?.score || 0))
                  .map((question) => (
                    <QuestionCard key={question._id} question={question} />
                  ))
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80">
          <div className="space-y-6">
            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Popular Tags</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['javascript', 'typescript', 'react', 'nextjs', 'nodejs', 'python'].map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Community Stats</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {statsLoading ? (
                  <div className="text-center py-4 text-muted-foreground">Loading stats...</div>
                ) : statsError ? (
                  <div className="text-center py-4 text-destructive">{statsError}</div>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Questions</span>
                      <span className="font-medium">{stats.questions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Answers</span>
                      <span className="font-medium">{stats.answers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Users</span>
                      <span className="font-medium">{stats.users.toLocaleString()}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function QuestionsPage() {
  return (
    <Suspense fallback={<div className="text-center py-8 text-muted-foreground">Loading...</div>}>
      <QuestionsContent />
    </Suspense>
  )
}

function QuestionCard({ question }: { readonly question: any }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Vote and Stats */}
          <div className="flex flex-col items-center space-y-2 text-sm text-muted-foreground min-w-16">
            <div className="flex flex-col items-center">
              <ArrowUp className="h-4 w-4" />
              <span className="font-medium">{question.votes?.score ?? 0}</span>
              <ArrowDown className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{question.answersCount ?? 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{question.views ?? 0}</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3">
            <div>
              <Link 
                href={`/questions/${question._id}`}
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                {question.title}
              </Link>
              <p className="text-muted-foreground mt-1 line-clamp-2">
                {question.body}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {Array.isArray(question.tags) && question.tags.map((tag: any) => (
                <Badge key={typeof tag === 'string' ? tag : tag._id} variant="secondary" className="text-xs">
                  {typeof tag === 'string' ? tag : tag.name}
                </Badge>
              ))}
            </div>

            {/* Author and Date */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{question.author?.name ?? 'Unknown'}</span>
                <span>•</span>
                <span>{question.author?.reputation ?? 0} rep</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{question.createdAt ? new Date(question.createdAt).toLocaleDateString() : ''}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
