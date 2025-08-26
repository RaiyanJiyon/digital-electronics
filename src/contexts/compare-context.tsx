"use client";

import React, { createContext, useContext, useState } from "react";
import { Product } from "@/app/types/types";

interface CompareContextType {
  compareProducts: [Product | null, Product | null];
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  addToCompare: (product: Product, slot?: 0 | 1) => void;
  removeFromCompare: (slot: 0 | 1) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [compareProducts, setCompareProducts] = useState<[Product | null, Product | null]>([null, null]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addToCompare = (product: Product, slot?: 0 | 1) => {
    setCompareProducts(prev => {
      const newCompare: [Product | null, Product | null] = [...prev];
      
      // If slot specified, use it
      if (slot !== undefined) {
        newCompare[slot] = product;
        return newCompare;
      }
      
      // Auto-assign to first empty slot
      if (!newCompare[0]) {
        newCompare[0] = product;
      } else if (!newCompare[1]) {
        newCompare[1] = product;
      } else {
        // Replace second slot if both are filled
        newCompare[1] = product;
      }
      
      return newCompare;
    });
  };

  const removeFromCompare = (slot: 0 | 1) => {
    setCompareProducts(prev => {
      const newCompare: [Product | null, Product | null] = [...prev];
      newCompare[slot] = null;
      return newCompare;
    });
  };

  const clearCompare = () => {
    setCompareProducts([null, null]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareProducts,
        isModalOpen,
        openModal,
        closeModal,
        addToCompare,
        removeFromCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};
