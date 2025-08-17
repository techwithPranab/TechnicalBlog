import mongoose, { Schema, Document, model } from 'mongoose'

export interface IFeedback extends Document {
  type: string
  title: string
  description: string
  email?: string
  rating?: number
  anonymous?: boolean
  status: 'Received' | 'Implemented' | 'In Progress' | 'Rejected'
  adminNotes?: string
  createdAt: Date
  updatedAt: Date
}

const FeedbackSchema = new Schema<IFeedback>({
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: false },
  rating: { type: Number, required: false },
  anonymous: { type: Boolean, required: false },
  status: {
    type: String,
    enum: ['Received', 'Implemented', 'In Progress', 'Rejected'],
    default: 'Received',
    required: true
  },
  adminNotes: { type: String, required: false }
}, {
  timestamps: true
})

export default mongoose.models.Feedback || model<IFeedback>('Feedback', FeedbackSchema)
