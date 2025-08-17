import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Contact from '@/models/Contact'

export async function POST(req: Request) {
  await dbConnect()
  const data = await req.json()

  try {
    const contact = await Contact.create(data)
    return NextResponse.json({ success: true, contact })
  } catch (err) {
    console.error('Error saving contact:', err)
    return NextResponse.json({ success: false, error: 'Failed to save contact' }, { status: 500 })
  }
}
