import './Spinner.css';

interface SpinnerProps {
  label?: string;
  size?: 'sm' | 'md';
  light?: boolean;
}

export function Spinner({ label, size = 'md', light = false }: SpinnerProps) {
  const classNames = ['spinner'];

  if (size === 'sm') classNames.push('spinner--sm');
  if (light) classNames.push('spinner--light');

  return (
    <div className={classNames.join(' ')} role="status" aria-live="polite">
      <div className="spinner__circle" aria-hidden />
      {label ? <span className="spinner__label">{label}</span> : null}
    </div>
  );
}
