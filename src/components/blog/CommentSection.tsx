'use client';

import React, { useState } from 'react';
import { MessageCircle, Reply, User, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Comment } from '@/types/blog';
import { formatRelativeDate } from '@/lib/utils';

interface CommentSectionProps {
  postId: string;
}

// Mock comments data - in a real app, this would come from an API
const mockComments: Comment[] = [
  {
    id: '1',
    postId: '1',
    author: 'Sarah Johnson',
    email: 'sarah@example.com',
    content: 'This is such a comprehensive guide! I especially loved the section about creating a dedicated workspace. It made a huge difference in my productivity.',
    createdAt: '2024-01-16',
    replies: [
      {
        id: '2',
        postId: '1',
        author: 'Mike Chen',
        email: 'mike@example.com',
        content: 'I agree! Having a dedicated space really helps with the mental separation between work and personal time.',
        createdAt: '2024-01-16',
      }
    ]
  },
  {
    id: '3',
    postId: '1',
    author: 'Emily Rodriguez',
    email: 'emily@example.com',
    content: 'The Pomodoro Technique has been a game-changer for me. Thanks for the detailed explanation of how to implement it effectively!',
    createdAt: '2024-01-17',
  }
];

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>(mockComments.filter(c => c.postId === postId));
  const [newComment, setNewComment] = useState({ name: '', email: '', content: '' });
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.name || !newComment.email || !newComment.content) return;

    const comment: Comment = {
      id: Date.now().toString(),
      postId,
      author: newComment.name,
      email: newComment.email,
      content: newComment.content,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setComments([...comments, comment]);
    setNewComment({ name: '', email: '', content: '' });
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: Date.now().toString(),
      postId,
      author: 'Anonymous', // In a real app, this would come from auth
      email: 'user@example.com',
      content: replyContent,
      createdAt: new Date().toISOString().split('T')[0],
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
                  <span>{formatRelativeDate(comment.createdAt)}</span>
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
