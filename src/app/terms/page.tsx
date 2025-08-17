import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Shield, Scale, Users, FileText, Ban, CheckCircle, XCircle } from 'lucide-react'

export default function TermsOfServicePage() {
  const quickRules = [
    {
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
      rule: "Be respectful and professional",
      type: "do"
    },
    {
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
      rule: "Share accurate and helpful information",
      type: "do"
    },
    {
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
      rule: "Credit sources and respect intellectual property",
      type: "do"
    },
    {
      icon: <XCircle className="h-4 w-4 text-red-600" />,
      rule: "Post spam, promotional content, or off-topic material",
      type: "dont"
    },
    {
      icon: <XCircle className="h-4 w-4 text-red-600" />,
      rule: "Harass, abuse, or discriminate against other users",
      type: "dont"
    },
    {
      icon: <XCircle className="h-4 w-4 text-red-600" />,
      rule: "Share malicious code or security vulnerabilities",
      type: "dont"
    }
  ]

  const accountTerms = [
    {
      title: "Account Creation",
      content: "You must provide accurate information when creating your account. You are responsible for maintaining the security of your account credentials."
    },
    {
      title: "Age Requirements",
      content: "You must be at least 13 years old to create an account. Users under 18 must have parental consent."
    },
    {
      title: "One Account per Person",
      content: "Each person may maintain only one account. Creating multiple accounts to evade restrictions is prohibited."
    },
    {
      title: "Account Termination",
      content: "We reserve the right to suspend or terminate accounts that violate these terms or engage in harmful behavior."
    }
  ]

  const contentRules = [
    {
      category: "Allowed Content",
      items: [
        "Programming questions and technical discussions",
        "Code snippets and examples (with proper attribution)",
        "Tutorial content and educational material",
        "Professional career advice and industry insights",
        "Constructive feedback and code reviews"
      ],
      color: "green"
    },
    {
      category: "Prohibited Content",
      items: [
        "Spam, promotional posts, or commercial advertisements",
        "Harmful, abusive, or discriminatory content",
        "Malicious code, viruses, or security exploits",
        "Copyright-infringing material without permission",
        "Personal attacks or harassment of other users"
      ],
      color: "red"
    }
  ]

  const enforcementActions = [
    {
      severity: "Warning",
      description: "First-time minor violations",
      action: "Email notification and content removal",
      badge: "info"
    },
    {
      severity: "Temporary Suspension",
      description: "Repeated violations or moderate infractions",
      action: "1-7 day account suspension",
      badge: "warning"
    },
    {
      severity: "Permanent Ban",
      description: "Severe violations or repeated offenses",
      action: "Permanent account termination",
      badge: "destructive"
    }
  ]

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: January 1, 2024
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            By using TechBlog, you agree to these terms. Please read them carefully as they contain 
            important information about your rights and responsibilities.
          </p>
        </div>

        {/* Important Notice */}
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
              <AlertTriangle className="h-5 w-5" />
              Important Notice
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-orange-800 dark:text-orange-200">
            <p>
              These terms constitute a legally binding agreement between you and TechBlog. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </CardContent>
        </Card>

        {/* Quick Rules */}
        <Card>
          <CardHeader>
            <CardTitle>Community Guidelines at a Glance</CardTitle>
            <CardDescription>
              Key rules to keep TechBlog a positive and productive community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-3">✅ Do</h3>
                <div className="space-y-2">
                  {quickRules.filter(rule => rule.type === 'do').map((rule) => (
                    <div key={rule.rule} className="flex items-start gap-2 text-sm">
                      {rule.icon}
                      <span>{rule.rule}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-red-700 dark:text-red-400 mb-3">❌ Don&apos;t</h3>
                <div className="space-y-2">
                  {quickRules.filter(rule => rule.type === 'dont').map((rule) => (
                    <div key={rule.rule} className="flex items-start gap-2 text-sm">
                      {rule.icon}
                      <span>{rule.rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Terms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Account Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {accountTerms.map((term) => (
              <div key={term.title} className="space-y-2">
                <h4 className="font-medium">{term.title}</h4>
                <p className="text-muted-foreground text-sm">{term.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Content Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Content Policy
            </CardTitle>
            <CardDescription>
              Guidelines for what you can and cannot post on TechBlog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contentRules.map((category) => (
                <div key={category.category} className="space-y-3">
                  <h3 className={`font-semibold ${
                    category.color === 'green' 
                      ? 'text-green-700 dark:text-green-400' 
                      : 'text-red-700 dark:text-red-400'
                  }`}>
                    {category.category}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className={`mt-1 ${
                          category.color === 'green' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          •
                        </span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Intellectual Property
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Your Content</h4>
                <p className="text-sm text-muted-foreground">
                  You retain ownership of content you post, but grant TechBlog a license to display, 
                  distribute, and store your content as part of the service.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Respect Others&apos; Rights</h4>
                <p className="text-sm text-muted-foreground">
                  Do not post copyrighted material without permission. Always provide proper attribution 
                  for code, images, or content from other sources.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Platform Content</h4>
                <p className="text-sm text-muted-foreground">
                  TechBlog&apos;s code, design, and branding are protected by intellectual property laws 
                  and may not be used without permission.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enforcement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ban className="h-5 w-5" />
              Enforcement and Moderation
            </CardTitle>
              <CardDescription>
                How we handle violations of these terms
              </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                We use a combination of automated systems and human moderators to enforce these terms. 
                Violations may result in the following actions:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {enforcementActions.map((action) => (
                  <div key={action.severity} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{action.severity}</h4>
                      <Badge 
                        variant={action.badge as any} 
                        className="text-xs"
                      >
                        {action.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                    <p className="text-xs font-medium">{action.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Terms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Legal Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium">Disclaimer of Warranties</h4>
                <p className="text-sm text-muted-foreground">
                  TechBlog is provided &quot;as is&quot; without warranties of any kind. We do not guarantee 
                  the accuracy, completeness, or usefulness of any information on the platform.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Limitation of Liability</h4>
                <p className="text-sm text-muted-foreground">
                  TechBlog shall not be liable for any indirect, incidental, special, or consequential 
                  damages arising from your use of the service.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Governing Law</h4>
                <p className="text-sm text-muted-foreground">
                  These terms are governed by the laws of the State of California, USA. 
                  Any disputes will be resolved in California courts.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Severability</h4>
                <p className="text-sm text-muted-foreground">
                  If any provision of these terms is found to be invalid, the remaining provisions 
                  will continue to be in full force and effect.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card>
          <CardHeader>
            <CardTitle>Changes to These Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We may update these terms from time to time. We will provide notice of material changes 
              and give you an opportunity to review the updated terms before they take effect.
            </p>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">How we notify you:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Email notification to all registered users</li>
                <li>Prominent notice on the website</li>
                <li>30-day notice period for significant changes</li>
                <li>Right to close account if you disagree with changes</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Questions About These Terms?</h2>
            <p className="mb-4 opacity-90">
              If you have questions about these Terms of Service or need clarification on any point, 
              please contact our legal team.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> legal@techblog.com</p>
              <p><strong>Address:</strong> 123 Tech Street, Suite 100, San Francisco, CA 94105</p>
              <p><strong>Response Time:</strong> Within 5 business days</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
