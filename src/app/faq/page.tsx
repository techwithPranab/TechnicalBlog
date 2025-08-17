import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Search, ChevronDown, MessageSquare, Users, Code, Shield, HelpCircle, Star } from 'lucide-react'

export default function FAQPage() {
  const faqCategories = [
    {
      category: "Getting Started",
      icon: <HelpCircle className="h-5 w-5" />,
      questions: [
        {
          question: "How do I create an account on TechBlog?",
    answer: "You can create an account by clicking the &apos;Sign Up&apos; button in the top right corner. You can register using your email address or sign up with Google/GitHub for faster registration."
        },
        {
          question: "Is TechBlog free to use?",
          answer: "Yes! TechBlog is completely free to use. You can ask questions, provide answers, vote on content, and participate in the community without any cost."
        },
        {
          question: "How does the reputation system work?",
          answer: "You earn reputation points when other users upvote your questions and answers. Reputation reflects the trust the community has in you and unlocks additional privileges as you earn more points."
        },
        {
          question: "What makes a good first question?",
    answer: "A good first question is specific, well-researched, includes relevant code examples, and shows what you&apos;ve already tried. Make sure to use appropriate tags and follow our question guidelines."
        }
      ]
    },
    {
      category: "Asking Questions",
      icon: <MessageSquare className="h-5 w-5" />,
      questions: [
        {
          question: "How do I ask a good question?",
    answer: "Write a clear, specific title. Include relevant code examples and error messages. Explain what you expected vs. what actually happened. Show what you&apos;ve tried and use appropriate tags."
        },
        {
    question: "What should I do if my question isn&apos;t getting answers?",
          answer: "Check if your question follows our guidelines, add more details or context, improve formatting, add relevant tags, or consider offering a bounty to attract more attention."
        },
        {
          question: "How many tags should I use?",
          answer: "Use 1-5 tags that accurately describe your question. Choose the most specific and relevant tags. Avoid using too many general tags or tags unrelated to your question."
        },
        {
          question: "Can I ask homework or assignment questions?",
    answer: "Yes, but show your work and specific problems you&apos;re facing. Don&apos;t just post the assignment and ask for the complete solution. Demonstrate your learning effort."
        }
      ]
    },
    {
      category: "Community & Moderation",
      icon: <Users className="h-5 w-5" />,
      questions: [
        {
          question: "What happens if I violate community guidelines?",
          answer: "Violations may result in warnings, temporary suspensions, or permanent bans depending on severity. We focus on education first and use a progressive enforcement approach."
        },
        {
          question: "How do I report inappropriate content?",
          answer: "Use the flag button on any post to report spam, harassment, or other violations. Our moderation team reviews all reports and takes appropriate action."
        },
        {
          question: "Can I edit or delete my posts?",
          answer: "Yes, you can edit your questions and answers. Deletion is possible for your own posts, though heavily upvoted content may be preserved for community benefit."
        },
        {
          question: "What is the voting system for?",
    answer: "Voting helps surface the best content. Upvote helpful questions and answers, downvote content that&apos;s not useful or violates guidelines. Votes also affect user reputation."
        }
      ]
    },
    {
      category: "Technical Issues",
      icon: <Code className="h-5 w-5" />,
      questions: [
        {
          question: "How do I format code in my posts?",
          answer: "Use backticks (`) for inline code or triple backticks (```) for code blocks. You can also indent with 4 spaces or use the code button in the editor toolbar."
        },
        {
    question: "Why can&apos;t I upload images?",
          answer: "Image uploads require a minimum reputation level to prevent spam. You can use external image hosting services and include links until you reach the required reputation."
        },
        {
          question: "The site is loading slowly. What can I do?",
          answer: "Try refreshing the page, clearing your browser cache, or checking your internet connection. If problems persist, contact our support team with your browser and location details."
        },
        {
          question: "Can I use TechBlog on mobile devices?",
          answer: "Yes! TechBlog is fully responsive and works on all mobile devices. We also have a mobile app available for iOS and Android with additional features."
        }
      ]
    },
    {
      category: "Account & Privacy",
      icon: <Shield className="h-5 w-5" />,
      questions: [
        {
          question: "How do I change my password?",
          answer: "Go to your account settings and click 'Change Password'. If you've forgotten your password, use the 'Forgot Password' link on the login page."
        },
        {
          question: "Can I delete my account?",
          answer: "Yes, you can delete your account from the account settings page. Note that some public contributions may remain but will be anonymized."
        },
        {
          question: "How do you protect my privacy?",
          answer: "We follow strict privacy guidelines, use encryption for data protection, and never sell personal information. See our Privacy Policy for complete details."
        },
        {
          question: "How do I control email notifications?",
          answer: "Visit your notification preferences in account settings. You can choose which types of emails to receive and set the frequency of digest emails."
        }
      ]
    }
  ]

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
          {faqCategories.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {category.icon}
                  {category.category}
                </CardTitle>
                <CardDescription>
                  {category.questions.length} frequently asked questions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {category.questions.map((faq) => (
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
