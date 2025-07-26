'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MessageCircle, Reply, User, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatRelativeDate } from '@/lib/utils';

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  created_at: string;
  createdAt?: string; // For compatibility
  parent_id?: string;
  replies?: Comment[];
}

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState({ name: '', author: '', email: '', content: '' });
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadComments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/comments?postId=${postId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  // Load comments on component mount
  useEffect(() => {
    loadComments();
  }, [postId, loadComments]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.author.trim() || !newComment.email.trim() || !newComment.content.trim()) {
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          author: newComment.author,
          email: newComment.email,
          content: newComment.content,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage({ type: 'success', text: data.message || 'Comment submitted successfully!' });
        setNewComment({ name: '', author: '', email: '', content: '' });
        // Reload comments to show the new one (if approved)
        await loadComments();
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.error || 'Failed to submit comment' });
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: Date.now().toString(),
      author: 'Anonymous', // In a real app, this would come from auth
      email: 'user@example.com',
      content: replyContent,
      created_at: new Date().toISOString(),
      createdAt: new Date().toISOString().split('T')[0], // For compatibility
    };

    setComments(comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    }));

    setReplyContent('');
    setReplyingTo(null);
  };

  const CommentItem: React.FC<{ comment: Comment; isReply?: boolean }> = ({ comment, isReply = false }) => (
    <div className={`${isReply ? 'ml-8 mt-4' : 'mb-6'}`}>
      <Card className={`${isReply ? 'bg-gray-50' : ''}`}>
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{formatRelativeDate(comment.createdAt || comment.created_at)}</span>
                </div>
              </div>
              <p className="text-gray-700 mb-3 leading-relaxed">{comment.content}</p>
              {!isReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                >
                  <Reply className="h-4 w-4 mr-1" />
                  Reply
                </Button>
              )}
            </div>
          </div>
          
          {/* Reply Form */}
          {replyingTo === comment.id && (
            <div className="mt-4 ml-13">
              <div className="flex gap-2">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="form-input form-textarea flex-1"
                  rows={3}
                />
              </div>
              <div className="flex gap-2 mt-2">
                <Button size="sm" onClick={() => handleSubmitReply(comment.id)}>
                  Post Reply
                </Button>
                <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Replies */}
      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} isReply />
      ))}
    </div>
  );

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <MessageCircle className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Comments ({comments.length})
            </h2>
          </div>

          {/* Comment Form */}
          <Card className="mb-8">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Leave a Comment</h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={newComment.name}
                      onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={newComment.email}
                      onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Comment *
                  </label>
                  <textarea
                    id="content"
                    value={newComment.content}
                    onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                    className="form-input form-textarea"
                    rows={4}
                    placeholder="Share your thoughts..."
                    required
                  />
                </div>
                <Button type="submit">
                  Post Comment
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Comments List */}
          <div>
            {comments.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
                <p className="text-gray-600">Be the first to share your thoughts!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentSection;
