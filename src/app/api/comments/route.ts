import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Comment from '@/models/Comment'
import Question from '@/models/Question'
import Answer from '@/models/Answer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req: Request) {
  await dbConnect()
  
  const { searchParams } = new URL(req.url)
  const targetType = searchParams.get('targetType')
  const targetId = searchParams.get('targetId')

  try {
    let query = {}
    if (targetType && targetId) {
      query = { targetType, targetId }
    }

    const comments = await Comment.find(query)
      .populate('author', 'name avatar reputation')
      .sort({ createdAt: -1 })

    return NextResponse.json(comments)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch comments' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  await dbConnect()
  
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { body, targetType, targetId } = await req.json()

    if (!body || !targetType || !targetId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!['question', 'answer'].includes(targetType)) {
      return NextResponse.json({ error: 'Invalid target type' }, { status: 400 })
    }

    // Verify target exists
    const Model = targetType === 'question' ? Question : Answer
    const target = await Model.findById(targetId)
    
    if (!target) {
      return NextResponse.json({ error: `${targetType} not found` }, { status: 404 })
    }

    const comment = await Comment.create({
      body,
      author: session.user.id,
      targetType,
      targetId
    })

    await comment.populate('author', 'name avatar reputation')

    // Add comment to target's comments array if it has one
    if (targetType === 'answer') {
      await Answer.findByIdAndUpdate(targetId, { $push: { comments: comment._id } })
    }

    return NextResponse.json(comment, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to create comment' }, { status: 500 })
  }
}
