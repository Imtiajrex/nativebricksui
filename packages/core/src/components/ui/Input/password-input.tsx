import { useState } from 'react';
import { Pressable } from 'react-native';
import { Input } from './input';
import { InputProps } from './types';
import { Eye, EyeOff } from 'lucide-react-native';
import { useColor } from '../../../lib/useColor';

export type PasswordInputProps = InputProps & {
  togglePasswordIcon?: (props: { showPassword: boolean }) => React.ReactNode;
  isTogglePasswordButtonEnabled?: boolean;
};
export function PasswordInput({
  isTogglePasswordButtonEnabled = true,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Input
      secureTextEntry={!showPassword}
      trailing={
        <TogglePasswordButton
          isTogglePasswordButtonEnabled={isTogglePasswordButtonEnabled}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          togglePasswordIcon={props.togglePasswordIcon}
        />
      }
      {...props}
    />
  );
}

type TogglePasswordButtonProps = {
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
  togglePasswordIcon: PasswordInputProps['togglePasswordIcon'];
  isTogglePasswordButtonEnabled?: boolean;
};
const TogglePasswordButton = ({
  isTogglePasswordButtonEnabled,
  showPassword,
  setShowPassword,
  togglePasswordIcon,
}: TogglePasswordButtonProps) => {
  const foregroundColor = useColor('muted-foreground');
  const mutedColor = useColor('muted');
  if (!isTogglePasswordButtonEnabled) {
    return null;
  }
  return (
    <Pressable
      onPress={() => setShowPassword(!showPassword)}
      className="flex items-center justify-center h-full pr-4"
    >
      {togglePasswordIcon ? (
        togglePasswordIcon({ showPassword })
      ) : showPassword ? (
        <EyeOff size={18} color={foregroundColor} />
      ) : (
        <Eye size={18} color={foregroundColor} />
      )}
    </Pressable>
  );
};
