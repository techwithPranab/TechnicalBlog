import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Article from '@/models/Article'

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  await dbConnect()
  
  try {
    const article = await Article.findOne({ slug: params.slug, published: true })
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }
    
    // Increment view count
    await Article.findByIdAndUpdate(article._id, { $inc: { views: 1 } })
    
    return NextResponse.json(article)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch article' }, { status: 500 })
  }
}
