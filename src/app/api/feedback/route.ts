import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'

// Simple feedback storage - you might want to create a proper Feedback model
import Feedback from '@/models/Feedback'

export async function GET(req: Request) {
  await dbConnect()
  
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 })
    return NextResponse.json(feedbacks)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch feedback' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  await dbConnect()
  console.log('Received feedback submission');
  try {
    const { type, title, description, email, rating, anonymous } = await req.json()
    if (!type || !title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const feedback = await Feedback.create({ type, title, description, email, rating, anonymous, status: 'Received' })
    return NextResponse.json({ 
      message: 'Feedback submitted successfully',
      feedbackId: feedback._id
    }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to submit feedback' }, { status: 500 })
  }
}
