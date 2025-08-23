const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  reputation: { type: Number, default: 0 },
  badges: [{
    name: String,
    type: String,
    description: String,
    awardedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

// Tag Schema
const TagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  usageCount: { type: Number, default: 0 },
  color: { type: String, default: '#3b82f6' }
}, { timestamps: true });

// Question Schema
const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  views: { type: Number, default: 0 },
  votes: {
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    score: { type: Number, default: 0 }
  },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  answersCount: { type: Number, default: 0 }
}, { timestamps: true });

// Answer Schema
const AnswerSchema = new mongoose.Schema({
  body: { type: String, required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  votes: {
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    score: { type: Number, default: 0 }
  },
  isAccepted: { type: Boolean, default: false }
}, { timestamps: true });

// Comment Schema
const CommentSchema = new mongoose.Schema({
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetType: { type: String, enum: ['question', 'answer'], required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true }
}, { timestamps: true });

// FAQ Schema
const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, required: true }
}, { timestamps: true });

// Article Schema
const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  tags: [String],
  author: { type: String, required: true },
  views: { type: Number, default: 0 },
  published: { type: Boolean, default: true }
}, { timestamps: true });

// Create models
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Tag = mongoose.models.Tag || mongoose.model('Tag', TagSchema);
const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);
const Answer = mongoose.models.Answer || mongoose.model('Answer', AnswerSchema);
const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);
const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Question.deleteMany({}),
      Answer.deleteMany({}),
      Tag.deleteMany({}),
      Comment.deleteMany({}),
      FAQ.deleteMany({}),
      Article.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Create users
    const users = await User.create([
      { name: 'Alice', email: 'alice@example.com', password: 'password', role: 'user', reputation: 100 },
      { name: 'Bob', email: 'bob@example.com', password: 'password', role: 'user', reputation: 200 },
      { name: 'Admin', email: 'admin@example.com', password: 'adminpass', role: 'admin', reputation: 1000 }
    ]);
    console.log('Created users');

    // Create tags
    const tags = await Tag.create([
      { name: 'JavaScript', slug: 'javascript', description: 'JavaScript programming language', usageCount: 10 },
      { name: 'React', slug: 'react', description: 'React.js front-end library', usageCount: 8 },
      { name: 'MongoDB', slug: 'mongodb', description: 'MongoDB NoSQL database', usageCount: 5 },
      { name: 'Node.js', slug: 'nodejs', description: 'Node.js server-side runtime', usageCount: 7 },
      { name: 'TypeScript', slug: 'typescript', description: 'TypeScript typed superset of JavaScript', usageCount: 6 },
      { name: 'Python', slug: 'python', description: 'Python programming language', usageCount: 12 },
      { name: 'Django', slug: 'django', description: 'Django Python web framework', usageCount: 4 },
      { name: 'Flask', slug: 'flask', description: 'Flask lightweight Python web framework', usageCount: 3 },
      { name: 'GraphQL', slug: 'graphql', description: 'GraphQL query language for APIs', usageCount: 5 },
      { name: 'Docker', slug: 'docker', description: 'Docker containerization platform', usageCount: 9 },
      { name: 'Kubernetes', slug: 'kubernetes', description: 'Kubernetes container orchestration', usageCount: 6 },
      { name: 'AWS', slug: 'aws', description: 'Amazon Web Services cloud platform', usageCount: 11 },
      { name: 'CSS', slug: 'css', description: 'Cascading Style Sheets', usageCount: 8 },
      { name: 'HTML', slug: 'html', description: 'HyperText Markup Language', usageCount: 7 },
      { name: 'Next.js', slug: 'nextjs', description: 'Next.js React framework', usageCount: 9 }
    ]);
    console.log('Created tags');

    // Create questions
    const questions = await Question.create([
      {
        title: 'How to use useEffect in React?',
        slug: 'how-to-use-useeffect-in-react',
        body: 'I am trying to understand how useEffect works in React. Can someone explain with examples?',
        tags: [tags[1]._id, tags[0]._id], // React, JavaScript
        author: users[0]._id,
        status: 'open',
        views: 12
      },
      {
        title: 'Best practices for MongoDB indexing?',
        slug: 'best-practices-for-mongodb-indexing',
        body: 'What are the best practices for creating indexes in MongoDB for optimal performance?',
        tags: [tags[2]._id], // MongoDB
        author: users[1]._id,
        status: 'open',
        views: 8
      },
      {
        title: 'TypeScript vs JavaScript: When to use what?',
        slug: 'typescript-vs-javascript-when-to-use',
        body: 'I am confused about when to use TypeScript over JavaScript. What are the main benefits?',
        tags: [tags[4]._id, tags[0]._id], // TypeScript, JavaScript
        author: users[0]._id,
        status: 'open',
        views: 25
      }
    ]);
    console.log('Created questions');

    // Create answers
    const answers = await Answer.create([
      {
        body: 'useEffect is used for side effects in React components. It runs after every render by default, but you can control when it runs using the dependency array.',
        question: questions[0]._id,
        author: users[1]._id
      },
      {
        body: 'For MongoDB indexing: 1) Create indexes on fields you query frequently, 2) Use compound indexes for multi-field queries, 3) Monitor index performance with explain().',
        question: questions[1]._id,
        author: users[0]._id
      }
    ]);
    console.log('Created answers');

    // Create comments
    await Comment.create([
      {
        body: 'Great explanation! This helped me understand useEffect better.',
        author: users[0]._id,
        targetType: 'question',
        targetId: questions[0]._id
      },
      {
        body: 'Thanks for the MongoDB tips, very useful!',
        author: users[1]._id,
        targetType: 'answer',
        targetId: answers[1]._id
      }
    ]);
    console.log('Created comments');

    // Create FAQ entries
    const faqs = [
      { question: 'How do I create an account?', answer: 'Click the Sign Up button and fill in your details.', category: 'Getting Started' },
      { question: 'How do I ask a good question?', answer: 'Be specific, provide context, include code examples, and use proper formatting.', category: 'Asking Questions' },
      { question: 'How does the reputation system work?', answer: 'You earn reputation when other users upvote your questions and answers.', category: 'Community' },
    ];
    await FAQ.insertMany(faqs);
    console.log('Created FAQ entries');

    // Create articles
    const articles = [
      {
        title: 'How to ask a good question',
        content: '<h2>Writing Effective Questions</h2><p>A well-written question gets better answers...</p>',
        category: 'getting-started',
        slug: 'how-to-ask-good-question',
        tags: ['questions', 'getting-started'],
        author: 'TechBlog Team',
        views: 150,
        published: true
      }
    ];
    await Article.insertMany(articles);
    console.log('Created articles');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
