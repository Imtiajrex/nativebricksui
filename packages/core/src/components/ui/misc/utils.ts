export const getInputBorderState = (props: { error?: boolean; success?: boolean }) => {
  if (props.error) {
    return 'border-destructive';
  }
  if (props.success) {
    return 'border-success';
  }
  return '';
};
