import {
  Slider as NativeSlider,
  SliderProps as NativeSliderProps,
} from '@miblanchard/react-native-slider';
export type SliderProps = NativeSliderProps & {};
export function Slider(props: SliderProps) {
  return <NativeSlider {...props} />;
}
