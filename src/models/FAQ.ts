import mongoose, { Schema, Document, model } from 'mongoose'

export interface IFAQ extends Document {
  question: string
  answer: string
  category?: string
  createdAt: Date
  updatedAt: Date
}

const FAQSchema = new Schema<IFAQ>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export default mongoose.models.FAQ || model<IFAQ>('FAQ', FAQSchema)
