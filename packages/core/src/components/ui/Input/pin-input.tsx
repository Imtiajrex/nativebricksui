import React, { useCallback, useEffect, useMemo } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Text } from '../../../components/base/text';
import { cn } from '../../../lib/utils';
import { Circle, CircleCheck } from 'lucide-react-native';
import { useColor } from '../../../lib/useColor';

export type PinInputProps = {
  pin: string;
  onPinChange: React.Dispatch<React.SetStateAction<string>>;
  check?: (code: string) => void;
  numberOfPins?: number;
  secret?: boolean;
  secretDelay?: number;
  containerClassName?: string;
  pinContainerClassName?: string;
  pinTextClassName?: string;
  pinContainerActiveClassName?: string;
  pinTextActiveClassName?: string;
  state?: 'default' | 'invalid' | 'valid' | 'focused';
};
export function PinInput({
  pin,
  onPinChange,
  check,
  numberOfPins = 6,
  secret,
  secretDelay = 800,
  containerClassName,
  pinContainerClassName,
  pinTextClassName,
  pinContainerActiveClassName,
  pinTextActiveClassName,
}: PinInputProps) {
  const inputRef = React.useRef<TextInput>(null);
  const [isFocused, setIsFocused] = React.useState(false);
  const handleChange = useCallback(
    (text: string) => {
      if (text.length > numberOfPins) {
        return;
      }
      onPinChange(text);
      if (text.length === numberOfPins) {
        console.log('checking', text);
        check && check(text);
      }
    },
    [check, numberOfPins]
  );
  const renderPins = useMemo(() => {
    const activeIndex = pin.length === numberOfPins ? numberOfPins - 1 : pin.length;
    return [...Array(numberOfPins)].map((_, i) => (
      <PinBox
        key={i}
        value={pin[i] || ''}
        secret={secret}
        secretDelay={secretDelay}
        isActive={activeIndex === i}
        className={pinContainerClassName}
        textClassName={pinTextClassName}
        activeClassName={pinContainerActiveClassName}
        activeTextClassName={pinContainerActiveClassName}
      />
    ));
  }, [
    numberOfPins,
    pin,
    isFocused,
    secret,
    secretDelay,
    pinContainerClassName,
    pinTextClassName,
    pinContainerActiveClassName,
    pinTextActiveClassName,
  ]);
  return (
    <>
      <Pressable
        onPress={() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
        className={cn('w-full flex-row gap-2 items-center justify-center ', containerClassName)}
      >
        {renderPins}
      </Pressable>
      <TextInput
        ref={inputRef}
        value={pin}
        onChangeText={handleChange}
        keyboardType={'number-pad'}
        maxLength={numberOfPins}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0,
          width: 50,
          pointerEvents: 'none',
        }}
      />
    </>
  );
}

type PinBoxProps = {
  value: string;
  secret?: boolean;
  secretDelay?: number;
  isActive: boolean;
  className?: string;

  textClassName?: string;
  activeTextClassName?: string;
  activeClassName?: string;
};
const PinBox = ({
  value,
  secret,
  secretDelay,
  isActive,
  className,
  activeClassName,
  activeTextClassName,
  textClassName,
}: PinBoxProps) => {
  const [hidden, setHidden] = React.useState(false);
  useEffect(() => {
    if (!secret) {
      setHidden(false);
      return;
    }
    if (!value) {
      setHidden(true);
      return;
    }
    setHidden(false);
    const timeout = setTimeout(() => {
      setHidden(true);
    }, secretDelay);
    return () => {
      clearTimeout(timeout);
    };
  }, [secretDelay, value, secret]);
  const mutedForegroundColor = useColor('muted-foreground');
  const foregroundCOlor = useColor('foreground');
  const renderSecretIcon = value ? (
    <CircleCheck size={12} color={foregroundCOlor} />
  ) : (
    <Circle size={12} color={mutedForegroundColor} />
  );

  return (
    <View
      className={cn(
        'rounded-radius h-12 w-12 border border-border items-center justify-center',
        className,
        isActive && 'border-primary',
        isActive && activeClassName
      )}
    >
      {hidden ? (
        renderSecretIcon
      ) : (
        <Text
          className={cn('text-foreground text-sm', textClassName, isActive && activeTextClassName)}
        >
          {value}
        </Text>
      )}
    </View>
  );
};
