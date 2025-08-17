# TechBlog - Q&A Coding Community

A full-stack Q&A coding blog similar to StackOverflow, built with Next.js 14+, TypeScript, MongoDB, and modern web technologies.

## ✨ Features

### 🔥 Core Features
- **Questions & Answers**: Full CRUD operations with rich Markdown support
- **User Authentication**: NextAuth with Google/GitHub OAuth + Credentials
- **Voting System**: Upvote/downvote questions and answers
- **Comments**: Threaded comments with likes
- **Tags**: Organized content with tag descriptions and usage counts
- **Search**: Advanced search with filters and sorting
- **User Profiles**: Reputation system and user management

### 🎨 UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: System preference support with manual toggle
- **Modern UI**: shadcn/ui components with Radix primitives
- **Accessibility**: WCAG compliant with proper ARIA labels

### 📝 Content Management
- **Markdown Support**: Rich text editing with MDX
- **Syntax Highlighting**: Code blocks with copy functionality (Shiki)
- **Content Sanitization**: DOMPurify for security
- **SEO Optimization**: Meta tags, OpenGraph, JSON-LD

### 🔒 Security & Performance
- **Rate Limiting**: API endpoint protection
- **CSRF Protection**: NextAuth security features
- **Input Validation**: Zod schemas for type-safe validation
- **Database Optimization**: MongoDB indexing and efficient queries

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Forms**: react-hook-form + zod validation
- **Themes**: next-themes

### Backend
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js (JWT strategy)
- **Validation**: Zod schemas
- **Content Processing**: MDX, remark, rehype

### Development
- **Testing**: Vitest + jsdom
- **Linting**: ESLint + Next.js config
- **Type Safety**: TypeScript strict mode

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Google OAuth credentials (optional)
- GitHub OAuth credentials (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TechBlog_Final
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/techblog
   
   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   
   # OAuth Providers (optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas cloud service
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication pages
│   ├── api/                 # API routes
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── layout/              # Layout components
│   ├── forms/               # Form components
│   └── features/            # Feature-specific components
├── lib/
│   ├── auth.ts              # NextAuth configuration
│   ├── db.ts                # Database connection
│   ├── utils.ts             # Utility functions
│   └── validations.ts       # Zod schemas
├── models/                  # Mongoose models
│   ├── User.ts
│   ├── Question.ts
│   ├── Answer.ts
│   ├── Comment.ts
│   └── Tag.ts
├── hooks/                   # Custom React hooks
└── test/                    # Test files and setup
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signup` - User registration
- `GET /api/auth/session` - Get current session

### Question Endpoints
- `GET /api/questions` - List questions with pagination
- `POST /api/questions` - Create new question
- `GET /api/questions/[id]` - Get question by ID
- `PUT /api/questions/[id]` - Update question
- `DELETE /api/questions/[id]` - Delete question

### Answer Endpoints
- `GET /api/questions/[id]/answers` - Get answers for question
- `POST /api/questions/[id]/answers` - Create new answer
- `PUT /api/answers/[id]` - Update answer
- `DELETE /api/answers/[id]` - Delete answer

### Voting Endpoints
- `POST /api/votes` - Cast vote (upvote/downvote)
- `DELETE /api/votes` - Remove vote

## 🔧 Configuration

### MongoDB Indexes
The application automatically creates indexes for optimal performance:
- User: email, reputation
- Question: slug, author, tags, votes.score, createdAt, views
- Answer: question, author, votes.score, createdAt
- Comment: targetType + targetId, author, createdAt
- Tag: name, slug, usageCount

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret key | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID | No |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret | No |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [MongoDB](https://www.mongodb.com/) for the database
- [Vercel](https://vercel.com/) for deployment platform

## 📞 Support

If you have any questions or need help:
- 📧 Email: support@techblog.com
- 💬 Discord: [Join our community](https://discord.gg/techblog)
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)

---

**Made with ❤️ for the developer community**
