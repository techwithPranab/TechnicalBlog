"use client";
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageSquare, Users, Code, TrendingUp } from 'lucide-react'

export default function HomePage() {
  const [metrics, setMetrics] = useState({
    questions: 0,
    developers: 0,
    answers: 0,
    answeredRate: 0
  })
  const [popularTags, setPopularTags] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchStats() {
      setLoading(true)
      setError('')
      try {
        const res = await fetch('/api/stats')
        const data = await res.json()
        setMetrics({
          questions: data.questions || 0,
          developers: data.users || 0,
          answers: data.answers || 0,
          answeredRate: data.answered_rate || 0
        })
      } catch (err: any) {
        setError('Failed to fetch metrics')
      } finally {
        setLoading(false)
      }
    }

    async function fetchPopularTags() {
      try {
        const res = await fetch('/api/tags?sort=usage&limit=12')
        const data = await res.json()
        setPopularTags(data.tags || [])
      } catch (err: any) {
        console.error('Failed to fetch popular tags:', err)
      }
    }

    fetchStats()
    fetchPopularTags()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Where Developers Learn, Share & Build
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of developers to ask questions, share knowledge, and learn together. 
            Get help with coding problems and help others grow.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <Link href="/questions/ask">
                Ask Question
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/questions">Browse Questions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading metrics...</div>
          ) : error ? (
            <div className="text-center py-8 text-destructive">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="flex justify-center">
                  <MessageSquare className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">{metrics.questions.toLocaleString()}</h3>
                <p className="text-muted-foreground">Questions Asked</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-center">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">{metrics.developers.toLocaleString()}</h3>
                <p className="text-muted-foreground">Developers</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-center">
                  <Code className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">{metrics.answers.toLocaleString()}</h3>
                <p className="text-muted-foreground">Answers</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-center">
                  <TrendingUp className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">{Math.round(metrics.answeredRate)}%</h3>
                <p className="text-muted-foreground">Questions Answered</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TechBlog?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Expert Community</h3>
              <p className="text-muted-foreground">
                Get answers from experienced developers and industry experts who are passionate about helping others.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Code-First Approach</h3>
              <p className="text-muted-foreground">
                Share code snippets, get syntax highlighting, and collaborate on real coding problems with ease.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Reputation System</h3>
              <p className="text-muted-foreground">
                Build your reputation by providing helpful answers and contributing to the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tags Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Technologies</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {popularTags.length > 0 ? (
              popularTags.map((tag) => (
                <Link
                  key={tag._id}
                  href={`/tags/${tag.slug}`}
                  className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full transition-colors"
                >
                  {tag.name}
                </Link>
              ))
            ) : (
              // Fallback to static tags if backend fails
              ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 
               'Python', 'Java', 'CSS', 'HTML', 'MongoDB', 'PostgreSQL', 'Git'].map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag.toLowerCase()}`}
                  className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full transition-colors"
                >
                  {tag}
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start asking questions, sharing knowledge, and building your reputation today.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/auth/signup">Get Started Free</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
