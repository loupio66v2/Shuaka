import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import type { Role } from '../types';

interface AppContextValue {
  role: Role | null;
  selectedCategoryIds: string[];
  setRole: (role: Role) => void;
  toggleCategory: (categoryId: string) => void;
  clearSelections: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: ProviderProps) {
  const [role, setRole] = useState<Role | null>(null);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearSelections = () => {
    setRole(null);
    setSelectedCategoryIds([]);
  };

  const value = useMemo(
    () => ({ role, selectedCategoryIds, setRole, toggleCategory, clearSelections }),
    [role, selectedCategoryIds]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }

  return context;
}
