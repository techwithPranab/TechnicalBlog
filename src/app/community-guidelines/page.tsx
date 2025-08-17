import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Heart, 
  Shield, 
  MessageSquare, 
  Flag, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  BookOpen,
  Scale,
  Eye,
  UserCheck
} from 'lucide-react'

export default function CommunityGuidelinesPage() {
  const coreValues = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Be Kind and Respectful",
      description: "Treat everyone with respect, regardless of their experience level or background. We're all here to learn and help each other grow."
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Share Knowledge Generously",
      description: "Help others learn by providing clear, accurate, and helpful answers. Take time to explain concepts and provide context."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Maintain Quality Standards",
      description: "Contribute high-quality content that adds value to the community. Research before posting and fact-check your responses."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Foster Inclusivity",
      description: "Welcome newcomers, celebrate diversity, and create an environment where everyone feels safe to participate and learn."
    }
  ]

  const dosList = [
    "Search before asking to avoid duplicate questions",
    "Write clear, descriptive titles for your questions",
    "Include relevant code examples and error messages",
    "Use appropriate tags to categorize your content",
    "Accept helpful answers and upvote good content",
    "Provide constructive feedback and code reviews",
    "Edit your posts to improve clarity and accuracy",
    "Credit sources and respect intellectual property",
    "Help moderate by flagging inappropriate content",
    "Welcome new users and guide them kindly"
  ]

  const dontsList = [
    "Post spam, advertisements, or promotional content",
    "Ask for homework solutions without showing effort",
    "Use offensive language or personal attacks",
    "Share malicious code or security exploits",
    "Create multiple accounts to manipulate voting",
    "Post off-topic content unrelated to programming",
    "Discriminate based on race, gender, religion, etc.",
    "Share personal information of other users",
    "Vandalize or delete content out of spite",
    "Ignore community feedback and warnings"
  ]

  const reportingReasons = [
    {
      type: "Spam",
      description: "Promotional content, repeated posts, or irrelevant material",
      action: "Content removal, possible account warning",
      severity: "Low"
    },
    {
      type: "Harassment",
      description: "Personal attacks, bullying, or targeted harassment",
      action: "Immediate review, temporary to permanent suspension",
      severity: "High"
    },
    {
      type: "Inappropriate Content",
      description: "Offensive language, hate speech, or discriminatory content",
      action: "Content removal, account review",
      severity: "Medium"
    },
    {
      type: "Copyright Violation",
      description: "Posting copyrighted material without permission",
      action: "Content removal, DMCA process if applicable",
      severity: "Medium"
    },
    {
      type: "Malicious Code",
      description: "Sharing harmful code, viruses, or security exploits",
      action: "Immediate removal, possible account termination",
      severity: "Critical"
    },
    {
      type: "Privacy Violation",
      description: "Sharing personal information without consent",
      action: "Immediate content removal, account review",
      severity: "High"
    }
  ]

  const moderationLevels = [
    {
      level: "Community Moderation",
      description: "Users can flag content and vote on quality",
      powers: ["Flag inappropriate content", "Vote on questions/answers", "Comment and provide feedback"]
    },
    {
      level: "Trusted Users",
      description: "High-reputation users with additional privileges",
      powers: ["Edit any post", "Close/reopen questions", "Review suggested edits", "Access moderation queue"]
    },
    {
      level: "Moderators",
      description: "Elected community members with moderation powers",
      powers: ["Delete content", "Suspend users", "Handle flags", "Access user profiles", "Bind/unbind votes"]
    },
    {
      level: "Administrators",
      description: "TechBlog staff with full access",
      powers: ["All moderation actions", "Site configuration", "Handle appeals", "Investigate severe violations"]
    }
  ]

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return <Badge variant="destructive">{severity}</Badge>
      case 'High':
        return <Badge variant="destructive" className="bg-orange-500">{severity}</Badge>
      case 'Medium':
        return <Badge variant="secondary" className="bg-yellow-500 text-white">{severity}</Badge>
      case 'Low':
        return <Badge variant="outline">{severity}</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Community Guidelines</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our community guidelines help maintain a positive, productive environment where 
            developers can learn, share knowledge, and grow together.
          </p>
        </div>

        {/* Core Values */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValues.map((value) => (
              <Card key={value.title}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-primary">{value.icon}</div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Do's and Don'ts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle className="h-5 w-5" />
                What We Encourage
              </CardTitle>
              <CardDescription className="text-green-600 dark:text-green-300">
                Behaviors that make our community thrive
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dosList.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-green-800 dark:text-green-200">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <XCircle className="h-5 w-5" />
                What We Don&apos;t Allow
              </CardTitle>
              <CardDescription className="text-red-600 dark:text-red-300">
                Behaviors that harm our community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dontsList.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-red-800 dark:text-red-200">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Reporting System */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flag className="h-5 w-5" />
              Reporting and Moderation
            </CardTitle>
            <CardDescription>
              How to report violations and what happens next
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">How to Report</h3>
              <p className="text-muted-foreground mb-4">
                If you see content that violates our guidelines, use the flag button or contact our moderation team. 
                All reports are reviewed promptly and handled confidentially.
              </p>
              <div className="flex gap-3">
                <Button size="sm" variant="outline">
                  <Flag className="h-4 w-4 mr-2" />
                  Flag Content
                </Button>
                <Button size="sm" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Moderators
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Types of Violations</h3>
              <div className="space-y-3">
                {reportingReasons.map((reason) => (
                  <div key={reason.type} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{reason.type}</h4>
                      {getSeverityBadge(reason.severity)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{reason.description}</p>
                    <p className="text-xs text-muted-foreground">
                      <strong>Typical action:</strong> {reason.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Moderation Structure */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Moderation Structure
            </CardTitle>
            <CardDescription>
              How our community moderation system works
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moderationLevels.map((level) => (
                <div key={level.level} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{level.level}</h4>
                    <Badge variant="secondary">{level.powers.length} powers</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{level.description}</p>
                  <div className="space-y-1">
                    {level.powers.map((power) => (
                      <div key={power} className="flex items-center gap-2 text-xs">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                        <span className="text-muted-foreground">{power}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enforcement Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Enforcement Actions
            </CardTitle>
            <CardDescription>
              Progressive enforcement approach for guideline violations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <h4 className="font-medium">Warning</h4>
                  <p className="text-xs text-muted-foreground">First-time minor violations</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Eye className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <h4 className="font-medium">Review</h4>
                  <p className="text-xs text-muted-foreground">Content under moderation</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <h4 className="font-medium">Suspension</h4>
                  <p className="text-xs text-muted-foreground">Temporary account restriction</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Shield className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                  <h4 className="font-medium">Ban</h4>
                  <p className="text-xs text-muted-foreground">Permanent account termination</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                We believe in rehabilitation and education. Most violations result in warnings and guidance 
                rather than punishment. Severe or repeated violations may result in stronger actions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Appeals Process */}
        <Card>
          <CardHeader>
            <CardTitle>Appeals Process</CardTitle>
            <CardDescription>
              How to appeal moderation decisions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              If you believe a moderation action was taken in error, you can appeal the decision. 
              We review all appeals fairly and will reverse decisions when appropriate.
            </p>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Appeal Process:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Contact our moderation team with your appeal</li>
                <li>Provide context and explanation for your case</li>
                <li>Wait for review (typically 2-5 business days)</li>
                <li>Receive decision with explanation</li>
                <li>Further appeal to administrators if needed</li>
              </ol>
            </div>
            <Button variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Submit an Appeal
            </Button>
          </CardContent>
        </Card>

        {/* Contact and Resources */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Questions About Guidelines?</h2>
            <p className="mb-6 opacity-90">
              Our guidelines are designed to help everyone succeed. If you have questions or need clarification, 
              we&apos;re here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary">
                <MessageSquare className="h-4 w-4 mr-2" />
                Ask a Question
              </Button>
              <Button variant="secondary">
                <BookOpen className="h-4 w-4 mr-2" />
                Read Help Center
              </Button>
              <Button variant="secondary">
                <Users className="h-4 w-4 mr-2" />
                Join Discussion
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
