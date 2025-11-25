import { useAppContext } from '../../context/AppContext';
import type { Category } from '../../types';

interface CategorySelectionProps {
  categories: Category[];
}

export function CategorySelection({ categories }: CategorySelectionProps) {
  const { selectedCategoryIds, toggleCategory } = useAppContext();

  return (
    <section className="card">
      <header className="card__header">
        <p className="eyebrow">Step 2</p>
        <h2>Filter the support you need</h2>
        <p className="muted">Pick one or more categories to refine the listings.</p>
      </header>
      <div className="grid">
        {categories.map((category) => {
          const isSelected = selectedCategoryIds.includes(category.id);
          return (
            <label key={category.id} className={`tile tile--selectable ${isSelected ? 'tile--active' : ''}`}>
              <div>
                <p className="eyebrow">{category.label}</p>
                {category.description ? <p>{category.description}</p> : null}
              </div>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleCategory(category.id)}
              />
            </label>
          );
        })}
      </div>
    </section>
  );
}
