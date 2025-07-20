'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, X, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { BlogPost } from '@/types/blog';
import { cn } from '@/lib/utils';

interface AdvancedSearchProps {
  onResults: (posts: BlogPost[], total: number) => void;
  onLoading: (loading: boolean) => void;
  categories: string[];
  className?: string;
}

interface SearchFilters {
  query: string;
  category: string;
  tags: string[];
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onResults,
  onLoading,
  categories,
  className = ''
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'All',
    tags: []
  });
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  // Debounced search function
  const performSearch = useCallback(async (searchFilters: SearchFilters) => {
    if (!searchFilters.query && searchFilters.category === 'All' && searchFilters.tags.length === 0) {
      // If no filters, fetch all posts
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          const posts = await response.json();
          onResults(posts, posts.length);
        }
      } catch (error) {
        console.error('Error fetching all posts:', error);
      }
      return;
    }

    setIsSearching(true);
    onLoading(true);

    try {
      const params = new URLSearchParams();
      
      if (searchFilters.query) {
        params.append('q', searchFilters.query);
      }
      
      if (searchFilters.category !== 'All') {
        params.append('category', searchFilters.category);
      }
      
      if (searchFilters.tags.length > 0) {
        params.append('tags', searchFilters.tags.join(','));
      }

      const response = await fetch(`/api/search?${params.toString()}`);
      
      if (response.ok) {
        const data = await response.json();
        onResults(data.posts, data.total);
      } else {
        console.error('Search failed:', response.statusText);
        onResults([], 0);
      }
    } catch (error) {
      console.error('Search error:', error);
      onResults([], 0);
    } finally {
      setIsSearching(false);
      onLoading(false);
    }
  }, [onResults, onLoading]);

  // Trigger search with debouncing
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      performSearch(filters);
    }, 300); // 300ms debounce

    setSearchTimeout(timeout);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [filters, performSearch]);

  const handleQueryChange = (query: string) => {
    setFilters(prev => ({ ...prev, query }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!filters.tags.includes(tagInput.trim())) {
        setFilters(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      query: '',
      category: 'All',
      tags: []
    });
    setTagInput('');
  };

  const hasActiveFilters = filters.query || filters.category !== 'All' || filters.tags.length > 0;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search articles..."
          value={filters.query}
          onChange={(e) => handleQueryChange(e.target.value)}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {isSearching && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5 animate-spin" />
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Advanced Filters
          {hasActiveFilters && (
            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
              {(filters.category !== 'All' ? 1 : 0) + filters.tags.length + (filters.query ? 1 : 0)}
            </span>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                      filters.category === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                placeholder="Add a tag and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {filters.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {filters.tags.map((tag) => (
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
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdvancedSearch;
