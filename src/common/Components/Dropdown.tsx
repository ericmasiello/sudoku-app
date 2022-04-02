import classNames from 'classnames';
import './Control.css';
import './Dropdown.css';

type DropdownProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  'data-testid'?: string;
};

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const { className, disabled, 'data-testid': dataTestId, ...rest } = props;
  return (
    <span
      className={classNames('control', 'dropdown', className, {
        'dropdown--disabled': disabled,
      })}
      data-testid={dataTestId}
    >
      <select className="dropdown__select" disabled={disabled} {...rest} />
    </span>
  );
};
