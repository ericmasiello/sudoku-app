import classNames from 'classnames';
import './Loading.css';

type LoadingProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'children'
>;

export const Loading: React.FC<LoadingProps> = (props) => {
  const { className, ...rest } = props;
  return (
    <div
      aria-live="polite"
      role="status"
      className={classNames('loading', className)}
      {...rest}
    >
      <div className="loading__graphic">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <span className="visually-hidden">Loading</span>
    </div>
  );
};
