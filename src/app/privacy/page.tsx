import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Eye, Lock, Settings, Bell, Download, Trash2, UserCheck } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: <Eye className="h-5 w-5" />,
      content: [
        {
          subtitle: "Account Information",
          text: "When you create an account, we collect your email address, username, and profile information you choose to provide."
        },
        {
          subtitle: "Content You Create",
          text: "We store questions, answers, comments, and other content you post on our platform."
        },
        {
          subtitle: "Usage Data",
          text: "We collect information about how you use our service, including pages visited, features used, and interaction patterns."
        },
        {
          subtitle: "Technical Information",
          text: "We automatically collect your IP address, browser type, device information, and other technical data for security and performance purposes."
        }
      ]
    },
    {
      id: "how-we-use-information",
      title: "How We Use Your Information",
      icon: <Settings className="h-5 w-5" />,
      content: [
        {
          subtitle: "Provide Services",
          text: "We use your information to operate and improve TechBlog, including personalizing your experience and providing customer support."
        },
        {
          subtitle: "Communication",
          text: "We may send you service-related emails, notifications about your account, and updates about our platform (with your consent)."
        },
        {
          subtitle: "Safety and Security",
          text: "We use your information to detect fraud, prevent abuse, and maintain the security of our platform."
        },
        {
          subtitle: "Analytics and Improvement",
          text: "We analyze usage patterns to understand how our service is used and to make improvements."
        }
      ]
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: <UserCheck className="h-5 w-5" />,
      content: [
        {
          subtitle: "Public Content",
          text: "Questions, answers, and comments you post are public and visible to all users. Your username and reputation are also publicly displayed."
        },
        {
          subtitle: "Service Providers",
          text: "We may share information with trusted third-party service providers who help us operate our platform (e.g., hosting, analytics, email services)."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information if required by law, legal process, or to protect the rights, property, or safety of TechBlog, our users, or the public."
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction."
        }
      ]
    },
    {
      id: "data-protection",
      title: "Data Protection & Security",
      icon: <Lock className="h-5 w-5" />,
      content: [
        {
          subtitle: "Encryption",
          text: "We use industry-standard encryption to protect your data in transit and at rest."
        },
        {
          subtitle: "Access Controls",
          text: "We implement strict access controls and regularly audit our systems to prevent unauthorized access."
        },
        {
          subtitle: "Regular Updates",
          text: "We regularly update our security measures and conduct security assessments to protect your information."
        },
        {
          subtitle: "Incident Response",
          text: "We have procedures in place to detect, respond to, and notify users of any security incidents."
        }
      ]
    },
    {
      id: "your-rights",
      title: "Your Rights and Choices",
      icon: <Shield className="h-5 w-5" />,
      content: [
        {
          subtitle: "Access and Correction",
          text: "You can access and update your account information at any time through your profile settings."
        },
        {
          subtitle: "Data Portability",
          text: "You can request a copy of your data in a portable format. Contact us for assistance with data export."
        },
        {
          subtitle: "Account Deletion",
          text: "You can delete your account at any time. Note that some public content may remain visible but will be anonymized."
        },
        {
          subtitle: "Communication Preferences",
          text: "You can control what notifications you receive and opt out of marketing communications."
        }
      ]
    }
  ]

  const dataTypes = [
    {
      type: "Essential Data",
      description: "Required for basic platform functionality",
      retention: "As long as account is active",
      badge: "Required"
    },
    {
      type: "Usage Analytics",
      description: "Helps us improve the platform",
      retention: "Up to 2 years",
      badge: "Optional"
    },
    {
      type: "Marketing Data",
      description: "For promotional communications",
      retention: "Until you opt out",
      badge: "Opt-in"
    },
    {
      type: "Support Data",
      description: "Customer service interactions",
      retention: "Up to 3 years",
      badge: "As needed"
    }
  ]

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: January 1, 2024
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We take your privacy seriously. This policy explains how we collect, use, and protect 
            your personal information when you use TechBlog.
          </p>
        </div>

        {/* Quick Summary */}
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <Shield className="h-5 w-5" />
              Privacy Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-blue-600" />
                <span>Your data is encrypted and secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-600" />
                <span>We never sell your personal data</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-blue-600" />
                <span>You control your privacy settings</span>
              </div>
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-blue-600" />
                <span>Transparent about data usage</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Types */}
        <Card>
          <CardHeader>
            <CardTitle>Types of Data We Handle</CardTitle>
            <CardDescription>
              Understanding what data we collect and how we use it
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dataTypes.map((item) => (
                <div key={item.type} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{item.type}</h4>
                    <Badge variant="secondary">{item.badge}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <p className="text-xs text-muted-foreground">
                    <strong>Retention:</strong> {item.retention}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <Card key={section.id} id={section.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {section.icon}
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.content.map((item) => (
                  <div key={item.subtitle} className="space-y-2">
                    <h4 className="font-medium text-foreground">{item.subtitle}</h4>
                    <p className="text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact and Rights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Data Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>You have the right to request:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>A copy of your personal data</li>
                <li>Correction of inaccurate data</li>
                <li>Deletion of your account and data</li>
                <li>Restriction of data processing</li>
              </ul>
              <p className="pt-2">
                <strong>Contact:</strong> privacy@techblog.com
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Account Deletion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>When you delete your account:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Your profile information is removed</li>
                <li>Public posts become anonymized</li>
                <li>Personal data is deleted within 30 days</li>
                <li>Some data may be retained for legal compliance</li>
              </ul>
              <p className="pt-2">
                <strong>Process:</strong> Account Settings → Delete Account
              </p>
            </CardContent>
          </Card>
        </div>

        {/* International Users */}
        <Card>
          <CardHeader>
            <CardTitle>International Data Transfers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              TechBlog is operated from the United States. If you are located outside the United States, 
              please be aware that information we collect will be transferred to and processed in the United States.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 border rounded-lg text-center">
                <h4 className="font-medium mb-1">GDPR Compliant</h4>
                <p className="text-xs text-muted-foreground">European Union users</p>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <h4 className="font-medium mb-1">CCPA Compliant</h4>
                <p className="text-xs text-muted-foreground">California residents</p>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <h4 className="font-medium mb-1">PIPEDA Compliant</h4>
                <p className="text-xs text-muted-foreground">Canadian users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Changes to Policy */}
        <Card>
          <CardHeader>
            <CardTitle>Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We may update this privacy policy from time to time. We will notify you of any material 
              changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">How we notify you of changes:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Email notification for significant changes</li>
                <li>In-app notification when you next visit</li>
                <li>Blog post announcement for major updates</li>
                <li>30-day notice period for material changes</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Questions About Privacy?</h2>
            <p className="mb-4 opacity-90">
              If you have any questions about this Privacy Policy or our data practices, 
              please don&apos;t hesitate to contact us.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> privacy@techblog.com</p>
              <p><strong>Address:</strong> 123 Tech Street, Suite 100, San Francisco, CA 94105</p>
              <p><strong>Data Protection Officer:</strong> dpo@techblog.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
