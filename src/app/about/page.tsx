import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Code, Users, Heart, Globe, Target, Lightbulb, Award, BookOpen } from 'lucide-react'

export default function AboutPage() {
  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Expert Knowledge Sharing",
      description: "Connect with developers from around the world to share knowledge and solve complex programming challenges."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Active Community",
      description: "Join thousands of active developers who are passionate about helping each other grow and learn."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Quality First",
      description: "Our community-driven moderation ensures high-quality questions and answers that truly help developers."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Reach",
      description: "Available in multiple languages with developers from every timezone and background."
    }
  ]

  const stats = [
    { label: "Questions Asked", value: "250K+" },
    { label: "Answers Provided", value: "500K+" },
    { label: "Active Users", value: "50K+" },
    { label: "Technologies Covered", value: "500+" }
  ]

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former senior engineer at Google with 10+ years in developer communities.",
      avatar: "/team/sarah.jpg"
    },
    {
      name: "Mike Chen",
      role: "CTO",
      bio: "Full-stack architect passionate about scalable platforms and developer experience.",
      avatar: "/team/mike.jpg"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Community",
      bio: "Community manager with expertise in fostering inclusive tech communities.",
      avatar: "/team/emily.jpg"
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      bio: "Open source contributor focused on building tools that developers love.",
      avatar: "/team/david.jpg"
    }
  ]

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">About TechBlog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We&apos;re building the world&apos;s largest community of developers, where knowledge flows freely 
            and everyone can learn from each other.
          </p>
        </div>

        {/* Mission Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Target className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">
              To democratize programming knowledge and make it accessible to developers at every stage of their journey. 
              We believe that when developers help each other, the entire technology ecosystem grows stronger.
            </p>
            <p>
              Founded in 2024, TechBlog started as a simple idea: create a platform where developers could ask questions 
              and get high-quality answers from their peers. Today, we&apos;ve grown into a thriving community that spans 
              across all programming languages, frameworks, and technologies.
            </p>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  <CardTitle>Knowledge Sharing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>We believe knowledge grows when shared. Every question and answer contributes to a collective understanding that benefits the entire developer community.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <CardTitle>Inclusive Community</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>Everyone deserves to be heard regardless of their experience level. We foster an environment where beginners and experts can learn from each other.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-primary" />
                  <CardTitle>Quality First</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>We prioritize helpful, accurate, and well-researched content. Our community-driven moderation ensures that quality remains high.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <CardTitle>Continuous Learning</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>Technology evolves rapidly, and so should our knowledge. We encourage continuous learning and staying current with industry trends.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-primary">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Community Impact</CardTitle>
            <CardDescription className="text-center">
              Numbers that show the power of our developer community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.name}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <Badge variant="secondary" className="mb-2">{member.role}</Badge>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Built with Modern Technology</CardTitle>
            <CardDescription>
              We use cutting-edge technologies to ensure the best experience for our users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'NextAuth.js', 'Vercel', 'Radix UI', 'MDX'].map((tech) => (
                <Badge key={tech} variant="outline" className="justify-center p-2">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg mb-6 opacity-90">
              Ready to be part of something bigger? Start asking questions, sharing knowledge, 
              and connecting with developers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge variant="secondary" className="p-3 text-base">
                🚀 Get Started Today
              </Badge>
              <Badge variant="secondary" className="p-3 text-base">
                💬 Ask Your First Question
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
