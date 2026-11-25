import { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  priority?: boolean;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  priority = false,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#EFECE6] dark:bg-[#16181C] text-[#5E5B54] dark:text-[#9E9A90] p-6 border border-black/15 dark:border-white/10 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Layers className="w-7 h-7 text-[#9A7228] dark:text-[#C69C4E]/70 mb-2" strokeWidth={1.5} />
        <span className="text-xs font-medium tracking-wide text-[#141414]/80 dark:text-[#F4F2ED]/80 text-center">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
}
