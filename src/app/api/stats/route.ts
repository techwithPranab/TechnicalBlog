import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Question from '@/models/Question'
import Answer from '@/models/Answer'
import User from '@/models/User'
import Tag from '@/models/Tag'
import Comment from '@/models/Comment'

export async function GET() {
  await dbConnect()
  try {
    const [questionsCount, answersCount, usersCount, tagsCount, commentsCount] = await Promise.all([
      Question.countDocuments(),
      Answer.countDocuments(),
      User.countDocuments(),
      Tag.countDocuments(),
      Comment.countDocuments()
    ])

    const stats = {
      questions: questionsCount,
      answers: answersCount,
      users: usersCount,
      tags: tagsCount,
      comments: commentsCount,
      totalViews: await Question.aggregate([
        { $group: { _id: null, total: { $sum: '$views' } } }
      ]).then(result => result[0]?.total || 0)
    }

    return NextResponse.json(stats)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch stats' }, { status: 500 })
  }
}
