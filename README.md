# RemoteWork Blog - Dynamic Next.js Blog Application

A fully dynamic, SEO-optimized blog application built with Next.js 15, Supabase, and TypeScript. Perfect for remote work content, tips, and insights.

## ✨ Features

### 🎯 Core Features
- **Dynamic Content Management**: Full CRUD operations for blog posts
- **Admin Dashboard**: Comprehensive admin panel for content management
- **SEO Optimized**: Dynamic sitemaps, meta tags, and structured data
- **Advanced Search**: Full-text search with filtering and categorization
- **Image Upload**: Integrated image management with Supabase Storage
- **Comments System**: Dynamic comments with spam protection and moderation
- **Responsive Design**: Mobile-first, fully responsive design

### 🔧 Technical Features
- **Next.js 15**: Latest features with App Router and Server Components
- **Supabase**: PostgreSQL database with real-time capabilities
- **TypeScript**: Full type safety throughout the application
- **Authentication**: Secure admin authentication with JWT
- **Rate Limiting**: Built-in API rate limiting and security headers
- **ISR**: Incremental Static Regeneration for optimal performance
- **Component Architecture**: Modular, reusable components

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm
- Supabase account

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd my-blog-app
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your credentials
3. Run the database schema from `database/schema.sql` in your Supabase SQL editor

### 3. Environment Configuration

Copy `.env.example` to `.env.local` and update with your credentials:

```env
# Database Configuration - Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="RemoteWork Blog"

# Admin Credentials (Change these!)
ADMIN_EMAIL=admin@remotework.com
ADMIN_PASSWORD=admin123

# Security
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 4. Initialize Database (Optional)

Run the setup script to populate your database with sample content:

```bash
npx ts-node src/scripts/setup-database.ts
```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your blog!

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── admin/            # Admin-specific components
│   ├── blog/             # Blog-specific components
│   └── ui/               # UI components
├── lib/                  # Utility libraries
│   ├── auth.ts           # Authentication utilities
│   ├── database.ts       # Database queries
│   └── utils.ts          # General utilities
├── types/                # TypeScript type definitions
└── scripts/              # Setup and utility scripts
```

## 🔐 Admin Panel

Access the admin panel at `/admin/login` with your configured credentials.

**Default credentials:**
- Email: `admin@remotework.com`
- Password: `admin123`

### Admin Features:
- **Dashboard**: Overview of posts, authors, and statistics
- **Post Management**: Create, edit, delete, and publish posts
- **Image Upload**: Upload and manage featured images
- **SEO Tools**: Optimize meta tags, descriptions, and keywords
- **Author Management**: Manage author profiles and information

## 🎨 Customization

### Styling
The application uses Tailwind CSS with custom components. Styles are organized by component to maintain modularity.

### Content Types
Easily extend the blog with new content types by:
1. Adding database tables in Supabase
2. Creating corresponding TypeScript types
3. Building API routes and components

### SEO Configuration
Update SEO settings in:
- `src/lib/seo.ts` - SEO utilities and structured data
- `src/app/layout.tsx` - Global metadata
- Individual page components for page-specific SEO

## 🔍 Search & Filtering

The application includes advanced search capabilities:
- **Full-text search** using PostgreSQL's built-in search
- **Category filtering** with dynamic categories
- **Tag-based navigation** with auto-suggestions
- **Real-time search** with debounced queries

## 📊 Performance

- **ISR**: Pages regenerate every hour for fresh content
- **Image optimization** with Next.js Image component
- **Database indexing** for fast queries
- **Caching headers** for optimal performance
- **Component-level code splitting**

## 🛡️ Security

- **Authentication**: JWT-based admin authentication
- **Rate limiting**: API endpoint protection
- **Input validation**: Comprehensive form validation
- **SQL injection protection**: Parameterized queries
- **XSS protection**: Content sanitization
- **CSRF protection**: Built-in Next.js protection

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
The application can be deployed on any platform supporting Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Review the documentation
3. Create a new issue with detailed information

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React framework
- [Supabase](https://supabase.com) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Lucide React](https://lucide.dev) - Beautiful icons
#   R e m o t e G u i e d - b l o g 
 
 