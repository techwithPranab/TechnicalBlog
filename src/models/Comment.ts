import mongoose, { Document, Schema } from 'mongoose'

export interface IComment extends Document {
  body: string
  author: mongoose.Types.ObjectId
  targetType: 'question' | 'answer'
  targetId: mongoose.Types.ObjectId
  likes: mongoose.Types.ObjectId[]
  isDeleted: boolean
  deletedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const CommentSchema = new Schema<IComment>({
  body: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetType: {
    type: String,
    enum: ['question', 'answer'],
    required: true
  },
  targetId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'targetType'
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
}, {
  timestamps: true
})

// Indexes
CommentSchema.index({ targetType: 1, targetId: 1 })
CommentSchema.index({ author: 1 })
CommentSchema.index({ createdAt: -1 })

export default mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema)
