import mongoose, { Document, Schema } from 'mongoose'

export interface IQuestion extends Document {
  title: string
  body: string
  slug: string
  author: mongoose.Types.ObjectId
  tags: mongoose.Types.ObjectId[]
  views: number
  votes: {
    upvotes: mongoose.Types.ObjectId[]
    downvotes: mongoose.Types.ObjectId[]
    score: number
  }
  status: 'open' | 'closed'
  acceptedAnswerId?: mongoose.Types.ObjectId
  answersCount: number
  createdAt: Date
  updatedAt: Date
}

const QuestionSchema = new Schema<IQuestion>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  body: {
    type: String,
    required: true,
    minlength: 10
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  views: {
    type: Number,
    default: 0
  },
  votes: {
    upvotes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    downvotes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    score: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  acceptedAnswerId: {
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  },
  answersCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Indexes
QuestionSchema.index({ slug: 1 })
QuestionSchema.index({ author: 1 })
QuestionSchema.index({ tags: 1 })
QuestionSchema.index({ 'votes.score': -1 })
QuestionSchema.index({ createdAt: -1 })
QuestionSchema.index({ views: -1 })
QuestionSchema.index({ title: 'text', body: 'text' })

export default mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema)
