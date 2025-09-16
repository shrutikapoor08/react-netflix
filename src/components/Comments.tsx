'use client'

import React, { useState, useEffect } from 'react';
import { MessageCircle, ThumbsUp, Reply, Send, ExternalLink, Share } from 'lucide-react';
import { Badge } from './ui/badge';
import { useNavigate, useRouter, useParams } from '@tanstack/react-router';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
}

interface CommentsProps {
  movieId: number;
}

const Comments: React.FC<CommentsProps> = ({ movieId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const router = useRouter();
  const params = useParams({ from: '/movie/$id' });

  useEffect(() => {
    setTimeout(() => {
      setComments([
        {
          id: '1',
          author: 'Sarah Johnson',
          content: 'Amazing cinematography! The visuals were absolutely stunning.',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          likes: 15,
          replies: [
            {
              id: '1-1',
              author: 'Mike Chen',
              content: 'Totally agree! The color grading was perfect.',
              timestamp: new Date(Date.now() - 1000 * 60 * 15),
              likes: 3,
            }
          ]
        },
        {
          id: '2',
          author: 'Alex Rodriguez',
          content: 'The soundtrack really elevated the emotional moments. Brilliant film!',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          likes: 8,
        },
        {
          id: '3',
          author: 'Emma Wilson',
          content: 'Character development was top-notch. Every actor delivered outstanding performances.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
          likes: 22,
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, [movieId]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      content: newComment.trim(),
      timestamp: new Date(),
      likes: 0,
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');

    // Update URL search params to reflect new comment added
    navigate({
      to: '/movie/$id',
      params: { id: params.id },
      search: { commented: 'true' },
      replace: true
    });
  };

  const handleShareComment = (commentId: string) => {
    const commentUrl = `${window.location.origin}/movie/${params.id}#comment-${commentId}`;

    if (navigator.share) {
      navigator.share({
        title: 'Check out this comment',
        url: commentUrl,
      });
    } else {
      navigator.clipboard.writeText(commentUrl);
      alert('Comment link copied to clipboard!');
    }
  };

  const handleNavigateToMovie = (movieId: number) => {
    navigate({
      to: '/movie/$id',
      params: { id: movieId.toString() }
    });
  };

  const handlePrefetchHome = () => {
    // Prefetch home page when user hovers over "Browse More" button
    router.preloadRoute({ to: '/' });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-8">
        <h2 className="text-2xl font-bold text-card-foreground mb-6 font-['Poppins'] flex items-center gap-3">
          <MessageCircle className="w-6 h-6" />
          Comments
          <Badge variant="secondary" className="ml-2">Loading...</Badge>
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-muted rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-1/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-3/4 mb-1" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-card-foreground font-['Poppins'] flex items-center gap-3">
          <MessageCircle className="w-6 h-6" />
          Comments
          <Badge variant="secondary" className="ml-2">{comments.length}</Badge>
        </h2>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Movie ID: {params.id}</span>
          {(router.state.location.search as any)?.commented && (
            <Badge variant="outline" className="text-xs">
              Recently Commented
            </Badge>
          )}
        </div>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex flex-col gap-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts about this movie..."
            className="w-full p-4 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder-muted-foreground"
            rows={3}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground border border-primary rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              Post Comment
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} id={`comment-${comment.id}`} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {comment.author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-card-foreground">{comment.author}</h4>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{formatTimeAgo(comment.timestamp)}</span>
                  {router.state.location.pathname === `/movie/${params.id}` && (
                    <Badge variant="outline" className="text-xs">
                      Current Movie
                    </Badge>
                  )}
                </div>

                <p className="text-card-foreground mb-3 leading-relaxed">{comment.content}</p>

                <div className="flex items-center gap-4 text-sm">
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    {comment.likes > 0 && <span>{comment.likes}</span>}
                  </button>
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                    <Reply className="w-4 h-4" />
                    Reply
                  </button>
                  <button
                    onClick={() => handleShareComment(comment.id)}
                    className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Share className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={() => navigate({ to: '/' })}
                    className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Browse More
                  </button>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 pl-6 border-l border-border space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary">
                            {reply.author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                          </span>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-medium text-card-foreground text-sm">{reply.author}</h5>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{formatTimeAgo(reply.timestamp)}</span>
                          </div>
                          <p className="text-sm text-card-foreground mb-2">{reply.content}</p>
                          <div className="flex items-center gap-3 text-xs">
                            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                              <ThumbsUp className="w-3 h-3" />
                              {reply.likes > 0 && <span>{reply.likes}</span>}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
};

export default Comments;