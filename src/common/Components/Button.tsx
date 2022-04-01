import classNames from 'classnames';
import './Control.css';

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: React.FC<ButtonProps> = (props) => {
  const { className, ...rest } = props;
  return <button className={classNames('control', className)} {...rest} />;
};
