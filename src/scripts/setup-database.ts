import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Sample author data
const sampleAuthor = {
  name: "Alex Johnson",
  bio: "Remote work consultant and productivity expert with 8+ years of experience helping teams transition to distributed work environments.",
  avatar: "/images/author-avatar.jpg",
  twitter: "https://twitter.com/alexjohnson",
  linkedin: "https://linkedin.com/in/alexjohnson",
  website: "https://alexjohnson.dev"
};

// Sample blog posts
const samplePosts = [
  {
    title: "The Ultimate Guide to Remote Work Productivity",
    slug: "ultimate-guide-remote-work-productivity",
    excerpt: "Discover proven strategies and tools to maximize your productivity while working from home. Learn how to create the perfect remote work environment.",
    content: `# The Ultimate Guide to Remote Work Productivity

Working from home has become the new normal for millions of professionals worldwide. While remote work offers incredible flexibility and freedom, it also presents unique challenges that can impact your productivity if not properly addressed.

## Creating Your Ideal Workspace

The foundation of remote work productivity starts with your physical environment. Here's how to set up a workspace that promotes focus and efficiency:

### 1. Designate a Dedicated Work Area

Having a specific area dedicated solely to work helps create mental boundaries between your professional and personal life. This doesn't necessarily mean you need a separate room – even a corner of your living room can work if it's consistently used for work purposes.

### 2. Invest in Ergonomic Equipment

Your physical comfort directly impacts your productivity. Consider investing in:
- An ergonomic chair that supports good posture
- A desk at the proper height
- An external monitor to reduce eye strain
- A good keyboard and mouse

### 3. Optimize Lighting and Noise

Natural light is ideal, but if that's not available, ensure you have adequate artificial lighting. For noise control, consider noise-canceling headphones or a white noise machine if you're in a busy household.

## Time Management Strategies

### The Pomodoro Technique

This time management method involves working in focused 25-minute intervals followed by 5-minute breaks. After four intervals, take a longer 15-30 minute break. This technique helps maintain focus and prevents burnout.

### Time Blocking

Schedule specific blocks of time for different types of work. For example:
- 9:00-11:00 AM: Deep work (complex projects)
- 11:00-12:00 PM: Email and communication
- 1:00-3:00 PM: Meetings
- 3:00-5:00 PM: Administrative tasks

### The Two-Minute Rule

If a task takes less than two minutes to complete, do it immediately rather than adding it to your to-do list. This prevents small tasks from accumulating and becoming overwhelming.

## Communication and Collaboration

### Establish Clear Communication Protocols

- Set expectations for response times
- Use appropriate channels for different types of communication
- Schedule regular check-ins with your team
- Be proactive in sharing updates on your progress

### Master Video Conferencing Etiquette

- Test your technology before important meetings
- Mute yourself when not speaking
- Use good lighting and camera positioning
- Have a professional background or use a virtual background

## Maintaining Work-Life Balance

### Set Clear Boundaries

- Establish specific work hours and stick to them
- Create rituals to mark the beginning and end of your workday
- Communicate your availability to family members or housemates
- Turn off work notifications outside of work hours

### Take Regular Breaks

- Step away from your computer every hour
- Take a proper lunch break away from your workspace
- Go for walks or do light exercise during breaks
- Practice mindfulness or meditation

## Conclusion

Remote work productivity isn't about working more hours – it's about working smarter. By creating an optimal workspace, managing your time effectively, communicating clearly, and maintaining healthy boundaries, you can be more productive working from home than you ever were in a traditional office.

Remember, finding the right balance takes time and experimentation. Be patient with yourself as you develop new habits and routines that work for your unique situation.`,
    category: "Productivity",
    tags: ["productivity", "remote work", "work from home", "time management"],
    featured: true,
    status: 'published'
  },
  {
    title: "Essential Tools for Remote Team Collaboration",
    slug: "essential-tools-remote-team-collaboration",
    excerpt: "Explore the must-have digital tools that make remote team collaboration seamless and effective. From communication to project management.",
    content: `# Essential Tools for Remote Team Collaboration

The success of remote teams largely depends on having the right tools to facilitate communication, collaboration, and project management. Here's a comprehensive guide to the essential tools every remote team should consider.

## Communication Tools

### Slack
Slack remains one of the most popular team communication platforms, offering:
- Organized channels for different topics
- Direct messaging capabilities
- File sharing and integration with other tools
- Voice and video calling features

### Microsoft Teams
A comprehensive collaboration platform that includes:
- Chat and video conferencing
- File storage and sharing
- Integration with Microsoft Office suite
- Whiteboard and screen sharing capabilities

### Discord
Originally designed for gamers, Discord has become popular among remote teams for:
- High-quality voice channels
- Screen sharing capabilities
- Organized server structure
- Low latency communication

## Project Management Tools

### Asana
Asana excels in project organization with features like:
- Task assignment and tracking
- Project timelines and calendars
- Team workload management
- Custom fields and templates

### Trello
Based on the Kanban board system, Trello offers:
- Visual project organization
- Card-based task management
- Team collaboration features
- Power-ups for extended functionality

### Monday.com
A work operating system that provides:
- Customizable workflows
- Time tracking capabilities
- Resource management
- Advanced reporting and analytics

## Video Conferencing Solutions

### Zoom
The go-to solution for video meetings, featuring:
- High-quality video and audio
- Screen sharing and recording
- Breakout rooms for smaller group discussions
- Virtual backgrounds and filters

### Google Meet
Integrated with Google Workspace, offering:
- Easy scheduling through Google Calendar
- Real-time captions
- Large meeting capacity
- Security features like meeting locks

## File Storage and Sharing

### Google Drive
Cloud storage solution with:
- Real-time collaborative editing
- Generous free storage space
- Integration with Google Workspace
- Advanced sharing permissions

### Dropbox
Reliable file synchronization with:
- Automatic file syncing across devices
- Version history and file recovery
- Advanced sharing controls
- Integration with numerous third-party apps

## Time Tracking and Productivity

### Toggl
Simple time tracking with:
- Easy-to-use interface
- Detailed reporting
- Project and client organization
- Team time tracking capabilities

### RescueTime
Automatic productivity tracking that:
- Monitors application and website usage
- Provides detailed productivity reports
- Blocks distracting websites
- Sets productivity goals and alerts

## Choosing the Right Tools

When selecting tools for your remote team, consider:

1. **Team Size**: Some tools work better for small teams, others scale well for large organizations
2. **Budget**: Factor in per-user costs and feature requirements
3. **Integration**: Choose tools that work well together
4. **Learning Curve**: Consider how quickly your team can adopt new tools
5. **Security**: Ensure tools meet your organization's security requirements

## Implementation Best Practices

### Start Small
Don't overwhelm your team by implementing too many new tools at once. Start with the most critical needs and gradually add more tools as needed.

### Provide Training
Ensure all team members are properly trained on new tools. Consider creating internal documentation or hosting training sessions.

### Regular Review
Periodically assess whether your current tools are meeting your team's needs. Be willing to switch if you find better alternatives.

## Conclusion

The key is to choose tools that integrate well together and fit your team's workflow. Start with the basics and gradually add more specialized tools as needed.`,
    category: "Tools & Software",
    tags: ["tools", "software", "productivity", "remote work"],
    featured: false,
    status: 'published'
  }
];

async function setupDatabase() {
  try {
    console.log('🚀 Setting up database with sample data...');

    // 1. Create sample author
    console.log('📝 Creating sample author...');
    const { data: author, error: authorError } = await supabaseAdmin
      .from('authors')
      .insert([sampleAuthor])
      .select()
      .single();

    if (authorError) {
      console.error('Error creating author:', authorError);
      return;
    }

    console.log('✅ Author created:', author.name);

    // 2. Create sample posts
    console.log('📚 Creating sample posts...');
    for (const post of samplePosts) {
      const postData = {
        ...post,
        author_id: author.id,
        featured_image: null,
        published_at: new Date().toISOString(),
        seo_title: post.title,
        seo_description: post.excerpt,
        seo_keywords: post.tags
      };

      const { data: createdPost, error: postError } = await supabaseAdmin
        .from('blog_posts')
        .insert([postData])
        .select()
        .single();

      if (postError) {
        console.error('Error creating post:', postError);
        continue;
      }

      console.log('✅ Post created:', createdPost.title);
    }

    console.log('🎉 Database setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Update your .env.local file with your Supabase credentials');
    console.log('2. Run the development server: npm run dev');
    console.log('3. Visit http://localhost:3000/admin/login to access the admin panel');
    console.log('4. Default admin credentials: admin@remotework.com / admin123');

  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

// Run the setup
if (require.main === module) {
  setupDatabase();
}

export { setupDatabase };
