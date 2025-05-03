import Image, { ImageProps } from 'next/image';
import * as React from 'react';

import { cn } from '@/lib/utils';

type NextImageProps = {
  useSkeleton?: boolean;
  classNames?: {
    image?: string;
    blur?: string;
  };
  alt: string;
} & (
    | { width: string | number; height: string | number; src: string }
    | { layout: 'fill'; width?: string | number; height?: string | number; src: string }
  ) & Omit<ImageProps, 'src'>;

export default function NextImage({
  useSkeleton = false,
  src,
  width,
  height,
  alt,
  className,
  classNames,
  ...rest
}: NextImageProps) {
  const [status, setStatus] = React.useState(
    useSkeleton ? 'loading' : 'complete'
  );
  const widthIsSet = className?.includes('w-') ?? false;

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={className}
    >
      <img
        className={cn(
          classNames?.image,
          status === 'loading' && cn('animate-pulse', classNames?.blur)
        )}
        src={src} // Ensure src is a string here
        width={width}
        height={height}
        alt={alt}
        onLoad={() => setStatus('complete')} // Changed to onLoad for standard img
        {...rest}
      />
    </figure>
  );
}