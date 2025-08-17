"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  MessageSquare, 
  Lightbulb, 
  Bug, 
  Star, 
  Heart, 
  Send, 
  CheckCircle,
  Zap,
  Target,
  Smile,
  Frown,
  Meh
} from 'lucide-react'

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    type: '',
    rating: 0,
    title: '',
    description: '',
    email: '',
    anonymous: false
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const feedbackTypes = [
    {
      id: 'feature',
      title: 'Feature Request',
      icon: <Lightbulb className="h-5 w-5" />,
      description: 'Suggest new features or improvements',
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    {
      id: 'bug',
      title: 'Bug Report',
      icon: <Bug className="h-5 w-5" />,
      description: 'Report issues or problems you encountered',
      color: 'bg-red-50 border-red-200 text-red-700'
    },
    {
      id: 'general',
      title: 'General Feedback',
      icon: <MessageSquare className="h-5 w-5" />,
      description: 'Share your thoughts about TechBlog',
      color: 'bg-green-50 border-green-200 text-green-700'
    },
    {
      id: 'praise',
      title: 'Praise',
      icon: <Heart className="h-5 w-5" />,
      description: 'Tell us what you love about TechBlog',
      color: 'bg-pink-50 border-pink-200 text-pink-700'
    }
  ]

  const ratingLabels = [
    { value: 1, label: 'Poor', icon: <Frown className="h-5 w-5" />, color: 'text-red-500' },
    { value: 2, label: 'Fair', icon: <Frown className="h-5 w-5" />, color: 'text-orange-500' },
    { value: 3, label: 'Good', icon: <Meh className="h-5 w-5" />, color: 'text-yellow-500' },
    { value: 4, label: 'Very Good', icon: <Smile className="h-5 w-5" />, color: 'text-green-500' },
    { value: 5, label: 'Excellent', icon: <Smile className="h-5 w-5" />, color: 'text-green-600' }
  ]

  const recentFeedback = [
    {
      type: 'Feature Request',
      title: 'Dark mode toggle in header',
      status: 'Implemented',
      date: '2024-01-10',
      votes: 45
    },
    {
      type: 'Bug Report',
      title: 'Search not working on mobile',
      status: 'Fixed',
      date: '2024-01-08',
      votes: 23
    },
    {
      type: 'Feature Request',
      title: 'Code syntax highlighting',
      status: 'In Progress',
      date: '2024-01-05',
      votes: 67
    },
    {
      type: 'General Feedback',
      title: 'Love the new design!',
      status: 'Acknowledged',
      date: '2024-01-03',
      votes: 89
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Feedback submitted:', formData)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        type: '',
        rating: 0,
        title: '',
        description: '',
        email: '',
        anonymous: false
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Implemented':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Implemented</Badge>
      case 'Fixed':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Fixed</Badge>
      case 'In Progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">In Progress</Badge>
      case 'Acknowledged':
        return <Badge variant="secondary">Acknowledged</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto py-16">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Feedback!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            We really appreciate you taking the time to help us improve TechBlog. 
            Your feedback helps make our platform better for everyone.
          </p>
          <div className="p-6 bg-muted rounded-lg mb-8">
            <h3 className="font-semibold mb-2">What happens next?</h3>
            <ul className="text-sm text-muted-foreground space-y-1 text-left max-w-md mx-auto">
              <li>• Our team will review your feedback within 48 hours</li>
              <li>• You&apos;ll receive updates if we implement your suggestion</li>
              <li>• Bug reports are prioritized and tracked internally</li>
              <li>• Feature requests are considered for future releases</li>
            </ul>
          </div>
          <Button onClick={() => setIsSubmitted(false)}>
            Submit More Feedback
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Send Us Feedback</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your feedback helps us build a better TechBlog. Whether it&apos;s a bug report, 
            feature request, or just letting us know what you think, we want to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Share Your Feedback
                </CardTitle>
                <CardDescription>
                  Help us understand what you&apos;d like to see improved or added to TechBlog.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Feedback Type */}
                  <div className="space-y-3">
                    <Label>What type of feedback do you have?</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {feedbackTypes.map((type) => (
                        <div
                          key={type.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            formData.type === type.id
                              ? type.color
                              : 'border-border hover:bg-muted/50'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, type: type.id }))}
                        >
                          <div className="flex items-center gap-3">
                            {type.icon}
                            <div>
                              <h4 className="font-medium">{type.title}</h4>
                              <p className="text-xs text-muted-foreground">{type.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="space-y-3">
                    <Label>How would you rate your overall experience?</Label>
                    <div className="flex gap-2">
                      {ratingLabels.map((rating) => (
                        <div
                          key={rating.value}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors flex flex-col items-center gap-1 ${
                            formData.rating === rating.value
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:bg-muted/50'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, rating: rating.value }))}
                        >
                          <div className={rating.color}>{rating.icon}</div>
                          <span className="text-xs">{rating.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Brief summary of your feedback"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Details *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Please provide detailed feedback. For bug reports, include steps to reproduce the issue. For feature requests, describe what you'd like to see and why it would be helpful."
                      rows={6}
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (optional)</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      We&apos;ll only use your email to follow up on your feedback if needed.
                    </p>
                  </div>

                  {/* Submit */}
                  <Button type="submit" className="w-full" disabled={!formData.type || !formData.title || !formData.description}>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Bug className="h-4 w-4 mr-2" />
                  Report a Bug
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Suggest Feature
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Star className="h-4 w-4 mr-2" />
                  Rate TechBlog
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>

            {/* Recent Feedback */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Community Feedback</CardTitle>
                <CardDescription>
                  See what others are saying and what we&apos;re working on
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentFeedback.map((feedback, index) => (
                  <div key={index} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {feedback.type}
                      </Badge>
                      {getStatusBadge(feedback.status)}
                    </div>
                    <h4 className="font-medium text-sm">{feedback.title}</h4>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{new Date(feedback.date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {feedback.votes}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Feedback Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Feedback Received</span>
                  <span className="font-bold">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Features Implemented</span>
                  <span className="font-bold text-green-600">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bugs Fixed</span>
                  <span className="font-bold text-blue-600">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Response Rate</span>
                  <span className="font-bold text-purple-600">98%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Feature Roadmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              What We&apos;re Working On
            </CardTitle>
            <CardDescription>
              Upcoming features and improvements based on your feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
                <h4 className="font-medium mb-1">Advanced Search</h4>
                <p className="text-sm text-muted-foreground">Better filters and search capabilities</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-blue-500" />
                  <Badge variant="secondary">In Development</Badge>
                </div>
                <h4 className="font-medium mb-1">AI-Powered Suggestions</h4>
                <p className="text-sm text-muted-foreground">Smart question and answer recommendations</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-green-500" />
                  <Badge variant="secondary">Planned</Badge>
                </div>
                <h4 className="font-medium mb-1">Real-time Chat</h4>
                <p className="text-sm text-muted-foreground">Instant messaging for quick help</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
