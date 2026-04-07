interface SkeletonLoaderProps {
  variant?: 'card' | 'list' | 'text' | 'avatar' | 'custom';
  count?: number;
  className?: string;
}

export function SkeletonLoader({ variant = 'card', count = 1, className = '' }: SkeletonLoaderProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (variant === 'card') {
    return (
      <div className={`space-y-4 ${className}`}>
        {skeletons.map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="size-12 bg-gray-200 rounded-full flex-shrink-0" />
              
              {/* Content */}
              <div className="flex-1 space-y-3">
                {/* Title */}
                <div className="h-5 bg-gray-200 rounded-md w-2/3" />
                
                {/* Description lines */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded-md w-full" />
                  <div className="h-4 bg-gray-200 rounded-md w-5/6" />
                </div>
                
                {/* Meta info */}
                <div className="flex gap-2">
                  <div className="h-3 bg-gray-200 rounded-full w-16" />
                  <div className="h-3 bg-gray-200 rounded-full w-20" />
                  <div className="h-3 bg-gray-200 rounded-full w-24" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={`space-y-3 ${className}`}>
        {skeletons.map((i) => (
          <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 animate-pulse">
            {/* Icon/Avatar */}
            <div className="size-10 bg-gray-200 rounded-lg flex-shrink-0" />
            
            {/* Content */}
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded-md w-1/2" />
              <div className="h-3 bg-gray-200 rounded-md w-1/3" />
            </div>
            
            {/* Action */}
            <div className="size-8 bg-gray-200 rounded-full flex-shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        {skeletons.map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded-md w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'avatar') {
    return (
      <div className={`flex gap-2 ${className}`}>
        {skeletons.map((i) => (
          <div key={i} className="size-10 bg-gray-200 rounded-full animate-pulse" />
        ))}
      </div>
    );
  }

  // Custom/default
  return (
    <div className={`bg-gray-200 rounded-lg animate-pulse ${className}`} />
  );
}

// Specialized skeleton components for common patterns
export function CourseCardSkeleton({ count = 3 }: { count?: number }) {
  const skeletons = Array.from({ length: count }, (_, i) => i);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletons.map((i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
          {/* Image */}
          <div className="h-48 bg-gray-200" />
          
          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Category badge */}
            <div className="h-6 bg-gray-200 rounded-full w-24" />
            
            {/* Title */}
            <div className="h-6 bg-gray-200 rounded-md w-full" />
            
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-md w-full" />
              <div className="h-4 bg-gray-200 rounded-md w-4/5" />
            </div>
            
            {/* Meta */}
            <div className="flex items-center gap-4 pt-2">
              <div className="h-3 bg-gray-200 rounded-full w-16" />
              <div className="h-3 bg-gray-200 rounded-full w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CommunityCardSkeleton({ count = 3 }: { count?: number }) {
  const skeletons = Array.from({ length: count }, (_, i) => i);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletons.map((i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
          <div className="flex items-start gap-4">
            {/* Emoji/Icon */}
            <div className="size-14 bg-gray-200 rounded-xl flex-shrink-0" />
            
            {/* Content */}
            <div className="flex-1 space-y-3">
              {/* Title */}
              <div className="h-6 bg-gray-200 rounded-md w-3/4" />
              
              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded-md w-full" />
                <div className="h-4 bg-gray-200 rounded-md w-5/6" />
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex gap-6 mt-4 pt-4 border-t border-gray-100">
            <div className="h-4 bg-gray-200 rounded-full w-20" />
            <div className="h-4 bg-gray-200 rounded-full w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EventCardSkeleton({ count = 3 }: { count?: number }) {
  const skeletons = Array.from({ length: count }, (_, i) => i);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletons.map((i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
          {/* Header with date badge */}
          <div className="relative h-32 bg-gray-200">
            <div className="absolute top-4 left-4 size-16 bg-white rounded-lg" />
          </div>
          
          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <div className="h-6 bg-gray-200 rounded-md w-full" />
            
            {/* Time & location */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-md w-2/3" />
              <div className="h-4 bg-gray-200 rounded-md w-1/2" />
            </div>
            
            {/* Attendees */}
            <div className="flex items-center gap-2 pt-2">
              <div className="flex -space-x-2">
                <div className="size-8 bg-gray-200 rounded-full border-2 border-white" />
                <div className="size-8 bg-gray-200 rounded-full border-2 border-white" />
                <div className="size-8 bg-gray-200 rounded-full border-2 border-white" />
              </div>
              <div className="h-3 bg-gray-200 rounded-full w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableRowSkeleton({ count = 5, columns = 4 }: { count?: number; columns?: number }) {
  const rows = Array.from({ length: count }, (_, i) => i);
  const cols = Array.from({ length: columns }, (_, i) => i);
  
  return (
    <>
      {rows.map((i) => (
        <tr key={i} className="animate-pulse">
          {cols.map((j) => (
            <td key={j} className="px-6 py-4">
              <div className="h-4 bg-gray-200 rounded-md w-full" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
