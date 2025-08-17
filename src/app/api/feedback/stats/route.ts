import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Feedback from '@/models/Feedback'

export async function GET() {
  await dbConnect()
  try {
    // Get all feedbacks
    const feedbacks = await Feedback.find()
    // Stats calculations
    const feedbackReceived = feedbacks.length
    const featuresImplemented = feedbacks.filter(f => f.status === 'Implemented').length
    const bugsFixed = feedbacks.filter(f => f.type === 'bug' && f.status === 'Implemented').length
    // Response rate: implemented + in progress / total
    const responded = feedbacks.filter(f => ['Implemented', 'In Progress'].includes(f.status)).length
    const responseRate = feedbackReceived > 0 ? Math.round((responded / feedbackReceived) * 100) : 0
    return NextResponse.json({
      feedbackReceived,
      featuresImplemented,
      bugsFixed,
      responseRate
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch stats' }, { status: 500 })
  }
}
