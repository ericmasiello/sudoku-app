import classNames from 'classnames';
import './Control.css';
import './Dropdown.css';

type DropdownProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const { className, ...rest } = props;
  return (
    <select
      className={classNames('control', 'dropdown', className)}
      {...rest}
    />
  );
};
