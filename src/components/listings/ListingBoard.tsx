import React, { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import type { Category, Listing } from '../../types';
import { CATEGORIES } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { Spinner } from '../ui/Spinner';

const ListingCard: React.FC<{ listing: Listing }> = ({ listing }) => {
  const isJob = listing.type === 'job';

  return (
    <article className="p-5 rounded-2xl bg-card shadow-card border border-border flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold text-lg">{listing.title}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            isJob ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary-foreground'
          }`}
        >
          {isJob ? 'Job' : 'Talent'}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{listing.subtitle}</p>
      <p className="text-sm mt-1 line-clamp-3">{listing.description}</p>
      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <span>🎯</span>
          <span>{listing.category}</span>
        </span>
        <span>{listing.userRole === 'artist' ? 'Artist' : 'Recruiter'}</span>
      </div>
    </article>
  );
};

export const ListingBoard: React.FC = () => {
  const { db, profile } = useAppContext();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [activeType, setActiveType] = useState<'all' | 'job' | 'profile'>('all');

  useEffect(() => {
    if (!db) return;

    const fetchListings = async () => {
      setLoading(true);

      try {
        const baseCol = collection(db, 'artifacts', 'shuaka', 'public', 'data', 'listings');

        const q = query(baseCol);
        const snap = await getDocs(q);
        const data: Listing[] = [];
        snap.forEach((doc) => {
          data.push(doc.data() as Listing);
        });
        setListings(data);
      } catch (err) {
        console.error('[ListingBoard] Failed to load listings', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [db]);

  const filtered = useMemo(() => {
    return listings.filter((listing) => {
      if (activeCategory !== 'all' && listing.category !== activeCategory) {
        return false;
      }
      if (activeType !== 'all' && listing.type !== activeType) {
        return false;
      }
      return true;
    });
  }, [listings, activeCategory, activeType]);

  const displayName =
    profile?.role === 'artist' ? 'Artist' : profile?.role === 'recruiter' ? 'Recruiter' : 'User';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Shuaka</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold">Curated handshakes for {displayName}s</h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Browse opportunities and talent that match your lane. Swipe, match, and chat in your own style.
        </p>
      </header>

      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
              activeCategory === 'all'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card border-border text-muted-foreground'
            }`}
          >
            All categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition flex items-center gap-1 ${
                activeCategory === cat.value
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border text-muted-foreground'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          {(['all', 'job', 'profile'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                activeType === type
                  ? 'bg-secondary text-secondary-foreground border-secondary'
                  : 'bg-card border-border text-muted-foreground'
              }`}
            >
              {type === 'all' ? 'All' : type === 'job' ? 'Jobs' : 'Talents'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-16 flex justify-center">
          <Spinner label="Loading listings..." />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">No listings match your filters yet.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};
