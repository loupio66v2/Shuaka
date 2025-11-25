import React from 'react';

export const Spinner: React.FC<{ label?: string }> = ({ label }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    {label && <span className="text-sm text-muted-foreground">{label}</span>}
  </div>
);
