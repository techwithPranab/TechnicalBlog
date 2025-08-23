"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { questionCreateSchema, type QuestionCreate } from '@/lib/validations'
import { useToast } from '@/hooks/use-toast'
import { X, Plus, Eye, Edit } from 'lucide-react'

export default function AskQuestionPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<QuestionCreate>({
    resolver: zodResolver(questionCreateSchema),
  })

  const bodyValue = watch('body')

  // Handle tag input
  const handleTagAdd = () => {
    const trimmedTag = tagInput.trim().toLowerCase()
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      const newTags = [...tags, trimmedTag]
      setTags(newTags)
      setValue('tags', newTags)
      setTagInput('')
    }
  }

  const handleTagRemove = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove)
    setTags(newTags)
    setValue('tags', newTags)
  }

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      handleTagAdd()
    }
  }

  const onSubmit = async (data: QuestionCreate) => {
    if (!session) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to ask a question.',
        variant: 'destructive',
      })
      router.push('/auth/signin')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      console.log('Create question response:', result)
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create question')
      }

      toast({
        title: 'Success',
        description: 'Question created successfully!',
      })

      router.push(`/questions/${result._id}`)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!session) {
    return (
      <div className="container mx-auto max-w-2xl py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Sign in required</h1>
        <p className="text-muted-foreground mb-6">
          You need to be signed in to ask a question.
        </p>
        <Button onClick={() => router.push('/auth/signin')}>
          Sign In
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Ask a Question</h1>
          <p className="text-muted-foreground">
            Share your knowledge and help the community by asking a clear, detailed question.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="What's your programming question? Be specific."
                  {...register('title')}
                  disabled={isLoading}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              {/* Body */}
              <div className="space-y-2">
                <Label htmlFor="body">Question Details *</Label>
                <Tabs defaultValue="write" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
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
                      id="body"
                      placeholder="Describe your problem in detail. Include what you've tried and what specific help you need."
                      className="min-h-[200px]"
                      {...register('body')}
                      disabled={isLoading}
                    />
                  </TabsContent>
                  <TabsContent value="preview">
                    <div className="border rounded-md p-4 min-h-[200px] bg-muted/50">
                      {bodyValue ? (
                        <div className="prose max-w-none">
                          {bodyValue.split('\n').map((line, i) => (
                            <p key={`line-${i}-${line.slice(0, 10)}`}>{line}</p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Nothing to preview</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
                {errors.body && (
                  <p className="text-sm text-destructive">{errors.body.message}</p>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags * (up to 5)</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => handleTagRemove(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag (e.g., javascript, react, nodejs)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyPress}
                    disabled={isLoading || tags.length >= 5}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleTagAdd}
                    disabled={!tagInput.trim() || tags.length >= 5}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {errors.tags && (
                  <p className="text-sm text-destructive">{errors.tags.message}</p>
                )}
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Publishing...' : 'Publish Question'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>

          {/* Tips Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Writing Tips</CardTitle>
                <CardDescription>
                  Follow these guidelines to get better answers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Make your title specific</h4>
                  <p className="text-sm text-muted-foreground">
                    Include the programming language, framework, or specific technology you&apos;re using.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Provide context</h4>
                  <p className="text-sm text-muted-foreground">
                    Explain what you&apos;re trying to achieve and what you&apos;ve already tried.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Include code examples</h4>
                  <p className="text-sm text-muted-foreground">
                    Show relevant code snippets that demonstrate your problem.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Use relevant tags</h4>
                  <p className="text-sm text-muted-foreground">
                    Add tags for technologies, languages, and frameworks related to your question.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Markdown Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div><code>**bold**</code> → <strong>bold</strong></div>
                <div><code>*italic*</code> → <em>italic</em></div>
                <div><code>`code`</code> → <code>code</code></div>
                <div><code>```code block```</code></div>
                <div><code>[link](url)</code> → link</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
