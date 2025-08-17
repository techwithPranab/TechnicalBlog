import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import Question from '@/models/Question'
import Answer from '@/models/Answer'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await dbConnect()
  
  try {
    const user = await User.findById(params.id).select('-password')
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get user stats
    const [questionsCount, answersCount, recentQuestions, recentAnswers] = await Promise.all([
      Question.countDocuments({ author: params.id }),
      Answer.countDocuments({ author: params.id }),
      Question.find({ author: params.id })
        .populate('tags', 'name slug')
        .sort({ createdAt: -1 })
        .limit(5),
      Answer.find({ author: params.id })
        .populate('question', 'title slug')
        .sort({ createdAt: -1 })
        .limit(5)
    ])

    const userWithStats = {
      ...user.toObject(),
      stats: {
        questions: questionsCount,
        answers: answersCount
      },
      recent: {
        questions: recentQuestions,
        answers: recentAnswers
      }
    }

    return NextResponse.json(userWithStats)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch user' }, { status: 500 })
  }
}
