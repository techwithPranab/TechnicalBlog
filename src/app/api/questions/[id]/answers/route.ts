import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Question from '@/models/Question'
import Answer from '@/models/Answer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import '@/models/Tag' // Import to register Tag schema
import '@/models/Comment' // Import to register Comment schema

export async function POST(req: Request, { params }: { params: { id: string } }) {
  await dbConnect()
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    // Validate body here (answer text, etc.)
    const answer = await Answer.create({
      ...body,
      question: params.id,
      author: session.user.id
    })
    // Update question's answer count
    await Question.findByIdAndUpdate(params.id, { $inc: { answersCount: 1 } })
    return NextResponse.json(answer, { status: 201 })
  } catch (error: any) {
    console.log('Error creating answer:', error);
    return NextResponse.json({ error: error?.message || 'Failed to create answer' }, { status: 500 })
  }
}

// GET /api/questions/[id]/answers
export async function GET(req: Request, { params }: { params: { id: string } }) {
  await dbConnect()
  const questionId = params?.id
  if (!questionId || questionId === 'undefined') {
    return NextResponse.json([], { status: 200 })
  }
  try {
    const answers = await Answer.find({ question: questionId })
      .populate({
        path: 'author',
        select: 'name avatar reputation',
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'name avatar reputation',
        },
      })
      .sort({ isAccepted: -1, createdAt: 1 })
    return NextResponse.json(answers, { status: 200 })
  } catch (error: any) {
    console.log('Error fetching answers:', error);
    return NextResponse.json({ error: error?.message || 'Failed to fetch answers' }, { status: 500 })
  }
}
