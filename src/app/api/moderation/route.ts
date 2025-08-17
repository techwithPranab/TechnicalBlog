import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Question from '@/models/Question'
import Answer from '@/models/Answer'
import Comment from '@/models/Comment'
import User from '@/models/User'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  await dbConnect()
  
  const session = await getServerSession(authOptions)
  if (!session || !['admin', 'moderator'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { action, targetType, targetId, reason } = await req.json()

    if (!action || !targetType || !targetId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!['delete', 'hide', 'approve', 'reject', 'ban', 'warn'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    if (!['question', 'answer', 'comment', 'user'].includes(targetType)) {
      return NextResponse.json({ error: 'Invalid target type' }, { status: 400 })
    }

    let Model
    switch (targetType) {
      case 'question':
        Model = Question
        break
      case 'answer':
        Model = Answer
        break
      case 'comment':
        Model = Comment
        break
      case 'user':
        Model = User
        break
      default:
        return NextResponse.json({ error: 'Invalid target type' }, { status: 400 })
    }

    const target = await Model.findById(targetId)
    if (!target) {
      return NextResponse.json({ error: `${targetType} not found` }, { status: 404 })
    }

    let updateData: any = {}
    let message = ''

    switch (action) {
      case 'delete':
        if (targetType === 'user') {
          updateData = { isDeleted: true, deletedAt: new Date() }
        } else {
          await Model.findByIdAndDelete(targetId)
          message = `${targetType} deleted successfully`
        }
        break
      case 'hide':
        updateData = { isHidden: true, hiddenAt: new Date(), hiddenBy: session.user.id, hiddenReason: reason }
        message = `${targetType} hidden successfully`
        break
      case 'approve':
        updateData = { status: 'approved', approvedAt: new Date(), approvedBy: session.user.id }
        message = `${targetType} approved successfully`
        break
      case 'reject':
        updateData = { status: 'rejected', rejectedAt: new Date(), rejectedBy: session.user.id, rejectedReason: reason }
        message = `${targetType} rejected successfully`
        break
      case 'ban':
        if (targetType === 'user') {
          updateData = { isBanned: true, bannedAt: new Date(), bannedBy: session.user.id, banReason: reason }
          message = 'User banned successfully'
        } else {
          return NextResponse.json({ error: 'Ban action only applies to users' }, { status: 400 })
        }
        break
      case 'warn':
        if (targetType === 'user') {
          updateData = { $push: { warnings: { reason, date: new Date(), by: session.user.id } } }
          message = 'User warned successfully'
        } else {
          return NextResponse.json({ error: 'Warn action only applies to users' }, { status: 400 })
        }
        break
    }

    if (Object.keys(updateData).length > 0) {
      await Model.findByIdAndUpdate(targetId, updateData)
    }

    return NextResponse.json({ 
      message: message || `${action} performed successfully`,
      action,
      targetType,
      targetId
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to perform moderation action' }, { status: 500 })
  }
}
