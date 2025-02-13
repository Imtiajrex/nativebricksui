export const getInputBorderState = (state: InputState) => {
  if (state == 'invalid') {
    return 'border-destructive';
  }
  if (state == 'valid') {
    return 'border-success';
  }
  if (state == 'focused') {
    return 'border-primary';
  }
  return '';
};
export type InputState = 'invalid' | 'focused' | 'valid' | 'default';
