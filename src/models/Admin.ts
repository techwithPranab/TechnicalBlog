import mongoose from 'mongoose'

export interface IAdmin {
  _id: string
  username: string
  email: string
  password: string
  role: 'super_admin' | 'admin'
  permissions: string[]
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

const adminSchema = new mongoose.Schema<IAdmin>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
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
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['super_admin', 'admin'],
    default: 'admin'
  },
  permissions: [{
    type: String,
    enum: [
      'manage_users',
      'manage_tags',
      'manage_feedback',
      'manage_faq',
      'manage_contacts',
      'manage_articles',
      'manage_questions',
      'view_analytics'
    ]
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
})

const Admin = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', adminSchema)

export default Admin
