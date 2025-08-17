import mongoose, { Document, Schema } from 'mongoose'

export interface IAnswer extends Document {
  body: string
  author: mongoose.Types.ObjectId
  question: mongoose.Types.ObjectId
  votes: {
    upvotes: mongoose.Types.ObjectId[]
    downvotes: mongoose.Types.ObjectId[]
    score: number
  }
  isAccepted: boolean
  comments: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const AnswerSchema = new Schema<IAnswer>({
  body: {
    type: String,
    required: true,
    minlength: 10
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
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
  isAccepted: {
    type: Boolean,
    default: false
   },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    default: []
  }],
}, {
  timestamps: true
})

// Indexes
AnswerSchema.index({ question: 1 })
AnswerSchema.index({ author: 1 })
AnswerSchema.index({ 'votes.score': -1 })
AnswerSchema.index({ createdAt: -1 })
AnswerSchema.index({ isAccepted: -1 })

export default mongoose.models.Answer || mongoose.model<IAnswer>('Answer', AnswerSchema)
