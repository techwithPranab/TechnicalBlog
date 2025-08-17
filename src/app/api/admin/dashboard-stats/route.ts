import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import Question from '@/models/Question'
import Feedback from '@/models/Feedback'
import FAQ from '@/models/FAQ'
import Contact from '@/models/Contact'
import Article from '@/models/Article'

// Only import models that exist and are used
// If you have dedicated FAQ and Article models, import them here

export async function GET() {
  await dbConnect()

  // Fetch stats from DB
  const [
    totalUsers,
    totalQuestions,
    totalFeedback,
    totalFAQs,
    totalContacts,
    totalArticles
  ] = await Promise.all([
    User.countDocuments(),
    Question.countDocuments(),
    Feedback.countDocuments(),
    FAQ.countDocuments(),
    Contact.countDocuments(),
    Article.countDocuments()
  ])

  return NextResponse.json({
    totalUsers,
    totalQuestions,
    totalFeedback,
    totalFAQs,
    totalContacts,
    totalArticles
  })
}
