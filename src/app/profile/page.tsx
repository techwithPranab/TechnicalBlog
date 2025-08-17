"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { User, Lock, Mail, Award, BarChart3, Edit2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ProfileData {
  _id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  reputation: number
  role: 'user' | 'admin' | 'moderator'
  questionsCount: number
  answersCount: number
  badges: string[]
  joinedAt: string
  lastActive: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [changingPassword, setChangingPassword] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile')
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        setName(data.name)
        setBio(data.bio || '')
        setAvatar(data.avatar || '')
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch profile',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch profile',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, bio, avatar })
      })
      if (response.ok) {
        const updated = await response.json()
        setProfile(updated)
        toast({
          title: 'Profile updated',
          description: 'Your profile has been updated.',
        })
        setEditMode(false)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to update profile',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setChangingPassword(true)
    if (password !== passwordConfirm) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      })
      setChangingPassword(false)
      return
    }
    try {
      const response = await fetch('/api/profile/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      if (response.ok) {
        toast({
          title: 'Password changed',
          description: 'Your password has been updated.',
        })
        setPassword('')
        setPasswordConfirm('')
      } else {
        toast({
          title: 'Error',
          description: 'Failed to change password',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to change password',
        variant: 'destructive',
      })
    } finally {
      setChangingPassword(false)
    }
  }

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="flex gap-8 items-center p-8">
            <div className="flex flex-col items-center gap-2">
              <img
                src={profile.avatar || '/default-avatar.png'}
                alt="Avatar"
                className="w-24 h-24 rounded-full border"
              />
              <Badge variant={profile.role === 'admin' ? 'destructive' : profile.role === 'moderator' ? 'default' : 'secondary'}>
                {profile.role}
              </Badge>
              <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                <Edit2 className="h-4 w-4 mr-1" /> Edit Profile
              </Button>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4" />
                <span>{profile.email}</span>
              </div>
              <p className="mb-2 text-muted-foreground">{profile.bio}</p>
              <div className="flex gap-4 mb-2">
                <div className="flex items-center gap-1">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold">{profile.reputation}</span> Reputation
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4 text-green-600" />
                  <span className="font-semibold">{profile.questionsCount}</span> Questions
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold">{profile.answersCount}</span> Answers
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {(Array.isArray(profile.badges) ? profile.badges : []).map(badge => (
                  <Badge key={badge} variant="default">
                    <Award className="h-3 w-3 mr-1 inline" /> {badge}
                  </Badge>
                ))}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Joined: {new Date(profile.joinedAt).toLocaleDateString()} | Last Active: {new Date(profile.lastActive).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="profile" className="mb-8">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            {editMode ? (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>Update your profile information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <Input
                      placeholder="Name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Avatar URL"
                      value={avatar}
                      onChange={e => setAvatar(e.target.value)}
                    />
                    <Input
                      placeholder="Bio"
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                    />
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" type="button" onClick={() => setEditMode(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading}>
                        Save
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : null}
          </TabsContent>
          <TabsContent value="password">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <Input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirm}
                    onChange={e => setPasswordConfirm(e.target.value)}
                    required
                  />
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" type="button" onClick={() => { setPassword(''); setPasswordConfirm(''); }}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={changingPassword}>
                      Change Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="metrics">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>User Metrics</CardTitle>
                <CardDescription>Overview of your activity and stats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{profile.reputation}</p>
                    <p className="text-sm text-muted-foreground">Reputation</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{profile.questionsCount}</p>
                    <p className="text-sm text-muted-foreground">Questions</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{profile.answersCount}</p>
                    <p className="text-sm text-muted-foreground">Answers</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">{Array.isArray(profile.badges) ? profile.badges.length : 0}</p>
                    <p className="text-sm text-muted-foreground">Badges</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="badges">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Badges</CardTitle>
                <CardDescription>Your earned badges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  {(Array.isArray(profile.badges) ? profile.badges : []).map(badge => (
                    <Badge key={badge} variant="default">
                      <Award className="h-3 w-3 mr-1 inline" /> {badge}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
