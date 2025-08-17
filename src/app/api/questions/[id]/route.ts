import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Question from '@/models/Question'
import '@/models/Tag' // Import to register Tag schema

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await dbConnect()
  try {
    const question = await Question.findById(params.id)
      .populate('author', 'name reputation avatar')
      .populate('tags', 'name slug')
    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    // Fetch comments for this question
    const Comment = (await import('@/models/Comment')).default
    const comments = await Comment.find({ targetType: 'question', targetId: question._id })
      .populate('author', 'name reputation avatar')

    return NextResponse.json({ ...question.toObject(), comments })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch question' }, { status: 500 })
  }
}
