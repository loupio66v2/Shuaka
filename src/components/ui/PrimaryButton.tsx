import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
};

export const PrimaryButton: React.FC<Props> = ({
  fullWidth = true,
  className = '',
  children,
  ...rest
}) => (
  <button
    {...rest}
    className={`${
      fullWidth ? 'w-full' : ''
    } inline-flex items-center justify-center px-4 py-3 rounded-xl font-semibold text-white 
    bg-gradient-to-r from-primary to-primary-glow 
    shadow-lg hover:shadow-elevated active:scale-95 transition 
    disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);
