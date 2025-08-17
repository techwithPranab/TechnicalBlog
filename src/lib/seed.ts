import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import dbConnect from './db'
import User from '@/models/User'
import Question from '@/models/Question'
import Answer from '@/models/Answer'
import Tag from '@/models/Tag'
import Comment from '@/models/Comment'

async function seed() {
  await dbConnect()

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Question.deleteMany({}),
    Answer.deleteMany({}),
    Tag.deleteMany({}),
    Comment.deleteMany({})
  ])

  // Create users
  const users = await User.create([
    { name: 'Alice', email: 'alice@example.com', password: 'password', role: 'user', reputation: 100 },
    { name: 'Bob', email: 'bob@example.com', password: 'password', role: 'user', reputation: 200 },
    { name: 'Admin', email: 'admin@example.com', password: 'adminpass', role: 'admin', reputation: 1000 }
  ])

  // Create tags
  const tags = await Tag.create([
    { name: 'javascript', slug: 'javascript', description: 'JavaScript programming language', usageCount: 10 },
    { name: 'react', slug: 'react', description: 'React.js front-end library', usageCount: 8 },
    { name: 'mongodb', slug: 'mongodb', description: 'MongoDB NoSQL database', usageCount: 5 },
    { name: 'nodejs', slug: 'nodejs', description: 'Node.js server-side runtime', usageCount: 7 },
    { name: 'typescript', slug: 'typescript', description: 'TypeScript typed superset of JavaScript', usageCount: 6 },
    { name: 'python', slug: 'python', description: 'Python programming language', usageCount: 12 },
    { name: 'django', slug: 'django', description: 'Django Python web framework', usageCount: 4 },
    { name: 'flask', slug: 'flask', description: 'Flask lightweight Python web framework', usageCount: 3 },
    { name: 'graphql', slug: 'graphql', description: 'GraphQL query language for APIs', usageCount: 5 },
    { name: 'docker', slug: 'docker', description: 'Docker containerization platform', usageCount: 9 },
    { name: 'kubernetes', slug: 'kubernetes', description: 'Kubernetes container orchestration', usageCount: 6 },
    { name: 'aws', slug: 'aws', description: 'Amazon Web Services cloud platform', usageCount: 11 },
    { name: 'azure', slug: 'azure', description: 'Microsoft Azure cloud platform', usageCount: 4 },
    { name: 'gcp', slug: 'gcp', description: 'Google Cloud Platform', usageCount: 3 },
    { name: 'mysql', slug: 'mysql', description: 'MySQL relational database', usageCount: 7 },
    { name: 'postgresql', slug: 'postgresql', description: 'PostgreSQL relational database', usageCount: 6 },
    { name: 'redis', slug: 'redis', description: 'Redis in-memory data store', usageCount: 5 },
    { name: 'linux', slug: 'linux', description: 'Linux operating system', usageCount: 10 },
    { name: 'git', slug: 'git', description: 'Git version control system', usageCount: 13 },
    { name: 'ci-cd', slug: 'ci-cd', description: 'Continuous Integration and Continuous Deployment', usageCount: 8 }
  ])

  // Create questions
  const questions = await Question.create([
    {
      title: 'How to use useEffect in React?',
      slug: 'how-to-use-useeffect-in-react',
      body: 'I am trying to understand how useEffect works in React. Can someone explain?',
      tags: [tags[1]._id],
      author: users[0]._id,
      status: 'open',
      views: 12
    },
    {
      title: 'Best practices for MongoDB indexing?',
      slug: 'best-practices-for-mongodb-indexing',
      body: 'What are the best practices for creating indexes in MongoDB?',
      tags: [tags[2]._id],
      author: users[1]._id,
      status: 'open',
      views: 8
    }
  ])

  // Create answers
  const answers = await Answer.create([
    {
      body: 'You can use useEffect for side effects in React components.',
      question: questions[0]._id,
      author: users[1]._id
    },
    {
      body: 'Create indexes on fields that are frequently queried.',
      question: questions[1]._id,
      author: users[0]._id
    }
  ])

  // Create comments
  await Comment.create([
    {
      body: 'Great answer!',
      author: users[0]._id,
      targetType: 'question',
      targetId: questions[0]._id
    },
    {
      body: 'Thanks for the tips.',
      author: users[1]._id,
      targetType: 'answer',
      targetId: answers[1]._id
    }
  ])

  console.log('Database seeded successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
