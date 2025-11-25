import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';
import type { Listing } from './types';
import { SEED_DATA } from './types';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

export interface FirebaseBootstrapped {
  authUser: User | null;
  db: Firestore;
}

/**
 * Initialize Firebase only once, sign in (custom token or anonymous),
 * and seed mock data if the listings collection is empty.
 */
export async function initFirebase(): Promise<FirebaseBootstrapped> {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const db = getFirestore(app);

  // Sign in user (custom token if provided, otherwise anonymous)
  const customToken = import.meta.env.VITE_FIREBASE_CUSTOM_TOKEN as string | undefined;

  let authUser: User | null = auth.currentUser;

  if (!authUser) {
    if (customToken) {
      const cred = await signInWithCustomToken(auth, customToken);
      authUser = cred.user;
      console.log('[Firebase] Signed in with custom token:', authUser.uid);
    } else {
      const cred = await signInAnonymously(auth);
      authUser = cred.user;
      console.log('[Firebase] Signed in anonymously:', authUser.uid);
    }
  }

  // Seed DB if needed
  await seedListingsIfEmpty(db, authUser.uid);

  return { authUser, db };
}

async function seedListingsIfEmpty(db: Firestore, userId: string) {
  const listingsCol = collection(db, 'artifacts', 'shuaka', 'public', 'data', 'listings');
  const snapshot = await getDocs(listingsCol);

  if (!snapshot.empty) {
    console.log('[Firebase] Listings already seeded, skipping.');
    return;
  }

  console.log('[Firebase] Seeding mock listings...');

  const batchPromises: Promise<void>[] = [];

  SEED_DATA.forEach((listing: Listing) => {
    const docRef = doc(db, 'artifacts', 'shuaka', 'public', 'data', 'listings', listing.id);
    batchPromises.push(
      setDoc(docRef, {
        ...listing,
        createdAt: serverTimestamp(),
        // Ensure userId exists (keep original or fallback to current user)
        userId: listing.userId || userId,
      })
    );
  });

  await Promise.all(batchPromises);
  console.log('[Firebase] Seeding complete.');
}
