type AlertProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export const Alert: React.FC<AlertProps> = (props) => {
  return <div role="alert" aria-live="polite" {...props} />;
};
