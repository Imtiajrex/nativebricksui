export type IconProps<T extends any> = {
  icon: React.ElementType;
  className?: string;
} & T;
export function Icon<T extends any>(props: IconProps<T>) {
  return <props.icon {...props} />;
}
