import * as AvatarPrimitive from '@rn-primitives/avatar';
import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Avatar = forwardRef<AvatarPrimitive.RootRef, AvatarPrimitive.RootProps>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex aspect-square w-10 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...props}
    />
  )
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = forwardRef<AvatarPrimitive.ImageRef, AvatarPrimitive.ImageProps>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn('aspect-square h-full w-full', className)}
      {...props}
    />
  )
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = forwardRef<AvatarPrimitive.FallbackRef, AvatarPrimitive.FallbackProps>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        'flex h-full w-full items-center rounded-none justify-center bg-muted',
        className
      )}
      {...props}
    />
  )
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
