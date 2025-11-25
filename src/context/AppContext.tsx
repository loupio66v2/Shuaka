import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getFirestore, doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { initFirebase } from '../firebaseConfig';
import type { UserProfile, UserRole, Category } from '../types';

interface AppContextValue {
  user: User | null;
  db: ReturnType<typeof getFirestore> | null;
  isReady: boolean;
  profile: UserProfile | null | undefined; // null = loading, undefined = none
  saveRole: (role: UserRole) => Promise<void>;
  saveCategory: (category: Category) => Promise<void>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [db, setDb] = useState<ReturnType<typeof getFirestore> | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null | undefined>(null);

  // 1. Initialize Firebase and auth
  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    (async () => {
      try {
        const { authUser, db } = await initFirebase();
        setUser(authUser);
        setDb(db);

        if (authUser) {
          const profileRef = doc(
            db,
            'artifacts',
            'shuaka',
            'users',
            authUser.uid,
            'profile',
            'user_data'
          );

          // listen to profile changes
          unsubscribeProfile = onSnapshot(
            profileRef,
            (snap) => {
              if (snap.exists()) {
                setProfile(snap.data() as UserProfile);
              } else {
                setProfile(undefined);
              }
            },
            (err) => {
              console.error('[AppContext] Profile listener error', err);
              setProfile(undefined);
            }
          );
        } else {
          setProfile(undefined);
        }
      } catch (error) {
        console.error('[AppContext] Firebase init failed', error);
        setProfile(undefined);
      } finally {
        setIsReady(true);
      }
    })();

    return () => {
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  const saveRole = async (role: UserRole) => {
    if (!user || !db) return;

    const profileRef = doc(
      db,
      'artifacts',
      'shuaka',
      'users',
      user.uid,
      'profile',
      'user_data'
    );

    await setDoc(
      profileRef,
      {
        role,
        category: null,
        isProfileComplete: false,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
  };

  const saveCategory = async (category: Category) => {
    if (!user || !db) return;

    const profileRef = doc(
      db,
      'artifacts',
      'shuaka',
      'users',
      user.uid,
      'profile',
      'user_data'
    );

    await setDoc(
      profileRef,
      {
        category,
        isProfileComplete: true,
      },
      { merge: true }
    );
  };

  const value: AppContextValue = {
    user,
    db,
    isReady,
    profile,
    saveRole,
    saveCategory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used inside AppProvider');
  }
  return ctx;
}
