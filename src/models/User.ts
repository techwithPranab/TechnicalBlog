import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password?: string
  avatar?: string
  bio?: string
  reputation: number
  role: 'user' | 'admin' | 'moderator'
  githubId?: string
  googleId?: string
  emailVerified?: Date
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    minlength: 6
  },
  avatar: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  reputation: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  githubId: String,
  googleId: String,
  emailVerified: Date
}, {
  timestamps: true
})

// Index for better performance
UserSchema.index({ email: 1 })
UserSchema.index({ reputation: -1 })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
