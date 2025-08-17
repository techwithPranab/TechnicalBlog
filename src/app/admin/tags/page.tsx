"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Tag,
  TrendingUp,
  Hash
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface TagData {
  _id: string
  name: string
  description?: string
  color: string
  usageCount: number
  createdAt: string
}

export default function TagsManagement() {
  const [tags, setTags] = useState<TagData[]>([])
  const [filteredTags, setFilteredTags] = useState<TagData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingTag, setEditingTag] = useState<TagData | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3b82f6'
  })
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    checkAuth()
    fetchTags()
  }, [])

  useEffect(() => {
    filterTags()
  }, [tags, searchTerm])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    }
  }

  const fetchTags = async () => {
    try {
      // Mock data for now - implement actual API call
      const mockTags: TagData[] = [
        {
          _id: '1',
          name: 'javascript',
          description: 'Questions about JavaScript programming language',
          color: '#f7df1e',
          usageCount: 1250,
          createdAt: '2024-01-15T10:00:00Z'
        },
        {
          _id: '2',
          name: 'react',
          description: 'React.js library and framework questions',
          color: '#61dafb',
          usageCount: 890,
          createdAt: '2024-01-10T14:30:00Z'
        },
        {
          _id: '3',
          name: 'typescript',
          description: 'TypeScript language and type system',
          color: '#3178c6',
          usageCount: 675,
          createdAt: '2024-01-08T09:15:00Z'
        },
        {
          _id: '4',
          name: 'python',
          description: 'Python programming language',
          color: '#3776ab',
          usageCount: 1100,
          createdAt: '2024-01-05T16:45:00Z'
        },
        {
          _id: '5',
          name: 'node.js',
          description: 'Node.js runtime and related technologies',
          color: '#339933',
          usageCount: 560,
          createdAt: '2024-01-03T11:20:00Z'
        }
      ]
      setTags(mockTags)
    } catch (error) {
      console.error('Error fetching tags:', error)
      toast({
        title: "Error",
        description: "Failed to fetch tags",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterTags = () => {
    let filtered = tags
    if (searchTerm) {
      filtered = tags.filter(tag =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tag.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    setFilteredTags(filtered)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingTag) {
        // Update existing tag
        toast({
          title: "Success",
          description: "Tag updated successfully",
        })
      } else {
        // Create new tag
        toast({
          title: "Success",
          description: "Tag created successfully",
        })
      }
      
      resetForm()
      fetchTags()
    } catch (error) {
      console.error('Error saving tag:', error)
      toast({
        title: "Error",
        description: "Failed to save tag",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (tagId: string) => {
    if (!confirm('Are you sure you want to delete this tag? This action cannot be undone.')) {
      return
    }

    try {
      // Implement delete API call
      toast({
        title: "Success",
        description: "Tag deleted successfully",
      })
      fetchTags()
    } catch (error) {
      console.error('Error deleting tag:', error)
      toast({
        title: "Error",
        description: "Failed to delete tag",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      color: '#3b82f6'
    })
    setShowCreateForm(false)
    setEditingTag(null)
  }

  const startEdit = (tag: TagData) => {
    setFormData({
      name: tag.name,
      description: tag.description || '',
      color: tag.color
    })
    setEditingTag(tag)
    setShowCreateForm(true)
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
                <h1 className="text-2xl font-bold">Tags Management</h1>
                <p className="text-muted-foreground">Organize and manage question tags</p>
              </div>
            </div>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Tag
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Search tags by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold">{tags.length}</p>
                <p className="text-sm text-muted-foreground">Total Tags</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tags Grid */}
        <div className="grid gap-6">
          {filteredTags.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No tags found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? 'No tags match your search criteria.' : 'No tags have been created yet.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTags.map((tag) => (
                <Card key={tag._id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: tag.color }}
                        />
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Hash className="h-4 w-4" />
                            {tag.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {tag.usageCount} uses
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tag.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {tag.description}
                        </p>
                      )}
                      
                      <div className="text-xs text-muted-foreground">
                        Created: {new Date(tag.createdAt).toLocaleDateString()}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEdit(tag)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(tag._id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Create/Edit Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>
                  {editingTag ? 'Edit Tag' : 'Create New Tag'}
                </CardTitle>
                <CardDescription>
                  {editingTag ? 'Update the tag information' : 'Add a new tag to organize questions'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="tag-name" className="text-sm font-medium">Name</label>
                    <Input
                      id="tag-name"
                      placeholder="e.g., javascript, react, python"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="tag-description" className="text-sm font-medium">Description</label>
                    <Textarea
                      id="tag-description"
                      placeholder="Brief description of what this tag represents..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="tag-color" className="text-sm font-medium">Color</label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="tag-color"
                        type="color"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        placeholder="#3b82f6"
                        className="flex-1"
                      />
                    </div>
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
                        return editingTag ? 'Update' : 'Create'
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
