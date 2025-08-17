import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Article from '@/models/Article'

export async function GET(req: Request) {
  await dbConnect()
  
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const limit = parseInt(searchParams.get('limit') || '0')
  
  try {
    let query: any = { isPublished: true }
    if (category) {
      query.category = category
    }
    
    let articlesQuery = Article.find(query).sort({ createdAt: -1 })
    if (limit > 0) {
      articlesQuery = articlesQuery.limit(limit)
    }
    
    const articles = await articlesQuery
    return NextResponse.json(articles)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch articles' }, { status: 500 })
  }
}
