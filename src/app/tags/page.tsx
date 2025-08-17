"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp, Hash } from 'lucide-react';

export default function TagsPage() {
  const [tags, setTags] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function fetchTags() {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`/api/tags?search=${encodeURIComponent(search)}`)
        const data = await res.json()
        setTags(data.tags || [])
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch tags')
      } finally {
        setLoading(false)
      }
    }
    fetchTags()
  }, [search])

  const sortedTags = [...tags].sort((a: any, b: any) => (b.usageCount || 0) - (a.usageCount || 0))

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Tags</h1>
          <p className="text-muted-foreground">
            A tag is a keyword or label that categorizes your question with other, similar questions. 
            Using the right tags makes it easier for others to find and answer your question.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tags..."
            className="pl-10"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Loading/Error States */}
        {loading && <div className="text-center py-8 text-muted-foreground">Loading tags...</div>}
        {error && <div className="text-center py-8 text-destructive">{error}</div>}

        {/* Stats */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tags</CardTitle>
                <Hash className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tags.length}</div>
                <p className="text-xs text-muted-foreground">
                  Across all categories
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sortedTags[0]?.name}</div>
                <p className="text-xs text-muted-foreground">
                  {sortedTags[0]?.usageCount?.toLocaleString()} questions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
                <Hash className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {tags.reduce((sum: number, tag: any) => sum + (tag.usageCount || 0), 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Tagged questions
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tags Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTags.map((tag: any) => (
              <Card key={tag._id || tag.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Link href={`/tags/${tag.slug}`}>
                      <Badge 
                        variant="secondary" 
                        className="text-sm px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors"
                        style={{ backgroundColor: `${tag.color || '#3b82f6'}20`, color: tag.color || '#3b82f6', borderColor: tag.color || '#3b82f6' }}
                      >
                        {tag.name}
                      </Badge>
                    </Link>
                    <span className="text-sm text-muted-foreground">
                      {(tag.usageCount || 0).toLocaleString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">
                    {tag.description}
                  </CardDescription>
                  <div className="mt-4 pt-4 border-t">
                    <Link 
                      href={`/tags/${tag.slug}`}
                      className="text-sm text-primary hover:underline"
                    >
                      View questions →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Popular Tag Categories */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Frontend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['react', 'javascript', 'css', 'html'].map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Link href={`/tags/${tag}`}>{tag}</Link>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Backend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['nodejs', 'python', 'java', 'api'].map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Link href={`/tags/${tag}`}>{tag}</Link>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Frameworks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['nextjs', 'react', 'express', 'django'].map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Link href={`/tags/${tag}`}>{tag}</Link>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Databases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['mongodb', 'postgresql', 'mysql', 'redis'].map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Link href={`/tags/${tag}`}>{tag}</Link>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Getting Started */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to use tags effectively</CardTitle>
            <CardDescription>
              Follow these guidelines to get the most out of tags
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Choose relevant tags</h4>
              <p className="text-sm text-muted-foreground">
                Select tags that accurately describe the technologies, languages, or concepts in your question.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Use specific tags</h4>
              <p className="text-sm text-muted-foreground">
                Instead of just &quot;javascript&quot;, also include specific frameworks like &quot;react&quot; or &quot;nextjs&quot; if applicable.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Limit your tags</h4>
              <p className="text-sm text-muted-foreground">
                Use 1-5 tags per question. Too many tags can make your question harder to categorize.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Check existing tags</h4>
              <p className="text-sm text-muted-foreground">
                Use existing popular tags when possible to increase visibility and consistency.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
