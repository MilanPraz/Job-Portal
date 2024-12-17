"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface TJobContext {
  favorites: Set<number>;
  toggleFavorite: (jobId: number) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}
const JobContext = createContext<TJobContext | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  // const saved = localStorage.getItem("jobFavorites");
  // const savedSets: number[] = saved ? JSON.parse(saved) : [];
  // const savedFavs = new Set<number>(savedSets);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem("jobFavorites");
    if (saved) {
      const savedSets: number[] = JSON.parse(saved);
      setFavorites(new Set(savedSets));
    }
  }, []);

  const toggleFavorite = (jobId: number) => {
    setFavorites((prev) => {
      const newFavSet = new Set(prev);
      if (newFavSet.has(jobId)) {
        newFavSet.delete(jobId);
      } else {
        newFavSet.add(jobId);
      }
      localStorage.setItem("jobFavorites", JSON.stringify([...newFavSet]));
      return newFavSet;
    });
  };

  useEffect(() => {
    localStorage.setItem("jobFavorites", JSON.stringify([...favorites]));
  }, [favorites]);

  return (
    <JobContext.Provider
      value={{
        favorites,
        toggleFavorite,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const jobContext = useContext(JobContext);
  if (jobContext === undefined) {
    throw new Error("UseJobContext must be used inside the Provider");
  }
  return jobContext;
};
