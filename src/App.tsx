import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { RoleSelection } from './components/onboarding/RoleSelection';
import { CategorySelection } from './components/onboarding/CategorySelection';
import { ListingBoard } from './components/listings/ListingBoard';
import { Spinner } from './components/ui/Spinner';

const AppInner: React.FC = () => {
  const { isReady, profile } = useAppContext();

  if (!isReady || profile === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <Spinner label="Booting Shuaka..." />
      </div>
    );
  }

  // No profile document yet => Step 1
  if (profile === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center px-4">
        <RoleSelection />
      </div>
    );
  }

  // Role chosen but no category / not complete => Step 2
  if (!profile.isProfileComplete || !profile.category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center px-4">
        <CategorySelection />
      </div>
    );
  }

  // Fully onboarded => main board
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-white font-black">
              S
            </span>
            <div>
              <h1 className="font-bold text-xl tracking-tight">Shuaka</h1>
              <p className="text-xs text-muted-foreground">Swiping for serious creatives</p>
            </div>
          </div>
        </header>

        <ListingBoard />
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <AppInner />
  </AppProvider>
);

export default App;
