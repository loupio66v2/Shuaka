export type UserRole = 'artist' | 'recruiter';
export type Category = 'singer' | 'actor' | 'teacher' | 'dancer';

export interface UserProfile {
  role: UserRole;
  category: Category | null;
  isProfileComplete: boolean;
  createdAt?: any; // Firestore Timestamp
}

export interface Listing {
  id: string;
  type: 'job' | 'profile';
  title: string;
  subtitle: string;
  category: Category;
  description: string;
  userRole: UserRole;
  userId: string;
}

export const CATEGORIES: { value: Category; label: string; icon: string }[] = [
  { value: 'singer', label: 'Singer', icon: '🎤' },
  { value: 'actor', label: 'Actor', icon: '🎭' },
  { value: 'teacher', label: 'Teacher / Coach', icon: '🧑‍🏫' },
  { value: 'dancer', label: 'Dancer', icon: '🩰' },
];

export const SEED_DATA: Listing[] = [
  {
    id: 'job_singer_1',
    type: 'job',
    title: 'Session Vocalist Needed for Pop Track',
    subtitle: 'Remote recording, 2-day gig.',
    category: 'singer',
    description:
      'Seeking a female vocalist with a strong belt for a modern pop song, capable of self-recording broadcast-quality tracks.',
    userRole: 'recruiter',
    userId: 'mock_rec_1',
  },
  {
    id: 'job_actor_1',
    type: 'job',
    title: 'Short Film - Lead Male Role (20s)',
    subtitle: 'Casting in NYC, paid gig.',
    category: 'actor',
    description:
      'Dramatic role requiring intense emotional range. Must be available weekends and able to handle long shooting days.',
    userRole: 'recruiter',
    userId: 'mock_rec_2',
  },
  {
    id: 'job_teacher_1',
    type: 'job',
    title: 'Piano Instructor for Beginners',
    subtitle: 'Part-time, online coaching.',
    category: 'teacher',
    description:
      'Experienced piano teacher to coach students aged 8-12. Knowledge of RCM preferred. Must be engaging and patient.',
    userRole: 'recruiter',
    userId: 'mock_rec_3',
  },
  {
    id: 'job_dancer_1',
    type: 'job',
    title: 'Hip-Hop Choreographer for Music Video',
    subtitle: '4-day shoot, large team.',
    category: 'dancer',
    description:
      'Need innovative choreographer to design moves for a high-energy rap video and manage a team of 10 dancers.',
    userRole: 'recruiter',
    userId: 'mock_rec_4',
  },
  {
    id: 'profile_singer_1',
    type: 'profile',
    title: 'Liam K. - Operatic Baritone',
    subtitle: 'Available for concerts and voiceovers.',
    category: 'singer',
    description:
      'Classically trained baritone with 10 years on stage. Fluent in Italian and German. Looking for modern opera roles.',
    userRole: 'artist',
    userId: 'mock_art_1',
  },
  {
    id: 'profile_actor_1',
    type: 'profile',
    title: 'Maria R. - Comedy Actress',
    subtitle: 'Improv specialist, strong portfolio.',
    category: 'actor',
    description:
      'Specializing in sketch comedy and voice acting. Highly proficient in comedic timing and physical theater.',
    userRole: 'artist',
    userId: 'mock_art_2',
  },
  {
    id: 'profile_teacher_1',
    type: 'profile',
    title: 'Sarah W. - Digital Art Tutor',
    subtitle: 'Expert in Procreate & Photoshop.',
    category: 'teacher',
    description:
      'Offering one-on-one digital painting lessons. Certified Adobe professional with a focus on concept art.',
    userRole: 'artist',
    userId: 'mock_art_3',
  },
  {
    id: 'profile_dancer_1',
    type: 'profile',
    title: 'Tarik S. - Contemporary Dancer',
    subtitle: 'Flexible, ready for tour or residency.',
    category: 'dancer',
    description:
      'Modern and contemporary style dancer. Expert in improvisation and abstract movement interpretation.',
    userRole: 'artist',
    userId: 'mock_art_4',
  },
];
