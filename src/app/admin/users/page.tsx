"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Users, 
  Shield, 
  Mail,
  Calendar,
  MoreHorizontal,
  Ban,
  UserCheck,
  Crown
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface UserData {
  _id: string
  username: string
  email: string
  role: 'user' | 'moderator' | 'admin'
  reputation: number
  questionsCount: number
  answersCount: number
  isActive: boolean
  lastActive: string
  joinedAt: string
  avatar?: string
}

export default function UsersManagement() {
  const [users, setUsers] = useState<UserData[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [updating, setUpdating] = useState(false)
  // Add User form state
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newRole, setNewRole] = useState('user')
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    try {
      // Replace with real API call
      const newUser: UserData = {
        _id: Math.random().toString(36).substr(2, 9),
        username: newUsername,
        email: newEmail,
        role: newRole as 'user' | 'moderator' | 'admin',
        reputation: 0,
        questionsCount: 0,
        answersCount: 0,
        isActive: true,
        lastActive: new Date().toISOString(),
        joinedAt: new Date().toISOString(),
      }
      setUsers([newUser, ...users])
      toast({
        title: 'User added',
        description: `User ${newUsername} added successfully!`,
      })
      setAddUserOpen(false)
      setNewUsername('')
      setNewEmail('')
      setNewRole('user')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add user',
        variant: 'destructive',
      })
    } finally {
      setUpdating(false)
    }
  }
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    checkAuth()
    fetchUsers()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchTerm, roleFilter, statusFilter])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    }
  }

  const fetchUsers = async () => {
    try {
      // Mock data for now
      const mockUsers: UserData[] = [
        {
          _id: '1',
          username: 'john_doe',
          email: 'john@example.com',
          role: 'user',
          reputation: 1250,
          questionsCount: 15,
          answersCount: 45,
          isActive: true,
          lastActive: '2024-01-20T10:30:00Z',
          joinedAt: '2023-06-15T14:20:00Z'
        },
        {
          _id: '2',
          username: 'sarah_dev',
          email: 'sarah@example.com',
          role: 'moderator',
          reputation: 3480,
          questionsCount: 8,
          answersCount: 120,
          isActive: true,
          lastActive: '2024-01-20T16:45:00Z',
          joinedAt: '2023-03-10T09:15:00Z'
        },
        {
          _id: '3',
          username: 'alex_coder',
          email: 'alex@example.com',
          role: 'user',
          reputation: 890,
          questionsCount: 22,
          answersCount: 31,
          isActive: false,
          lastActive: '2024-01-15T12:00:00Z',
          joinedAt: '2023-08-22T11:30:00Z'
        },
        {
          _id: '4',
          username: 'admin_user',
          email: 'admin@techblog.com',
          role: 'admin',
          reputation: 5000,
          questionsCount: 2,
          answersCount: 85,
          isActive: true,
          lastActive: '2024-01-20T18:00:00Z',
          joinedAt: '2023-01-01T00:00:00Z'
        }
      ]
      setUsers(mockUsers)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterUsers = () => {
    let filtered = users

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter)
    }

    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active'
      filtered = filtered.filter(user => user.isActive === isActive)
    }

    setFilteredUsers(filtered)
  }

  const updateUserStatus = async (userId: string, isActive: boolean) => {
    setUpdating(true)
    try {
      // Mock API call
      toast({
        title: "Success",
        description: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      })
      fetchUsers()
    } catch (error) {
      console.error('Error updating user:', error)
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  const updateUserRole = async (userId: string, newRole: string) => {
    setUpdating(true)
    try {
      // Mock API call
      toast({
        title: "Success",
        description: `User role updated to ${newRole}`,
      })
      fetchUsers()
    } catch (error) {
      console.error('Error updating user role:', error)
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive'
      case 'moderator':
        return 'default'
      case 'user':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4" />
      case 'moderator':
        return <Shield className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
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
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.push('/admin/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Users Management</h1>
              <p className="text-muted-foreground">Manage user accounts and permissions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Add User Button & Modal */}
        <div className="mb-6 flex justify-end">
          <Button variant="default" onClick={() => setAddUserOpen(true)}>
            Add User
          </Button>
        </div>
        {addUserOpen && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-background rounded-lg shadow-lg p-8 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New User</h2>
              <form onSubmit={handleAddUser} className="space-y-4">
                <Input
                  placeholder="Username"
                  value={newUsername}
                  onChange={e => setNewUsername(e.target.value)}
                  required
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  required
                />
                <Select value={newRole} onValueChange={setNewRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" type="button" onClick={() => setAddUserOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={updating}>
                    Add
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.isActive).length}
                </p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {users.filter(u => u.role === 'moderator').length}
                </p>
                <p className="text-sm text-muted-foreground">Moderators</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {users.filter(u => u.role === 'admin').length}
                </p>
                <p className="text-sm text-muted-foreground">Admins</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users List */}
        <div className="grid gap-6">
          {filteredUsers.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No users found</h3>
                <p className="text-muted-foreground">
                  No users match your current filters.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredUsers.map((user) => (
              <Card key={user._id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <CardTitle className="flex items-center gap-2">
                          {getRoleIcon(user.role)}
                          {user.username}
                        </CardTitle>
                        <Badge variant={getRoleColor(user.role) as any}>
                          {user.role}
                        </Badge>
                        <Badge variant={user.isActive ? 'default' : 'destructive'}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="font-semibold text-lg">{user.reputation}</p>
                        <p className="text-muted-foreground">Reputation</p>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="font-semibold text-lg">{user.questionsCount}</p>
                        <p className="text-muted-foreground">Questions</p>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="font-semibold text-lg">{user.answersCount}</p>
                        <p className="text-muted-foreground">Answers</p>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="font-semibold text-lg">
                          {Math.floor((Date.now() - new Date(user.lastActive).getTime()) / (1000 * 60 * 60 * 24))}d
                        </p>
                        <p className="text-muted-foreground">Last Seen</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Last active: {new Date(user.lastActive).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Select
                        defaultValue={user.role}
                        onValueChange={(newRole: string) => updateUserRole(user._id, newRole)}
                        disabled={updating}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateUserStatus(user._id, !user.isActive)}
                        disabled={updating}
                      >
                        {user.isActive ? (
                          <>
                            <Ban className="h-4 w-4 mr-1" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-4 w-4 mr-1" />
                            Activate
                          </>
                        )}
                      </Button>

                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
