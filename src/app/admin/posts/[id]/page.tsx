'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, X, Trash2, Eye } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import RichTextEditor from '@/components/editor/RichTextEditor';
// ImageUpload removed as it's not used
// Removed static data import - now using database
import { generateSlug } from '@/lib/utils';
import Link from 'next/link';

// Define categories
const categories = [
  'Technology',
  'Web Development',
  'Programming',
  'Design',
  'Business',
  'Career',
  'Tutorial',
  'News'
];

interface EditPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  featured: boolean;
  status: 'draft' | 'published';
}

interface PostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  tags: string[];
  status: string;
  featured: boolean;
  publishedAt?: string;
  published_at?: string;
  author?: {
    name: string;
    bio: string;
    avatar: string;
  };
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
}

const EditPostPage: React.FC<EditPostPageProps> = ({ params }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: categories[1],
    tags: [],
    featuredImage: '',
    featured: false,
    status: 'draft'
  });

  useEffect(() => {
    const loadPost = async () => {
      try {
        const { id } = await params;
        const response = await fetch(`/api/admin/posts/${id}`);

        if (response.ok) {
          const foundPost = await response.json();
          setPost(foundPost);
          setFormData({
            title: foundPost.title,
            slug: foundPost.slug,
            excerpt: foundPost.excerpt,
            content: foundPost.content,
            category: foundPost.category,
            tags: foundPost.tags || [],
            featuredImage: foundPost.featured_image || '',
            featured: foundPost.featured,
            status: foundPost.status
          });
        } else {
          console.error('Post not found');
        }
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [params]);

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!post) {
      console.error('Post data not available');
      return;
    }

    setIsSubmitting(true);

    try {
      const postData = {
        ...formData,
        status,
        id: post.id,
        publishedAt: status === 'published' ? (post.publishedAt || post.published_at || new Date().toISOString().split('T')[0]) : '',
        readingTime: Math.ceil(formData.content.split(' ').length / 200),
        author: post.author || { name: 'Unknown', bio: '', avatar: '' }
      };

      console.log('Updating post:', postData);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      router.push('/admin/posts');
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!post) {
      console.error('Post data not available');
      return;
    }

    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        console.log('Deleting post:', post.id);
        await new Promise(resolve => setTimeout(resolve, 500));
        router.push('/admin/posts');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!post) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/admin/posts">Back to Posts</Link>
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/posts">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Posts
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
              <p className="text-gray-600">Update your blog post</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
            <Button 
              variant="outline" 
              asChild
            >
              <Link href={`/blog/${post.slug}`} target="_blank">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Link>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleSubmit('draft')}
              disabled={isSubmitting || !formData.title.trim()}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button 
              onClick={() => handleSubmit('published')}
              disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
            >
              {isSubmitting ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Slug */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="form-input text-lg font-semibold"
                    placeholder="Enter post title..."
                  />
                </div>
                
                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="form-input font-mono text-sm"
                    placeholder="post-url-slug"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    URL: /blog/{formData.slug || 'post-slug'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Excerpt */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Excerpt</h3>
              </CardHeader>
              <CardContent>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="form-input form-textarea"
                  rows={3}
                  placeholder="Write a brief description of your post..."
                />
              </CardContent>
            </Card>

            {/* Content Editor */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Content *</h3>
              </CardHeader>
              <CardContent>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                  placeholder="Edit your blog post content here. Use the toolbar to format text, add images, and create links..."
                  height="500px"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Images will be automatically uploaded to Cloudinary. Links and formatting are supported.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Settings */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Post Settings</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="form-input"
                  >
                    {categories.slice(1).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="rounded border-gray-300 mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Featured Post</span>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="form-input"
                  placeholder="Add a tag and press Enter"
                />
                
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-blue-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditPostPage;
