import React, { useState } from 'react';
import { Category, CATEGORIES } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { PrimaryButton } from '../ui/PrimaryButton';

export const CategorySelection: React.FC = () => {
  const { profile, saveCategory } = useAppContext();
  const [selected, setSelected] = useState<Category | null>(profile?.category ?? null);
  const [saving, setSaving] = useState(false);

  const onContinue = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await saveCategory(selected);
    } finally {
      setSaving(false);
    }
  };

  const Card: React.FC<{
    value: Category;
    label: string;
    icon: string;
  }> = ({ value, label, icon }) => {
    const active = selected === value;
    return (
      <button
        type="button"
        onClick={() => setSelected(value)}
        className={`flex flex-col items-center justify-center gap-2 p-4 
        border-2 rounded-2xl shadow-card
        ${
          active
            ? 'border-primary bg-gradient-to-r from-primary/5 to-primary/10'
            : 'border-border bg-card hover:border-primary/60'
        }`}
      >
        <span className="text-3xl">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </button>
    );
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Step 2 of 2</p>
        <h2 className="text-3xl font-extrabold">Pick your lane</h2>
        <p className="text-sm text-muted-foreground">
          We will customize what you see based on your main category. You can
          change this later.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {CATEGORIES.map((cat) => (
          <Card key={cat.value} value={cat.value} label={cat.label} icon={cat.icon} />
        ))}
      </div>

      <PrimaryButton onClick={onContinue} disabled={!selected || saving}>
        {saving ? 'Saving...' : 'Finish'}
      </PrimaryButton>
    </div>
  );
};
