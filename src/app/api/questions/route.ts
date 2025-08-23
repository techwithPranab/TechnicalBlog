import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Question from '@/models/Question'
import Tag from '@/models/Tag'
import '@/models/Tag' // Import to register Tag schema
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, body: questionBody, tags } = body

    // Validate required fields
    if (!title || !questionBody) {
      return NextResponse.json({ error: 'Title and body are required' }, { status: 400 })
    }

    // Convert tag names/slugs to ObjectIds
    let tagIds: any[] = []
    if (Array.isArray(tags)) {
      tagIds = await Promise.all(
        tags.map(async (tag: string) => {
          const found = await Tag.findOne({ $or: [{ slug: tag }, { name: tag }] })
          return found ? found._id : null
        })
      )
      tagIds = tagIds.filter(Boolean)
    }

    // Generate slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    // Create question
    const question = await Question.create({
      title,
      body: questionBody,
      slug,
      author: session.user.id,
      tags: tagIds
    })

    // Populate the question before returning
    const populatedQuestion = await Question.findById(question._id)
      .populate('tags', 'name slug')
      .populate('author', 'name reputation avatar')

    return NextResponse.json(populatedQuestion, { status: 201 })
  } catch (error: any) {
    console.error('Error creating question:', error)
    return NextResponse.json({ 
      error: error?.message || 'Failed to create question',
      details: error?.stack 
    }, { status: 500 })
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
