import mongoose, { Schema, Document, model } from 'mongoose'

export interface IArticle extends Document {
  title: string
  content: string
  category: string
  slug: string
  tags: string[]
  author: string
  isPublished: boolean
  views: number
  createdAt: Date
  updatedAt: Date
}

const ArticleSchema = new Schema<IArticle>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  tags: [{ type: String }],
  author: { type: String, required: true },
  isPublished: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export default mongoose.models.Article || model<IArticle>('Article', ArticleSchema)
