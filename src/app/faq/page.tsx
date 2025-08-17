"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Search, ChevronDown, MessageSquare, Users, Code, Shield, HelpCircle, Star } from 'lucide-react'

import { useEffect, useState } from 'react'
// ...existing code...

const categoryIcons: Record<string, JSX.Element> = {
  'Getting Started': <HelpCircle className="h-5 w-5" />,
  'Asking Questions': <MessageSquare className="h-5 w-5" />,
  'Community & Moderation': <Users className="h-5 w-5" />,
  'Technical Issues': <Code className="h-5 w-5" />,
  'Account & Privacy': <Shield className="h-5 w-5" />,
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

interface FAQCategory {
  category: string;
  icon: JSX.Element;
  questions: FAQ[];
}

export default function FAQPage() {
  const [faqCategories, setFaqCategories] = useState<FAQCategory[]>([])
  // Removed unused loading state

  useEffect(() => {
    fetch('/api/faq')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data: FAQ[]) => {
        console.log('FAQ data received:', data)
        // Group FAQs by category
        const grouped: Record<string, FAQ[]> = data.reduce((acc: Record<string, FAQ[]>, faq: FAQ) => {
          if (!acc[faq.category]) acc[faq.category] = []
          acc[faq.category].push(faq)
          return acc
        }, {})
        console.log('Grouped data:', grouped)
        // Convert to array for rendering
        setFaqCategories(Object.entries(grouped).map(([category, questions]) => ({
          category,
          icon: categoryIcons[category] || <HelpCircle className="h-5 w-5" />,
          questions
        })))
      })
      .catch(error => {
        console.error('Error fetching FAQs:', error)
      })
  }, [])

  const quickAnswers = [
    {
      question: "How long does it take to get an answer?",
      answer: "Most questions receive an answer within a few hours, though complex questions may take longer.",
      popular: true
    },
    {
      question: "Can I answer my own question?",
      answer: "Yes! Self-answers are encouraged when you solve your own problem and want to help others.",
      popular: true
    },
    {
      question: "What's the difference between upvote and accept?",
      answer: "Upvotes indicate helpful content. Accepting marks the answer that solved your specific problem.",
      popular: true
    },
    {
      question: "Is there a mobile app?",
      answer: "Yes, we have native mobile apps for iOS and Android with full functionality.",
      popular: false
    }
  ]

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quick answers to the most common questions about using TechBlog effectively.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search frequently asked questions..."
              className="pl-12 h-12"
            />
          </div>
        </div>

        {/* Quick Answers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Quick Answers
            </CardTitle>
            <CardDescription>
              The most popular questions with quick answers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickAnswers.map((qa) => (
              <div key={qa.question} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{qa.question}</h4>
                  {qa.popular && (
                    <Badge variant="secondary" className="text-xs">
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{qa.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {faqCategories.map((cat) => (
            <Card key={cat.category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {cat.icon}
                  {cat.category}
                </CardTitle>
                <CardDescription>
                  {cat.questions.length} frequently asked questions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {cat.questions.map((faq) => (
                  <Collapsible key={faq.question}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border rounded-lg hover:bg-muted/50 transition-colors">
                      <span className="font-medium">{faq.question}</span>
                      <ChevronDown className="h-4 w-4 transition-transform ui-open:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="pt-2 text-muted-foreground">
                        {faq.answer}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Still Need Help */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can&apos;t find what you&apos;re looking for? We&apos;re here to help with any other questions you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="/contact">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Support
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/help">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Browse Help Center
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/questions/ask">
                  <Users className="h-4 w-4 mr-2" />
                  Ask the Community
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Improve This Page</CardTitle>
            <CardDescription>
              Help us make our FAQ more helpful
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Missing a question? Think we could explain something better? Let us know!
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" size="sm">
                  Suggest a Question
                </Button>
                <Button variant="outline" size="sm">
                  Report an Issue
                </Button>
                <Button variant="outline" size="sm">
                  Rate This Page
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
