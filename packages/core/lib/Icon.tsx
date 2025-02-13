import RemixIcon from 'react-native-remix-icon';
import { iconWithClassName } from './iconWithClassName';
import { useTextClass } from '../base/text';
import { cn } from './utils';

iconWithClassName(RemixIcon);
type RemixIconProps = React.ComponentProps<typeof RemixIcon>;
export const Icon = (props: RemixIconProps) => {
  const textClass = useTextClass();
  return <RemixIcon {...props} className={cn(props.className, textClass)} />;
};
