import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import Question from '@/models/Question'
import Answer from '@/models/Answer'
import Tag from '@/models/Tag'

export async function GET(req: Request) {
  await dbConnect()
  // Parse time range from query string
  const url = new URL(req.url)
  const range = url.searchParams.get('range') || '7d'

  // Example: Fetch stats from DB
  try {
    const totalUsers = await User.countDocuments()
    const totalQuestions = await Question.countDocuments()
    const totalAnswers = await Answer.countDocuments()
    const totalViews = await Question.aggregate([
      { $group: { _id: null, views: { $sum: "$views" } } }
    ])
    const topTags = await Tag.find().sort({ usageCount: -1 }).limit(5)

    // Example: Weekly stats (mocked)
    const weeklyStats = [
      { day: 'Mon', questions: 15, answers: 28, users: 45 },
      { day: 'Tue', questions: 22, answers: 35, users: 52 },
      { day: 'Wed', questions: 18, answers: 42, users: 38 },
      { day: 'Thu', questions: 25, answers: 48, users: 61 },
      { day: 'Fri', questions: 28, answers: 52, users: 58 },
      { day: 'Sat', questions: 12, answers: 25, users: 35 },
      { day: 'Sun', questions: 8, answers: 18, users: 28 }
    ]

    // Example: Recent activity (mocked)
    const recentActivity = [
      {
        type: 'question',
        description: 'New question about React hooks',
        timestamp: new Date().toISOString(),
        user: 'john_doe'
      },
      {
        type: 'answer',
        description: 'Answer provided for TypeScript interface question',
        timestamp: new Date().toISOString(),
        user: 'jane_smith'
      }
    ]

    // Example: User stats (mocked)
    const userStats = {
      activeUsers: 145,
      newUsers: 28,
      returningUsers: 117,
      userRetention: 78.5
    }

    // Example: Content stats (mocked)
    const contentStats = {
      questionsToday: 12,
      answersToday: 34,
      averageResponseTime: 2.4,
      resolutionRate: 85.2
    }

    // Example: Growth stats (mocked)
    const overview = {
      totalUsers,
      totalQuestions,
      totalAnswers,
      totalViews: totalViews[0]?.views || 0,
      userGrowth: 12.5,
      questionGrowth: 8.3,
      answerGrowth: 15.2,
      viewGrowth: 22.1
    }

    return NextResponse.json({
      overview,
      userStats,
      contentStats,
      topTags: topTags.map(tag => ({ name: tag.name, count: tag.usageCount, growth: 10 })),
      recentActivity,
      weeklyStats
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch analytics' }, { status: 500 })
  }
}
