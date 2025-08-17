import mongoose, { Document, Schema } from 'mongoose'

export interface ITag extends Document {
  name: string
  slug: string
  description: string
  usageCount: number
  color?: string
  createdAt: Date
  updatedAt: Date
}

const TagSchema = new Schema<ITag>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 500,
    default: ''
  },
  usageCount: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    default: '#3b82f6'
  }
}, {
  timestamps: true
})

// Indexes
TagSchema.index({ name: 1 })
TagSchema.index({ slug: 1 })
TagSchema.index({ usageCount: -1 })

export default mongoose.models.Tag || mongoose.model<ITag>('Tag', TagSchema)
