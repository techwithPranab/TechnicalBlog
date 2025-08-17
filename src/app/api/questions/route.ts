import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Question from '@/models/Question'
import '@/models/Tag' // Import to register Tag schema
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  await dbConnect()
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    // Validate body here (title, body, tags, etc.)
    const question = await Question.create({
      ...body,
      author: session.user.id
    })
    return NextResponse.json(question, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to create question' }, { status: 500 })
  }
}

export async function GET() {
  await dbConnect()
  try {
    const questions = await Question.find()
      .sort({ createdAt: -1 })
      .populate('tags', 'name slug')
      .populate('author', 'name reputation avatar')
    return NextResponse.json(questions)
  } catch (error: any) {
    console.log('Error fetching questions:', error);
    return NextResponse.json({ error: error?.message || 'Failed to fetch questions' }, { status: 500 })
  }
}
