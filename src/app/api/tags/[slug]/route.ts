import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Tag from '@/models/Tag'
import Question from '@/models/Question'
import '@/models/User'

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  await dbConnect()
  
  try {
    const tag = await Tag.findOne({ slug: params.slug })
    console.log('Tag found:', tag);
    if (!tag) {
      return NextResponse.json({ error: 'Tag not found' }, { status: 404 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const sort = searchParams.get('sort') || 'newest'

    let sortOptions: any = {}
    switch (sort) {
      case 'votes':
        sortOptions = { 'votes.score': -1 }
        break
      case 'views':
        sortOptions = { views: -1 }
        break
      case 'oldest':
        sortOptions = { createdAt: 1 }
        break
      case 'newest':
      default:
        sortOptions = { createdAt: -1 }
        break
    }

    const skip = (page - 1) * limit

    const questions = await Question.find({ tags: tag._id })
      .populate('author', 'name avatar reputation')
      .populate('tags', 'name slug color')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)

    const total = await Question.countDocuments({ tags: tag._id })

    return NextResponse.json({
      tag,
      questions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch tag' }, { status: 500 })
  }
}
