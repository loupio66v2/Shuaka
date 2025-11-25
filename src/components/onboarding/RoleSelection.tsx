import { PrimaryButton } from '../ui/PrimaryButton';
import { useAppContext } from '../../context/AppContext';
import type { Role } from '../../types';

interface RoleOption {
  id: Role;
  title: string;
  description: string;
}

interface RoleSelectionProps {
  roles: RoleOption[];
}

export function RoleSelection({ roles }: RoleSelectionProps) {
  const { role, setRole } = useAppContext();

  return (
    <section className="card">
      <header className="card__header">
        <p className="eyebrow">Step 1</p>
        <h2>Tell us how you participate</h2>
        <p className="muted">Choose the option that best reflects your perspective.</p>
      </header>
      <div className="grid">
        {roles.map((option) => {
          const isSelected = role === option.id;
          return (
            <article key={option.id} className={`tile ${isSelected ? 'tile--active' : ''}`}>
              <div>
                <p className="eyebrow">{option.title}</p>
                <p>{option.description}</p>
              </div>
              <PrimaryButton
                type="button"
                aria-pressed={isSelected}
                onClick={() => setRole(option.id)}
              >
                {isSelected ? 'Selected' : 'Select'}
              </PrimaryButton>
            </article>
          );
        })}
      </div>
    </section>
  );
}
