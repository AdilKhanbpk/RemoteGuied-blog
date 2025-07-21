'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Eye, ArrowLeft, Upload, X, AlertCircle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import RichTextEditor from '@/components/editor/RichTextEditor';
import ImageUpload from '@/components/ui/ImageUpload';
import { generateSlug } from '@/lib/utils';
import Link from 'next/link';

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
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
}

interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
}

const NewPostPage: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([
    'Productivity',
    'Team Management',
    'Tools & Software',
    'Work-Life Balance',
    'Career Development'
  ]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: categories[1], // Skip "All" category
    tags: [],
    featuredImage: '',
    featured: false,
    status: 'draft',
    seo_title: '',
    seo_description: '',
    seo_keywords: []
  });

  // Load authors on component mount
  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const response = await fetch('/api/admin/authors');
        if (response.ok) {
          const authorsData = await response.json();
          setAuthors(authorsData);
          if (authorsData.length > 0) {
            setSelectedAuthor(authorsData[0].id);
          }
        }
      } catch (error) {
        console.error('Error loading authors:', error);
        setErrors(['Failed to load authors']);
      } finally {
        setLoading(false);
      }
    };

    loadAuthors();
  }, []);

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
      seo_title: prev.seo_title || title // Auto-fill SEO title if empty
    }));
  };

  const handleExcerptChange = (excerpt: string) => {
    setFormData(prev => ({
      ...prev,
      excerpt,
      seo_description: prev.seo_description || excerpt // Auto-fill SEO description if empty
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
          seo_keywords: [...prev.seo_keywords, tagInput.trim()] // Add to SEO keywords too
        }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
      seo_keywords: prev.seo_keywords.filter(keyword => keyword !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.title.trim()) newErrors.push('Title is required');
    if (!formData.excerpt.trim()) newErrors.push('Excerpt is required');
    if (!formData.content.trim()) newErrors.push('Content is required');
    if (!formData.category.trim()) newErrors.push('Category is required');
    if (!selectedAuthor) newErrors.push('Author is required');

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors([]);

    try {
      const postData = {
        ...formData,
        status,
        author_id: selectedAuthor,
        featured_image: formData.featuredImage || null
      };

      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create post');
      }

      const createdPost = await response.json();
      console.log('Post created successfully:', createdPost);

      router.push('/admin/posts');
    } catch (error) {
      console.error('Error creating post:', error);
      setErrors([error instanceof Error ? error.message : 'Failed to create post']);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Please fix the following errors:</h3>
                <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

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
              <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
              <p className="text-gray-600">Write and publish a new blog post</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
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
              {isSubmitting ? 'Publishing...' : 'Publish'}
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
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                    Post Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out bg-white text-gray-900 hover:border-gray-400 text-lg font-semibold"
                    placeholder="Enter an engaging title for your post..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be the main headline of your blog post
                  </p>
                </div>
                
                <div>
                  <label htmlFor="slug" className="block text-sm font-semibold text-gray-700 mb-2">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out bg-white text-gray-900 hover:border-gray-400 font-mono text-sm"
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
                  onChange={(e) => handleExcerptChange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out bg-white text-gray-900 hover:border-gray-400 resize-none min-h-[120px]"
                  rows={3}
                  placeholder="Write a brief description of your post..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will be shown in post previews and search results.
                </p>
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
                  placeholder="Write your blog post content here. Use the toolbar to format text, add images, and create links..."
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
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                    Author *
                  </label>
                  <select
                    id="author"
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out bg-white text-gray-900 hover:border-gray-400 cursor-pointer"
                  >
                    <option value="">Select an author</option>
                    {authors.map((author) => (
                      <option key={author.id} value={author.id}>
                        {author.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out bg-white text-gray-900 hover:border-gray-400 cursor-pointer"
                  >
                    {categories.map((category) => (
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
                  <p className="text-xs text-gray-500 mt-1">
                    Featured posts appear on the homepage
                  </p>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out bg-white text-gray-900 hover:border-gray-400"
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

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Featured Image</h3>
                <p className="text-sm text-gray-600">Upload an image to represent your post</p>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  value={formData.featuredImage}
                  onChange={(url) => setFormData(prev => ({ ...prev, featuredImage: url }))}
                  onRemove={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                  disabled={isSubmitting}
                  folder="blog-featured"
                />
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">SEO Settings</h3>
                <p className="text-sm text-gray-600">Optimize your post for search engines</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="seo_title" className="block text-sm font-medium text-gray-700 mb-1">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    id="seo_title"
                    value={formData.seo_title}
                    onChange={(e) => setFormData(prev => ({ ...prev, seo_title: e.target.value }))}
                    className="form-input"
                    placeholder="SEO optimized title (60 chars max)"
                    maxLength={60}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.seo_title.length}/60 characters
                  </p>
                </div>

                <div>
                  <label htmlFor="seo_description" className="block text-sm font-medium text-gray-700 mb-1">
                    SEO Description
                  </label>
                  <textarea
                    id="seo_description"
                    value={formData.seo_description}
                    onChange={(e) => setFormData(prev => ({ ...prev, seo_description: e.target.value }))}
                    className="form-input form-textarea"
                    rows={3}
                    placeholder="SEO meta description (160 chars max)"
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.seo_description.length}/160 characters
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewPostPage;
