import { ButtonHTMLAttributes } from 'react';
import { Spinner } from './Spinner';
import './PrimaryButton.css';

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export function PrimaryButton({ children, loading, disabled, ...props }: PrimaryButtonProps) {
  return (
    <button
      className="primary-button"
      disabled={disabled || loading}
      aria-busy={loading}
      data-loading={loading ? 'true' : 'false'}
      {...props}
    >
      {loading ? (
        <span className="primary-button__content">
          <Spinner size="sm" light label="Loading" />
        </span>
      ) : (
        <span className="primary-button__content">{children}</span>
      )}
    </button>
  );
}
