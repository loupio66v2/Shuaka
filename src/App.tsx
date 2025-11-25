import { CategorySelection } from './components/onboarding/CategorySelection';
import { RoleSelection } from './components/onboarding/RoleSelection';
import { ListingBoard } from './components/listings/ListingBoard';
import { PrimaryButton } from './components/ui/PrimaryButton';
import { useAppContext } from './context/AppContext';
import type { Category, Listing, Role } from './types';
import './index.css';

const roles: { id: Role; title: string; description: string }[] = [
  {
    id: 'guardian',
    title: 'Guardian',
    description: 'Find trusted support for your child, from safe housing to education resources.',
  },
  {
    id: 'provider',
    title: 'Provider',
    description: 'Share services, collaborate with guardians, and reach families quickly.',
  },
];

const categories: Category[] = [
  {
    id: 'housing',
    label: 'Housing',
    description: 'Emergency placements, long-term housing partners, and rapid response options.',
  },
  {
    id: 'food',
    label: 'Food security',
    description: 'Community kitchens, weekend boxes, and culturally relevant groceries.',
  },
  {
    id: 'wellness',
    label: 'Health & wellness',
    description: 'Therapy, medical clinics, and trauma-informed care providers.',
  },
  {
    id: 'education',
    label: 'Education',
    description: 'Tutoring, specialized programs, and school enrollment guidance.',
  },
  {
    id: 'legal',
    label: 'Legal & advocacy',
    description: 'Youth advocacy partners, court support, and rights education.',
  },
];

const listings: Listing[] = [
  {
    id: 'safe-beds',
    title: 'Safe Beds Network',
    categoryId: 'housing',
    summary: 'Short-term placements with vetted host families and transportation support.',
    contact: 'beds@safe.org',
    featured: true,
  },
  {
    id: 'harbor',
    title: 'Harbor House',
    categoryId: 'housing',
    summary: '24/7 shelter with on-site clinicians and guardian coordination.',
    contact: 'intake@harbor.org',
  },
  {
    id: 'groceries',
    title: 'Community Groceries Program',
    categoryId: 'food',
    summary: 'Weekly groceries for families, with culturally specific ingredients available.',
    contact: 'hello@groceries.org',
  },
  {
    id: 'therapy',
    title: 'Trauma-Informed Therapy Collective',
    categoryId: 'wellness',
    summary: 'Sliding-scale therapy with providers trained in youth-centered care.',
    contact: 'care@therapycollective.org',
    featured: true,
  },
  {
    id: 'tutoring',
    title: 'Neighborhood Tutoring',
    categoryId: 'education',
    summary: 'After-school tutoring with volunteer educators and study materials.',
    contact: 'support@tutoring.org',
  },
  {
    id: 'advocacy',
    title: 'Youth Advocacy Project',
    categoryId: 'legal',
    summary: 'Court accompaniment, rights education, and family-first advocacy.',
    contact: 'intake@yap.org',
  },
];

export default function App() {
  const { clearSelections } = useAppContext();

  return (
    <div className="layout">
      <header className="page-header">
        <div>
          <p className="eyebrow">Shuaka</p>
          <h1>Match guardians with reliable providers</h1>
          <p className="muted">
            A focused onboarding flow that captures who you are and surfaces the support that matters most.
          </p>
        </div>
        <PrimaryButton type="button" onClick={clearSelections}>
          Start over
        </PrimaryButton>
      </header>
      <main className="stack">
        <RoleSelection roles={roles} />
        <CategorySelection categories={categories} />
        <ListingBoard listings={listings} categories={categories} />
      </main>
    </div>
  );
}
