export type Role = 'guardian' | 'provider';

export interface Category {
  id: string;
  label: string;
  description?: string;
}

export interface Listing {
  id: string;
  title: string;
  categoryId: string;
  summary: string;
  contact: string;
  featured?: boolean;
}
