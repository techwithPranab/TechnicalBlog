import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Admin from '@/models/Admin'
import bcrypt from 'bcryptjs'

export async function POST() {
  await dbConnect()
  
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' })
    if (existingAdmin) {
      return NextResponse.json({ 
        message: 'Admin user already exists',
        username: 'admin'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 12)

    // Create admin user
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@techblog.com',
      password: hashedPassword,
      role: 'super_admin',
      permissions: [
        'manage_users',
        'manage_tags',
        'manage_feedback',
        'manage_faq',
        'manage_contacts',
        'manage_articles',
        'manage_questions',
        'view_analytics'
      ],
      isActive: true
    })

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      username: admin.username,
      email: admin.email,
      note: 'Default password is: admin123'
    })

  } catch (error: any) {
    console.error('Error creating admin:', error)
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    )
  }
}
