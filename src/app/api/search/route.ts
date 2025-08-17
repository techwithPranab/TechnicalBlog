import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Question from '@/models/Question'
import '@/models/Tag'
import '@/models/User'

export async function GET(req: Request) {
  await dbConnect()
  
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q') || ''
  const filter = searchParams.get('filter') || 'newest'
  const tag = searchParams.get('tag')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')

  try {
    let searchQuery: any = {}

    // Text search
    if (query) {
      searchQuery.$or = [
        { title: { $regex: query, $options: 'i' } },
        { body: { $regex: query, $options: 'i' } }
      ]
    }

    // Tag filter
    if (tag) {
      searchQuery.tags = tag
    }

    // Sort options
    let sortOptions: any = {}
    switch (filter) {
      case 'newest':
        sortOptions = { createdAt: -1 }
        break
      case 'oldest':
        sortOptions = { createdAt: 1 }
        break
      case 'votes':
        sortOptions = { 'votes.score': -1 }
        break
      case 'views':
        sortOptions = { views: -1 }
        break
      case 'unanswered':
        searchQuery.answersCount = 0
        sortOptions = { createdAt: -1 }
        break
      default:
        sortOptions = { createdAt: -1 }
    }

    const skip = (page - 1) * limit

    const questions = await Question.find(searchQuery)
      .populate('author', 'name avatar reputation')
      .populate('tags', 'name slug color')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)

    const total = await Question.countDocuments(searchQuery)

    return NextResponse.json({
      questions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to search questions' }, { status: 500 })
  }
}
