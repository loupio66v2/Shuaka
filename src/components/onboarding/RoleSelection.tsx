import React, { useState } from 'react';
import { UserRole } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { PrimaryButton } from '../ui/PrimaryButton';

export const RoleSelection: React.FC = () => {
  const { saveRole } = useAppContext();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [saving, setSaving] = useState(false);

  const onContinue = async () => {
    if (!selectedRole) return;
    setSaving(true);
    try {
      await saveRole(selectedRole);
    } finally {
      setSaving(false);
    }
  };

  const Card: React.FC<{
    role: UserRole;
    title: string;
    description: string;
    emoji: string;
  }> = ({ role, title, description, emoji }) => {
    const active = selectedRole === role;
    return (
      <button
        type="button"
        onClick={() => setSelectedRole(role)}
        className={`w-full text-left p-5 border-2 rounded-2xl shadow-card transition-transform 
          hover:scale-[1.01] active:scale-95 bg-card 
          ${
            active
              ? 'border-primary bg-gradient-to-r from-primary/5 to-secondary/5'
              : 'border-border'
          }`}
      >
        <div className="text-4xl mb-3">{emoji}</div>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </button>
    );
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Step 1 of 2</p>
        <h2 className="text-3xl font-extrabold">I am a...</h2>
      </div>

      <div className="space-y-4">
        <Card
          role="artist"
          title="Creative Talent"
          description="I am looking for gigs, roles, and collaborations."
          emoji="🌟"
        />
        <Card
          role="recruiter"
          title="Talent Seeker"
          description="I am posting opportunities and hiring creatives."
          emoji="🤝"
        />
      </div>

      <PrimaryButton onClick={onContinue} disabled={!selectedRole || saving}>
        {saving ? 'Saving...' : 'Continue'}
      </PrimaryButton>
    </div>
  );
};
