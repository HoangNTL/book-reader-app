import { create } from 'zustand';
import { Book } from '@/types';

interface BookState {
  selectedBook: Book | null;
  // eslint-disable-next-line no-unused-vars
  setSelectedBook: (book: Book) => void;
  clearSelectedBook: () => void;
}

export const useBookStore = create<BookState>((set) => ({
  selectedBook: null,
  setSelectedBook: (book) => set({ selectedBook: book }),
  clearSelectedBook: () => set({ selectedBook: null })
}));
