import type { Category, Listing } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface ListingBoardProps {
  listings: Listing[];
  categories: Category[];
}

export function ListingBoard({ listings, categories }: ListingBoardProps) {
  const { selectedCategoryIds, role } = useAppContext();

  const filteredListings = listings.filter((listing) =>
    selectedCategoryIds.length === 0 || selectedCategoryIds.includes(listing.categoryId)
  );

  const getCategoryLabel = (categoryId: string) =>
    categories.find((category) => category.id === categoryId)?.label ?? 'Other';

  return (
    <section className="card">
      <header className="card__header">
        <p className="eyebrow">Step 3</p>
        <h2>Explore tailored resources</h2>
        <p className="muted">
          {role
            ? `You are viewing resources curated for ${role === 'guardian' ? 'families and guardians' : 'community providers'}.`
            : 'Select a role to personalize the recommendations.'}
        </p>
      </header>
      {filteredListings.length === 0 ? (
        <div className="empty-state">
          <p className="muted">No listings match your filters yet. Try selecting a different combination.</p>
        </div>
      ) : (
        <div className="listings">
          {filteredListings.map((listing) => (
            <article key={listing.id} className={`listing ${listing.featured ? 'listing--featured' : ''}`}>
              <div className="listing__header">
                <p className="eyebrow">{getCategoryLabel(listing.categoryId)}</p>
                {listing.featured ? <span className="badge">Featured</span> : null}
              </div>
              <h3>{listing.title}</h3>
              <p className="muted">{listing.summary}</p>
              <p className="contact">Contact: {listing.contact}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
