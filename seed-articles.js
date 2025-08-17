const { default: dbConnect } = require('./db.js');
const { default: Article } = require('../models/Article.js');

const articles = [
  {
    title: "How to ask a good question",
    content: `<h2>Writing Effective Questions</h2>
    <p>A well-written question is more likely to get helpful answers. Here are the key elements of a good question:</p>
    
    <h3>1. Clear and Specific Title</h3>
    <p>Your title should be specific and describe your problem concisely. Avoid vague titles like "Help me" or "This doesn't work".</p>
    <ul>
      <li><strong>Good:</strong> "How to iterate over a HashMap in Java 8?"</li>
      <li><strong>Bad:</strong> "Java problem help needed"</li>
    </ul>
    
    <h3>2. Provide Context</h3>
    <p>Explain what you're trying to achieve and what you've already tried. This helps others understand your situation better.</p>
    
    <h3>3. Include Code Examples</h3>
    <p>If your question involves code, provide a minimal, complete, and verifiable example. This makes it easier for others to understand and reproduce your issue.</p>
    
    <h3>4. Show Your Research</h3>
    <p>Mention what you've already researched or attempted. This shows effort and prevents duplicate suggestions.</p>
    
    <h3>5. Use Proper Formatting</h3>
    <p>Use code blocks, bullet points, and proper formatting to make your question easy to read and understand.</p>
    
    <h3>6. Be Respectful</h3>
    <p>Remember that people are volunteering their time to help you. Be polite and grateful for any assistance you receive.</p>`,
    category: "getting-started",
    slug: "how-to-ask-good-question",
    tags: ["questions", "getting-started", "best-practices"],
    author: "TechBlog Team",
    views: 2150,
    published: true
  },
  {
    title: "Understanding the reputation system",
    content: `<h2>How Reputation Works</h2>
    <p>Reputation is a measure of how much the community trusts you. It's earned by posting quality questions and answers that other community members find helpful.</p>
    
    <h3>Earning Reputation</h3>
    <ul>
      <li><strong>+15</strong> - Your answer is voted up</li>
      <li><strong>+10</strong> - Your question is voted up</li>
      <li><strong>+15</strong> - Your answer is accepted</li>
      <li><strong>+2</strong> - You accept an answer to your question</li>
    </ul>
    
    <h3>Losing Reputation</h3>
    <ul>
      <li><strong>-2</strong> - Your answer is voted down</li>
      <li><strong>-2</strong> - Your question is voted down</li>
      <li><strong>-1</strong> - You vote down an answer</li>
    </ul>
    
    <h3>Reputation Privileges</h3>
    <p>As you earn more reputation, you unlock new privileges:</p>
    <ul>
      <li><strong>15 rep:</strong> Vote up</li>
      <li><strong>50 rep:</strong> Comment everywhere</li>
      <li><strong>125 rep:</strong> Vote down</li>
      <li><strong>500 rep:</strong> Access review queues</li>
      <li><strong>1000 rep:</strong> See vote counts</li>
    </ul>
    
    <h3>Daily Limits</h3>
    <p>There are daily limits on how much reputation you can gain from votes to prevent gaming the system:</p>
    <ul>
      <li>Maximum 200 reputation from upvotes per day</li>
      <li>Accepted answers and bounties don't count toward this limit</li>
    </ul>`,
    category: "getting-started",
    slug: "understanding-reputation-system",
    tags: ["reputation", "voting", "privileges"],
    author: "TechBlog Team",
    views: 1890,
    published: true
  },
  {
    title: "Formatting code in questions and answers",
    content: `<h2>Code Formatting Guide</h2>
    <p>Proper code formatting makes your questions and answers much easier to read and understand. Here's how to format code effectively on TechBlog.</p>
    
    <h3>Inline Code</h3>
    <p>For short snippets or variable names, use backticks:</p>
    <p><code>\`console.log()\`</code> renders as <code>console.log()</code></p>
    
    <h3>Code Blocks</h3>
    <p>For longer code snippets, use triple backticks with language specification:</p>
    <pre><code>\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`</code></pre>
    
    <h3>Supported Languages</h3>
    <p>TechBlog supports syntax highlighting for many languages:</p>
    <ul>
      <li>javascript, typescript, jsx, tsx</li>
      <li>python, java, c, cpp, csharp</li>
      <li>html, css, scss, less</li>
      <li>sql, json, xml, yaml</li>
      <li>bash, shell, powershell</li>
      <li>And many more...</li>
    </ul>
    
    <h3>Best Practices</h3>
    <ul>
      <li>Always specify the language for syntax highlighting</li>
      <li>Remove unnecessary whitespace and comments</li>
      <li>Include only relevant code - create minimal examples</li>
      <li>Use consistent indentation (2 or 4 spaces)</li>
      <li>Add comments to explain complex logic</li>
    </ul>
    
    <h3>Example Output</h3>
    <p>Here's how properly formatted code looks:</p>
    <pre><code>// Calculate factorial recursively
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5)); // Output: 120</code></pre>`,
    category: "technical",
    slug: "formatting-code-questions-answers",
    tags: ["formatting", "markdown", "code", "syntax-highlighting"],
    author: "TechBlog Team",
    views: 1675,
    published: true
  },
  {
    title: "Community guidelines and code of conduct",
    content: `<h2>Community Guidelines</h2>
    <p>TechBlog is a community built on respect, learning, and helping each other grow. These guidelines help maintain a positive environment for everyone.</p>
    
    <h3>Be Respectful</h3>
    <ul>
      <li>Treat all community members with kindness and respect</li>
      <li>Avoid personal attacks, harassment, or discriminatory language</li>
      <li>Remember there's a real person behind every username</li>
      <li>Be patient with beginners - everyone was new once</li>
    </ul>
    
    <h3>Be Constructive</h3>
    <ul>
      <li>Provide helpful, actionable feedback</li>
      <li>Explain your reasoning when suggesting changes</li>
      <li>Focus on the content, not the person</li>
      <li>If you disagree, explain why respectfully</li>
    </ul>
    
    <h3>Be Authentic</h3>
    <ul>
      <li>Only post content you have the right to share</li>
      <li>Give credit where credit is due</li>
      <li>Don't plagiarize or copy without attribution</li>
      <li>Be honest about your experience level</li>
    </ul>
    
    <h3>Stay On Topic</h3>
    <ul>
      <li>Keep discussions relevant to programming and technology</li>
      <li>Use appropriate tags and categories</li>
      <li>Avoid off-topic discussions in comments</li>
      <li>Search before posting to avoid duplicates</li>
    </ul>
    
    <h3>Quality Standards</h3>
    <ul>
      <li>Write clear, well-formatted questions and answers</li>
      <li>Provide sufficient detail and context</li>
      <li>Use proper grammar and spelling</li>
      <li>Include relevant code examples</li>
    </ul>
    
    <h3>Consequences</h3>
    <p>Violations of these guidelines may result in:</p>
    <ul>
      <li>Content removal or editing</li>
      <li>Temporary or permanent account suspension</li>
      <li>Loss of privileges or reputation</li>
      <li>Reporting to appropriate authorities (in severe cases)</li>
    </ul>
    
    <h3>Reporting Issues</h3>
    <p>If you encounter content that violates these guidelines:</p>
    <ul>
      <li>Use the report button on the specific content</li>
      <li>Contact moderators through the contact form</li>
      <li>Provide specific details about the violation</li>
      <li>Don't engage in public arguments about moderation</li>
    </ul>`,
    category: "community",
    slug: "community-guidelines-code-conduct",
    tags: ["guidelines", "community", "conduct", "rules"],
    author: "TechBlog Team",
    views: 1456,
    published: true
  },
  {
    title: "Account security and two-factor authentication",
    content: `<h2>Securing Your Account</h2>
    <p>Protecting your TechBlog account is crucial for maintaining your reputation and ensuring your content remains secure.</p>
    
    <h3>Strong Passwords</h3>
    <p>Your first line of defense is a strong, unique password:</p>
    <ul>
      <li>Use at least 12 characters</li>
      <li>Include uppercase and lowercase letters, numbers, and symbols</li>
      <li>Avoid common words, personal information, or patterns</li>
      <li>Never reuse passwords from other sites</li>
      <li>Consider using a password manager</li>
    </ul>
    
    <h3>Two-Factor Authentication (2FA)</h3>
    <p>Enable 2FA to add an extra layer of security to your account:</p>
    
    <h4>Setting Up 2FA</h4>
    <ol>
      <li>Go to your Profile Settings</li>
      <li>Click on the "Security" tab</li>
      <li>Select "Enable Two-Factor Authentication"</li>
      <li>Choose your preferred method (authenticator app or SMS)</li>
      <li>Follow the setup instructions</li>
      <li>Save your backup codes in a secure location</li>
    </ol>
    
    <h4>Recommended Authenticator Apps</h4>
    <ul>
      <li>Google Authenticator</li>
      <li>Microsoft Authenticator</li>
      <li>Authy</li>
      <li>1Password</li>
      <li>Bitwarden</li>
    </ul>
    
    <h3>Recovery Options</h3>
    <p>Set up recovery options in case you lose access:</p>
    <ul>
      <li>Add a recovery email address</li>
      <li>Keep backup codes in a secure location</li>
      <li>Consider setting up multiple 2FA methods</li>
      <li>Keep your contact information up to date</li>
    </ul>
    
    <h3>Account Monitoring</h3>
    <p>Regularly monitor your account for suspicious activity:</p>
    <ul>
      <li>Review your login history in account settings</li>
      <li>Check for unexpected changes to your profile</li>
      <li>Monitor your reputation and activity</li>
      <li>Report any suspicious activity immediately</li>
    </ul>
    
    <h3>If Your Account is Compromised</h3>
    <p>If you suspect unauthorized access:</p>
    <ol>
      <li>Change your password immediately</li>
      <li>Review and update your security settings</li>
      <li>Check your profile and content for changes</li>
      <li>Contact support through the help center</li>
      <li>Consider enabling additional security measures</li>
    </ol>`,
    category: "account",
    slug: "account-security-two-factor-authentication",
    tags: ["security", "2fa", "password", "account"],
    author: "TechBlog Team",
    views: 892,
    published: true
  }
];

async function seedArticles() {
  try {
    await dbConnect();
    
    // Clear existing articles
    await Article.deleteMany({});
    
    // Insert new articles
    await Article.insertMany(articles);
    
    console.log('✅ Articles seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding articles:', error);
    process.exit(1);
  }
}

seedArticles();
