"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { 
  ArrowUp, 
  ArrowDown, 
  MessageSquare, 
  Eye, 
  Calendar, 
  User, 
  Edit, 
  Share2, 
  Flag,
  Check,
  Bookmark
} from 'lucide-react'

// ...existing code...

export default function QuestionDetailPage() {
  const { data: session } = useSession()
  const params = useParams()
  const { toast } = useToast()
  const [question, setQuestion] = useState<any>(null)
  const [answers, setAnswers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newAnswer, setNewAnswer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch question and answers from backend
  // Runs on mount and when params.id changes
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const qRes = await fetch(`/api/questions/${params.id}`)
      const qData = await qRes.json()
      setQuestion(qData)
      const aRes = await fetch(`/api/questions/${params.id}/answers`)
      const aData = await aRes.json()
      console.log('Fetched answers:', aData)
      console.log('Fetched question:', qData)
      setAnswers(aData)
      setLoading(false)
    }
    if (params.id) fetchData()
  }, [params.id])

  const handleVote = async (type: 'upvote' | 'downvote', targetType: 'question' | 'answer', targetId: string) => {
    if (!session) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to vote.',
        variant: 'destructive',
      })
      return
    }

    try {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voteType: type,
          targetType,
          targetId,
        }),
      })

      if (response.ok) {
        toast({
          title: 'Vote recorded',
          description: `${type === 'upvote' ? 'Upvoted' : 'Downvoted'} successfully.`,
        })
        // Refresh the page or update state
      } else {
        throw new Error('Failed to vote')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to record vote. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleSubmitAnswer = async () => {
    if (!session) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to answer.',
        variant: 'destructive',
      })
      return
    }

    if (!newAnswer.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter an answer.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/questions/${params.id}/answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: newAnswer,
        }),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Answer submitted successfully!',
        })
        setNewAnswer('')
        // Refresh answers or update state
      } else {
        throw new Error('Failed to submit answer')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit answer. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto max-w-6xl py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Question */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-4">{question?.title}</h1>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(question?.tags) && question.tags.map((tag: any) => (
                      <Badge key={typeof tag === 'string' ? tag : tag._id} variant="secondary">
                        <Link href={`/tags/${typeof tag === 'string' ? tag : tag.slug}`}>{typeof tag === 'string' ? tag : tag.name}</Link>
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6">
                {/* Vote Column */}
                <div className="flex flex-col items-center space-y-2 min-w-12">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleVote('upvote', 'question', question?._id)}
                  >
                    <ArrowUp className="h-5 w-5" />
                  </Button>
                  <span className="text-lg font-medium">{question?.votes?.score ?? 0}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleVote('downvote', 'question', question?._id)}
                  >
                    <ArrowDown className="h-5 w-5" />
                  </Button>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div className="prose max-w-none">
                    {question?.body?.split('\n').map((paragraph: string, i: number) => {
                      if (paragraph.startsWith('```')) {
                        return (
                          <pre key={`code-${i}`} className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <code>{paragraph.replace(/```\w*\n?/g, '')}</code>
                          </pre>
                        )
                      }
                      return paragraph.trim() ? <p key={`para-${i}`}>{paragraph}</p> : null
                    })}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{question?.views ?? 0} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Asked {question?.createdAt ? new Date(question.createdAt).toLocaleDateString() : ''}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4" />
                      <Link href={`/users/${question?.author?._id ?? question?.author?.id ?? ''}`} className="font-medium hover:text-primary">
                        {question?.author?.name ?? 'Unknown'}
                      </Link>
                      <span className="text-muted-foreground">
                        {question?.author?.reputation ?? 0} rep
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Answers */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">
              {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
            </h2>

            {answers.map((answer: any) => (
              <Card key={answer._id} className={answer.isAccepted ? 'border-green-500' : ''}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Vote Column */}
                    <div className="flex flex-col items-center space-y-2 min-w-12">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleVote('upvote', 'answer', answer._id)}
                      >
                        <ArrowUp className="h-5 w-5" />
                      </Button>
                      <span className="text-lg font-medium">{answer.votes?.score ?? 0}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleVote('downvote', 'answer', answer._id)}
                      >
                        <ArrowDown className="h-5 w-5" />
                      </Button>
                      {answer.isAccepted && (
                        <div className="text-green-500">
                          <Check className="h-6 w-6" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div className="prose max-w-none">
                        {answer.body?.split('\n').map((paragraph: string, i: number) => {
                          if (paragraph.startsWith('```')) {
                            return (
                              <pre key={`code-${i}`} className="bg-muted p-4 rounded-lg overflow-x-auto">
                                <code>{paragraph.replace(/```\w*\n?/g, '')}</code>
                              </pre>
                            )
                          }
                          return paragraph.trim() ? <p key={`para-${i}`}>{paragraph}</p> : null
                        })}
                      </div>

                      {/* Comments */}
                      {Array.isArray(answer.comments) && answer.comments.length > 0 && (
                        <div className="border-t pt-4 space-y-2">
                          {answer.comments.map((comment: any) => (
                            <div key={comment._id ?? comment.id} className="text-sm bg-muted/50 p-3 rounded">
                              <p>{comment.body}</p>
                              <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                                <Link href={`/users/${comment.author?._id ?? comment.author?.id ?? ''}`} className="font-medium hover:text-primary">
                                  {comment.author?.name ?? 'Unknown'}
                                </Link>
                                <span>•</span>
                                <span>{comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ''}</span>
                                {comment.likes > 0 && (
                                  <>
                                    <span>•</span>
                                    <span>{comment.likes} likes</span>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Author Info */}
                      <div className="flex items-center justify-end text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <Link href={`/users/${answer.author?._id ?? answer.author?.id ?? ''}`} className="font-medium hover:text-primary">
                            {answer.author?.name ?? 'Unknown'}
                          </Link>
                          <span className="text-muted-foreground">
                            {answer.author?.reputation ?? 0} rep
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">
                            {answer.createdAt ? new Date(answer.createdAt).toLocaleDateString() : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Answer Form */}
          {session ? (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Your Answer</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="write" className="w-full">
                  <TabsList className="flex flex-col sm:grid sm:grid-cols-2 w-full">
                    <TabsTrigger value="write">
                      <Edit className="h-4 w-4 mr-2" />
                      Write
                    </TabsTrigger>
                    <TabsTrigger value="preview">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="write">
                    <Textarea
                      placeholder="Write your answer here. Be detailed and helpful."
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      className="min-h-[200px]"
                      disabled={isSubmitting}
                    />
                  </TabsContent>
                  <TabsContent value="preview">
                    <div className="border rounded-md p-4 min-h-[200px] bg-muted/50">
                      {newAnswer ? (
                        <div className="prose max-w-none">
                          {newAnswer.split('\n').map((line, i) => (
                            <p key={`answer-line-${i}`}>{line}</p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Nothing to preview</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
                <div className="flex gap-4">
                  <Button onClick={handleSubmitAnswer} disabled={isSubmitting || !newAnswer.trim()}>
                    {isSubmitting ? 'Submitting...' : 'Post Your Answer'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  You must be signed in to answer this question.
                </p>
                <Button asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Related Questions */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Related Questions</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                'How to setup NextAuth with MongoDB?',
                'Next.js 14 middleware authentication',
                'JWT vs Session tokens in Next.js'
              ].map((title, i) => (
                <Link
                  key={`related-${i}`}
                  href={`/questions/${i + 2}`}
                  className="block text-sm hover:text-primary transition-colors"
                >
                  {title}
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Question Stats */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Question Stats</h3>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Asked</span>
                <span>{question?.createdAt ? new Date(question.createdAt).toLocaleDateString() : ''}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Viewed</span>
                <span>{question?.views ?? 0} times</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Answers</span>
                <span>{answers.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
