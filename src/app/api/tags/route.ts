import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Tag from '@/models/Tag'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req: Request) {
  await dbConnect()
  
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search')
  const sort = searchParams.get('sort') || 'usage'
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')

  try {
    let query: any = {}
    
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      }
    }

    let sortOptions: any = {}
    switch (sort) {
      case 'name':
        sortOptions = { name: 1 }
        break
      case 'newest':
        sortOptions = { createdAt: -1 }
        break
      case 'usage':
      default:
        sortOptions = { usageCount: -1 }
        break
    }

    const skip = (page - 1) * limit

    const tags = await Tag.find(query)
      .sort(sortOptions)
      .skip(skip)
      //.limit(limit)

    const total = await Tag.countDocuments(query)

    return NextResponse.json({
      tags,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch tags' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  await dbConnect()
  
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { name, description, color } = await req.json()

    if (!name) {
      return NextResponse.json({ error: 'Tag name is required' }, { status: 400 })
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const existingTag = await Tag.findOne({ $or: [{ name }, { slug }] })
    if (existingTag) {
      return NextResponse.json({ error: 'Tag already exists' }, { status: 409 })
    }

    const tag = await Tag.create({
      name,
      slug,
      description: description || '',
      color: color || '#3b82f6',
      usageCount: 0
    })

    return NextResponse.json(tag, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to create tag' }, { status: 500 })
  }
}
