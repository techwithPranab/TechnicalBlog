import mongoose, { Schema, Document, model } from 'mongoose'

export interface IContact extends Document {
  name: string
  email: string
  subject: string
  category: string
  message: string
  createdAt: Date
}

const ContactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  category: { type: String, required: false },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Contact || model<IContact>('Contact', ContactSchema)
