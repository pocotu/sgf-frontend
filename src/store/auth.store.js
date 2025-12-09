import { atom } from 'jotai';

// Atoms
export const userAtom = atom(null);
export const isAuthenticatedAtom = atom((get) => !!get(userAtom));
export const isLoadingAuthAtom = atom(true); // Initial load check

// Derived actions could be added here if needed, but simple atoms suffice for now.
