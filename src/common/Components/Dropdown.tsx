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
    <span className={classNames('control', 'dropdown', className)}>
      <select className="dropdown__select" {...rest} />
    </span>
  );
};
