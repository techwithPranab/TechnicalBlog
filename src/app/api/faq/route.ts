import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import FAQ from '@/models/FAQ'

export async function GET() {
  await dbConnect()
  try {
    const faqs = await FAQ.find().sort({ category: 1, createdAt: 1 })
    return NextResponse.json(faqs)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch FAQs' }, { status: 500 })
  }
}
