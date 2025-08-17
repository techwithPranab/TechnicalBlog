import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Simple feedback storage - you might want to create a proper Feedback model
const feedbacks: any[] = []

export async function GET(req: Request) {
  await dbConnect()
  
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    return NextResponse.json(feedbacks)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch feedback' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  await dbConnect()

  try {
    const { type, subject, message, email, name } = await req.json()

    if (!type || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!['bug', 'feature', 'general', 'complaint'].includes(type)) {
      return NextResponse.json({ error: 'Invalid feedback type' }, { status: 400 })
    }

    const session = await getServerSession(authOptions)

    const feedback = {
      id: Date.now().toString(),
      type,
      subject,
      message,
      email: email || session?.user?.email || '',
      name: name || session?.user?.name || 'Anonymous',
      userId: session?.user?.id || null,
      status: 'new',
      createdAt: new Date().toISOString()
    }

    feedbacks.push(feedback)

    return NextResponse.json({ 
      message: 'Feedback submitted successfully',
      feedbackId: feedback.id
    }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to submit feedback' }, { status: 500 })
  }
}
