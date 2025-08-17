import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'

export async function POST(req: Request) {
  await dbConnect()
  try {
    const body = await req.json()
    const { name, email, password, role, avatar, bio } = body
    // Basic validation
    if (!name || !email || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    // Check for existing user
    const existing = await User.findOne({ email })
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    }
    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
      avatar,
      bio
    })
    return NextResponse.json({ success: true, user })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
