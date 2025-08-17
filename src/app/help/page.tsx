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
  HelpCircle,
  ExternalLink,
  Star,
  Clock,
  Eye
} from 'lucide-react'

export default function HelpCenterPage() {
  const categories = [
    {
      title: "Getting Started",
      icon: <BookOpen className="h-6 w-6" />,
      description: "New to TechBlog? Learn the basics",
      articles: [
        { title: "How to create your first question", views: 1250, helpful: 95 },
        { title: "Writing good answers that get upvoted", views: 890, helpful: 88 },
        { title: "Understanding the reputation system", views: 670, helpful: 92 },
        { title: "Setting up your profile", views: 450, helpful: 85 }
      ]
    },
    {
      title: "Asking Questions",
      icon: <MessageSquare className="h-6 w-6" />,
      description: "Tips for getting great answers",
      articles: [
        { title: "How to ask a good question", views: 2100, helpful: 97 },
        { title: "Choosing the right tags", views: 780, helpful: 89 },
        { title: "Providing a minimal reproducible example", views: 920, helpful: 94 },
        { title: "What to do when no one answers", views: 340, helpful: 82 }
      ]
    },
    {
      title: "Community Guidelines",
      icon: <Users className="h-6 w-6" />,
      description: "How to be a good community member",
      articles: [
        { title: "Code of conduct and community standards", views: 1450, helpful: 91 },
        { title: "How to give constructive feedback", views: 520, helpful: 86 },
        { title: "Reporting inappropriate content", views: 380, helpful: 88 },
        { title: "Understanding voting and moderation", views: 610, helpful: 90 }
      ]
    },
    {
      title: "Technical Help",
      icon: <Code className="h-6 w-6" />,
      description: "Using TechBlog&apos;s features effectively",
      articles: [
        { title: "Formatting code in questions and answers", views: 1680, helpful: 96 },
        { title: "Using markdown for better formatting", views: 740, helpful: 89 },
        { title: "Embedding images and links", views: 590, helpful: 87 },
        { title: "Keyboard shortcuts and productivity tips", views: 420, helpful: 84 }
      ]
    },
    {
      title: "Account & Privacy",
      icon: <Shield className="h-6 w-6" />,
      description: "Managing your account and privacy",
      articles: [
        { title: "Account security and two-factor authentication", views: 890, helpful: 93 },
        { title: "Privacy settings and data control", views: 650, helpful: 88 },
        { title: "Deleting or deactivating your account", views: 230, helpful: 85 },
        { title: "Managing email notifications", views: 540, helpful: 90 }
      ]
    },
    {
      title: "Troubleshooting",
      icon: <Settings className="h-6 w-6" />,
      description: "Common issues and solutions",
      articles: [
        { title: "Why can&apos;t I post questions or answers?", views: 760, helpful: 91 },
        { title: "Login and authentication problems", views: 480, helpful: 87 },
        { title: "Site performance and loading issues", views: 320, helpful: 83 },
        { title: "Mobile app troubleshooting", views: 290, helpful: 80 }
      ]
    }
  ]

  const popularArticles = [
    {
      title: "How to ask a good question",
      category: "Asking Questions",
      views: 2100,
      helpful: 97,
      lastUpdated: "2024-01-15"
    },
    {
      title: "Formatting code in questions and answers",
      category: "Technical Help",
      views: 1680,
      helpful: 96,
      lastUpdated: "2024-01-12"
    },
    {
      title: "Code of conduct and community standards",
      category: "Community Guidelines",
      views: 1450,
      helpful: 91,
      lastUpdated: "2024-01-10"
    },
    {
      title: "How to create your first question",
      category: "Getting Started",
      views: 1250,
      helpful: 95,
      lastUpdated: "2024-01-08"
    }
  ]

  const quickLinks = [
    { title: "Contact Support", href: "/contact", icon: <MessageSquare className="h-4 w-4" /> },
    { title: "Community Guidelines", href: "/community-guidelines", icon: <Users className="h-4 w-4" /> },
    { title: "Terms of Service", href: "/terms", icon: <Shield className="h-4 w-4" /> },
    { title: "Privacy Policy", href: "/privacy", icon: <Shield className="h-4 w-4" /> },
    { title: "Give Feedback", href: "/feedback", icon: <MessageSquare className="h-4 w-4" /> },
    { title: "FAQ", href: "/faq", icon: <HelpCircle className="h-4 w-4" /> }
  ]

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Help Center</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions, learn how to use TechBlog effectively, 
            and get help from our community.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search help articles..."
              className="pl-12 h-12 text-lg"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            <Badge variant="outline">getting started</Badge>
            <Badge variant="outline">asking questions</Badge>
            <Badge variant="outline">formatting</Badge>
            <Badge variant="outline">account settings</Badge>
            <Badge variant="outline">community guidelines</Badge>
          </div>
        </div>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>
              Common resources and important pages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {quickLinks.map((link) => (
                <Link key={link.title} href={link.href}>
                  <div className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors">
                    {link.icon}
                    <span className="text-sm font-medium">{link.title}</span>
                    <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Articles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Most Helpful Articles
            </CardTitle>
            <CardDescription>
              The most viewed and helpful articles from our community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularArticles.map((article) => (
                <div key={article.title} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <Link href="#" className="font-medium hover:text-primary">
                      {article.title}
                    </Link>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {article.views} views
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {article.helpful}% helpful
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Updated {new Date(article.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Help Categories */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.title} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-primary">{category.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.articles.map((article) => (
                      <div key={article.title} className="group">
                        <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                          {article.title}
                        </Link>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>{article.views} views</span>
                          <span>{article.helpful}% helpful</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View All Articles
                  </Button>
                </CardContent>
              </Card>
            ))}
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
                <Link href="/community-guidelines">
                  <Users className="h-4 w-4 mr-2" />
                  Ask the Community
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Help Us Improve</CardTitle>
            <CardDescription>
              Your feedback helps us create better help resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Was this page helpful?</h4>
                <p className="text-sm text-muted-foreground">
                  Let us know how we can improve our help center
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  👍 Yes
                </Button>
                <Button size="sm" variant="outline">
                  👎 No
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
