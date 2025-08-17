import { z } from 'zod'

// User schemas
export const userRegistrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export const userLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

export const userUpdateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional()
})

// Question schemas
export const questionCreateSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  body: z.string().min(10, 'Question body must be at least 10 characters'),
  tags: z.array(z.string()).min(1, 'At least one tag is required').max(5, 'Maximum 5 tags allowed')
})

export const questionUpdateSchema = z.object({
  title: z.string().min(5).max(200).optional(),
  body: z.string().min(10).optional(),
  tags: z.array(z.string()).min(1).max(5).optional(),
  status: z.enum(['open', 'closed']).optional()
})

// Answer schemas
export const answerCreateSchema = z.object({
  body: z.string().min(10, 'Answer must be at least 10 characters'),
  questionId: z.string().min(1, 'Question ID is required')
})

export const answerUpdateSchema = z.object({
  body: z.string().min(10).optional()
})

// Comment schemas
export const commentCreateSchema = z.object({
  body: z.string().min(1, 'Comment cannot be empty').max(1000),
  targetType: z.enum(['question', 'answer']),
  targetId: z.string().min(1, 'Target ID is required')
})

export const commentUpdateSchema = z.object({
  body: z.string().min(1).max(1000)
})

// Tag schemas
export const tagCreateSchema = z.object({
  name: z.string().min(2, 'Tag name must be at least 2 characters').max(50),
  description: z.string().max(500).optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').optional()
})

// Vote schemas
export const voteSchema = z.object({
  targetType: z.enum(['question', 'answer']),
  targetId: z.string().min(1, 'Target ID is required'),
  voteType: z.enum(['upvote', 'downvote'])
})

// Search schemas
export const searchSchema = z.object({
  q: z.string().optional(),
  tags: z.string().optional(),
  sort: z.enum(['newest', 'active', 'votes', 'unanswered']).optional(),
  page: z.number().positive().optional(),
  limit: z.number().positive().max(50).optional()
})

// Types
export type UserRegistration = z.infer<typeof userRegistrationSchema>
export type UserLogin = z.infer<typeof userLoginSchema>
export type UserUpdate = z.infer<typeof userUpdateSchema>
export type QuestionCreate = z.infer<typeof questionCreateSchema>
export type QuestionUpdate = z.infer<typeof questionUpdateSchema>
export type AnswerCreate = z.infer<typeof answerCreateSchema>
export type AnswerUpdate = z.infer<typeof answerUpdateSchema>
export type CommentCreate = z.infer<typeof commentCreateSchema>
export type CommentUpdate = z.infer<typeof commentUpdateSchema>
export type TagCreate = z.infer<typeof tagCreateSchema>
export type Vote = z.infer<typeof voteSchema>
export type Search = z.infer<typeof searchSchema>
