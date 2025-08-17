import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Feedback from '@/models/Feedback'
import jwt from 'jsonwebtoken'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect()
  
  try {
    // Check authorization
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    } catch (error) {
      console.error('Token verification failed:', error)
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { status, adminNotes } = await req.json()

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      )
    }

    const validStatuses = ['Received', 'In Progress', 'Implemented', 'Rejected']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const feedback = await Feedback.findByIdAndUpdate(
      params.id,
      { 
        status,
        adminNotes: adminNotes || undefined
      },
      { new: true }
    )

    if (!feedback) {
      return NextResponse.json(
        { error: 'Feedback not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      feedback
    })

  } catch (error: any) {
    console.error('Error updating feedback:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
