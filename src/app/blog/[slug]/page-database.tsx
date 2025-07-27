import React from 'react';
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

const BlogPostPage = () => {
  const post = {
    id: 1,
    title: "How to Write an Awesome Blog Post in 5 Steps",
    slug: "how-to-write-awesome-blog-post-5-steps",
    content: `Writing a blog post is a little like driving; you can study the highway code (or read articles telling you how to write a blog post) for months, but nothing can prepare you for the real thing like getting behind the wheel and hitting the open road.

# Getting Started with Your First Draft

The key to writing compelling blog content is understanding your audience and their needs. Start by researching what questions your readers are asking and what problems they're trying to solve.

## Planning Your Content Structure

Before you start writing, create an outline that includes:

- Your main points and supporting arguments
- Key takeaways for readers
- Call-to-action elements
- Supporting data or examples

### Research and Preparation

Thorough research is the foundation of any great blog post. Spend time gathering credible sources, statistics, and expert opinions that support your main arguments.

## Writing with Authority

Your writing should demonstrate expertise while remaining accessible to your target audience. Use clear, concise language and avoid unnecessary jargon that might confuse readers.

**Key writing principles:**
- Be specific and actionable
- Use examples to illustrate points
- Break up long paragraphs for better readability
- Include transitional phrases to improve flow

*Remember: Great content serves the reader first, not the search engines.*

---

## Editing and Refinement

The editing process is where good content becomes great content. Review your work multiple times, focusing on different aspects each time:

1. **Content accuracy** - Verify facts and sources
2. **Structure and flow** - Ensure logical progression
3. **Grammar and style** - Polish language and tone
4. **SEO optimization** - Include relevant keywords naturally

> "The first draft of anything is shit." - Ernest Hemingway

This quote reminds us that great writing comes from rewriting and refinement.`,
    excerpt: "Learn the essential steps to create compelling blog content that engages readers and drives results.",
    category: "Content Marketing",
    publishedAt: "2024-05-20",
    readingTime: 8,
    author: {
      name: "Dan Shewan",
      bio: "Content Marketing Expert & Senior Writer",
      avatar: "/api/placeholder/48/48"
    },
    featuredImage: "/api/placeholder/800/400"
  };

  const relatedPosts = [
    {
      id: 2,
      title: "SEO Best Practices for Blog Content",
      slug: "seo-best-practices-blog-content",
      excerpt: "Discover proven SEO strategies to improve your blog's visibility and organic traffic.",
      publishedAt: "2024-05-15",
      readingTime: 6
    },
    {
      id: 3,
      title: "Content Strategy for Remote Teams",
      slug: "content-strategy-remote-teams",
      excerpt: "How to build and execute a successful content strategy with distributed teams.",
      publishedAt: "2024-05-10",
      readingTime: 7
    },
    {
      id: 4,
      title: "Measuring Content Marketing ROI",
      slug: "measuring-content-marketing-roi",
      excerpt: "Learn how to track and measure the success of your content marketing efforts.",
      publishedAt: "2024-05-05",
      readingTime: 5
    }
  ];

  const formatDate = (dateString : any) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareUrl = `https://remotework.com/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
            <span className="text-gray-400">—</span>
            <a href="/blog" className="hover:text-blue-600 transition-colors">Blog</a>
            <span className="text-gray-400">—</span>
            <span className="text-gray-900 font-medium">How to Write an Awesome Blog Post in 5 Steps</span>
          </div>
        </div>
      </nav>

      {/* Article Container */}
      <article className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="max-w-4xl">
                
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>

                {/* Article Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                  {post.title}
                </h1>

                {/* Author Info */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">
                        {post.author.name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {post.author.bio}
                    </p>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="mb-8">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-sm"
                  />
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  <div className="blog-content">
                    <div className="text-gray-700 mb-6 leading-relaxed text-lg">
                      Writing a blog post is a little like driving; you can study the highway code (or read articles telling you how to write a blog post) for months, but nothing can prepare you for the real thing like getting behind the wheel and hitting the open road.
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-6 mt-10 tracking-tight">Getting Started with Your First Draft</h1>
                    
                    <div className="text-gray-700 mb-6 leading-relaxed text-lg">
                      The key to writing compelling blog content is understanding your audience and their needs. Start by researching what questions your readers are asking and what problems they're trying to solve.
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-6 mt-8 tracking-tight">Planning Your Content Structure</h2>
                    
                    <div className="text-gray-700 mb-6 leading-relaxed text-lg">
                      Before you start writing, create an outline that includes:
                    </div>

                    <ul className="space-y-2 mb-6 pl-6">
                      <li className="text-gray-700 leading-relaxed list-disc">Your main points and supporting arguments</li>
                      <li className="text-gray-700 leading-relaxed list-disc">Key takeaways for readers</li>
                      <li className="text-gray-700 leading-relaxed list-disc">Call-to-action elements</li>
                      <li className="text-gray-700 leading-relaxed list-disc">Supporting data or examples</li>
                    </ul>

                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-tight mb-4 mt-6">Research and Preparation</h3>
                    
                    <div className="text-gray-700 mb-6 leading-relaxed text-lg">
                      Thorough research is the foundation of any great blog post. Spend time gathering credible sources, statistics, and expert opinions that support your main arguments.
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-6 mt-8 tracking-tight">Writing with Authority</h2>
                    
                    <div className="text-gray-700 mb-6 leading-relaxed text-lg">
                      Your writing should demonstrate expertise while remaining accessible to your target audience. Use clear, concise language and avoid unnecessary jargon that might confuse readers.
                    </div>

                    <div className="text-gray-700 mb-6 leading-relaxed text-lg">
                      <strong className="font-semibold text-gray-900">Key writing principles:</strong>
                    </div>

                    <ul className="space-y-2 mb-6 pl-6">
                      <li className="text-gray-700 leading-relaxed list-disc">Be specific and actionable</li>
                      <li className="text-gray-700 leading-relaxed list-disc">Use examples to illustrate points</li>
                      <li className="text-gray-700 leading-relaxed list-disc">Break up long paragraphs for better readability</li>
                      <li className="text-gray-700 leading-relaxed list-disc">Include transitional phrases to improve flow</li>
                    </ul>

                    <div className="text-gray-700 mb-6 leading-relaxed text-lg">
                      <em className="italic text-gray-700">Remember: Great content serves the reader first, not the search engines.</em>
                    </div>

                    <div className="my-8 border-0 h-px bg-gray-200"></div>

                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-6 mt-8 tracking-tight">Editing and Refinement</h2>
                    
                    <div className="text-gray-700 mb-6 leading-relaxed text-lg">
                      The editing process is where good content becomes great content. Review your work multiple times, focusing on different aspects each time:
                    </div>

                    <ol className="space-y-2 mb-6 pl-6 list-decimal">
                      <li className="text-gray-700 leading-relaxed"><strong className="font-semibold text-gray-900">Content accuracy</strong> - Verify facts and sources</li>
                      <li className="text-gray-700 leading-relaxed"><strong className="font-semibold text-gray-900">Structure and flow</strong> - Ensure logical progression</li>
                      <li className="text-gray-700 leading-relaxed"><strong className="font-semibold text-gray-900">Grammar and style</strong> - Polish language and tone</li>
                      <li className="text-gray-700 leading-relaxed"><strong className="font-semibold text-gray-900">SEO optimization</strong> - Include relevant keywords naturally</li>
                    </ol>

                    <blockquote className="border-l-4 border-gray-300 pl-6 my-8 italic text-gray-600 text-lg leading-relaxed">
                      "The first draft of anything is shit." - Ernest Hemingway
                    </blockquote>

                    <div className="text-gray-700 mb-6 leading-relaxed text-lg">
                      This quote reminds us that great writing comes from rewriting and refinement.
                    </div>
                  </div>
                </div>

                {/* Social Share */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Share this article</h3>
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                        <Facebook className="h-5 w-5" />
                      </button>
                      <button className="flex items-center justify-center w-10 h-10 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors">
                        <Twitter className="h-5 w-5" />
                      </button>
                      <button className="flex items-center justify-center w-10 h-10 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Back to Blog */}
                <div className="mt-8">
                  <a href="/blog" className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-8">
                
                {/* Share Stats */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">2,484</div>
                    <div className="text-sm text-gray-600 mb-4">Shares</div>
                    <div className="flex justify-center space-x-3">
                      <button className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded hover:bg-gray-400 transition-colors">
                        <Facebook className="h-4 w-4" />
                      </button>
                      <button className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded hover:bg-gray-400 transition-colors">
                        <Twitter className="h-4 w-4" />
                      </button>
                      <button className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded hover:bg-gray-400 transition-colors">
                        <Linkedin className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Get Weekly Updates</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Subscribe to receive the latest articles and insights on remote work and productivity.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Related Articles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <div key={relatedPost.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
                <h3 className="font-semibold text-gray-900 mb-3 leading-tight">
                  <a href={`/blog/${relatedPost.slug}`} className="hover:text-blue-600 transition-colors">
                    {relatedPost.title}
                  </a>
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {relatedPost.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{formatDate(relatedPost.publishedAt)}</span>
                  <span>{relatedPost.readingTime} min read</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;