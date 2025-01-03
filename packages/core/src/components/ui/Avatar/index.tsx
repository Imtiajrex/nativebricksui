import { ImageProps, ImageSourcePropType } from 'react-native';
import { AvatarFallback, AvatarImage, Avatar as BaseAvatar, Text } from '../../../base';
import { cn } from '../../../lib/utils';
export type AvatarProps = {
  fallbackText?: string;
  fallbackClassName?: string;
  fallbackTextClassName?: string;
  source?: ImageSourcePropType;
  imageProps?: ImageProps;
  alt: string;
  className?: string;
};
export function Avatar(props: AvatarProps) {
  return (
    <BaseAvatar {...props}>
      <AvatarImage source={props.source} {...props.imageProps} />
      <AvatarFallback className={cn('flex items-center justify-center', props.fallbackClassName)}>
        <Text className={cn(props.fallbackTextClassName)}>{props.fallbackText}</Text>
      </AvatarFallback>
    </BaseAvatar>
  );
}
