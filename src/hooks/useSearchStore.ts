import { create } from 'zustand';
import type { SearchResult } from '@/hooks/useSearch';

interface SearchStore {
  searchQuery: string;
  searchResults: SearchResult[];
  isSearchActive: boolean;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: SearchResult[]) => void;
  setSearchActive: (active: boolean) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchQuery: '',
  searchResults: [],
  isSearchActive: false,
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSearchResults: (results: SearchResult[]) => set({ searchResults: results }),
  setSearchActive: (active: boolean) => set({ isSearchActive: active }),
  clearSearch: () => set({ 
    searchQuery: '', 
    searchResults: [], 
    isSearchActive: false 
  }),
}));