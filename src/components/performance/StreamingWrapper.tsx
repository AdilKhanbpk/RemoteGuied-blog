import { Suspense } from 'react';

// Loading skeleton for dynamic content
const ContentSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
);

// Wrapper for streaming dynamic content
interface StreamingWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

const StreamingWrapper: React.FC<StreamingWrapperProps> = ({
  children,
  fallback = <ContentSkeleton />,
  className = ''
}) => {
  return (
    <div className={className}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </div>
  );
};

export default StreamingWrapper;

// Usage example:
// <StreamingWrapper fallback={<CommentsSkeleton />}>
//   <Comments postId={post.id} />
// </StreamingWrapper>
