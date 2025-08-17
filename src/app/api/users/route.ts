import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'

export async function GET(req: Request) {
  await dbConnect()
  
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search')
  const sort = searchParams.get('sort') || 'reputation'
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')

  try {
    let query: any = {}
    
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
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
      case 'oldest':
        sortOptions = { createdAt: 1 }
        break
      case 'reputation':
      default:
        sortOptions = { reputation: -1 }
        break
    }

    const skip = (page - 1) * limit

    const users = await User.find(query)
      .select('-password') // Exclude sensitive data
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)

    const total = await User.countDocuments(query)

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch users' }, { status: 500 })
  }
}
