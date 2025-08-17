import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Question from '@/models/Question'
import Answer from '@/models/Answer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  await dbConnect()
  
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { voteType, targetType, targetId } = await req.json()

    if (!['upvote', 'downvote'].includes(voteType) || !['question', 'answer'].includes(targetType)) {
      return NextResponse.json({ error: 'Invalid vote parameters' }, { status: 400 })
    }

    const Model = targetType === 'question' ? Question : Answer
    const target = await Model.findById(targetId)
    
    if (!target) {
      return NextResponse.json({ error: `${targetType} not found` }, { status: 404 })
    }

    const userId = session.user.id
    const upvotes = target.votes.upvotes || []
    const downvotes = target.votes.downvotes || []

    // Remove user from both arrays first
    const newUpvotes = upvotes.filter((id: any) => id.toString() !== userId)
    const newDownvotes = downvotes.filter((id: any) => id.toString() !== userId)

    // Add to appropriate array
    if (voteType === 'upvote') {
      newUpvotes.push(userId)
    } else {
      newDownvotes.push(userId)
    }

    // Calculate new score
    const newScore = newUpvotes.length - newDownvotes.length

    await Model.findByIdAndUpdate(targetId, {
      'votes.upvotes': newUpvotes,
      'votes.downvotes': newDownvotes,
      'votes.score': newScore
    })

    return NextResponse.json({ 
      message: 'Vote recorded',
      score: newScore
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to record vote' }, { status: 500 })
  }
}
