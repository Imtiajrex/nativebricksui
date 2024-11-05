import { withSpring } from 'react-native-reanimated';

export const Entering = () => {
  'worklet';
  const animations = {
    opacity: withSpring(1, { duration: 95, stiffness: 100 }),
    transform: [{ scale: withSpring(1, { duration: 95, stiffness: 100 }) }],
  };
  const initialValues = {
    opacity: 0,
    transform: [{ scale: 0.6 }],
  };
  return {
    initialValues,
    animations,
  };
};

export const Exiting = () => {
  'worklet';
  const animations = {
    opacity: withSpring(0, { duration: 95, stiffness: 100 }),
    transform: [{ scale: withSpring(0.6, { duration: 95, stiffness: 100 }) }],
  };
  const initialValues = {
    opacity: 1,
    transform: [{ scale: 1 }],
  };
  return {
    initialValues,
    animations,
  };
};
