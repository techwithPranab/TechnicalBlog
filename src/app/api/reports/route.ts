import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Simple report model - you might want to create a proper Report model
const reports: any[] = []

export async function GET(req: Request) {
  await dbConnect()
  
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Return all reports for admin
    return NextResponse.json(reports)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch reports' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  await dbConnect()
  
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { reason, targetType, targetId, description } = await req.json()

    if (!reason || !targetType || !targetId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!['question', 'answer', 'comment', 'user'].includes(targetType)) {
      return NextResponse.json({ error: 'Invalid target type' }, { status: 400 })
    }

    const report = {
      id: Date.now().toString(),
      reason,
      targetType,
      targetId,
      description: description || '',
      reportedBy: session.user.id,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    reports.push(report)

    return NextResponse.json({ 
      message: 'Report submitted successfully',
      reportId: report.id
    }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to submit report' }, { status: 500 })
  }
}
