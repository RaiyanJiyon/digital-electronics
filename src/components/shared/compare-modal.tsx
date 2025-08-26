"use client";

import React, { useState, useEffect } from "react";
import { X, Search, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Product } from "@/app/types/types";
import { useCompare } from "@/contexts/compare-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CompareModal = () => {
  const { compareProducts, isModalOpen, closeModal, addToCompare, removeFromCompare, clearCompare } = useCompare();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<0 | 1 | null>(null);

  // Search products
  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.data || []);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (selectedSlot !== null) {
        searchProducts(searchQuery);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedSlot]);

  const handleProductSelect = (product: Product) => {
    if (selectedSlot !== null) {
      addToCompare(product, selectedSlot);
      setSelectedSlot(null);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const ProductSlot = ({ product, slot }: { product: Product | null; slot: 0 | 1 }) => (
    <div className="flex-1 border rounded-lg p-4 bg-white">
      {product ? (
        <div className="space-y-4">
          {/* Product Header */}
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg line-clamp-2">{product.productName}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFromCompare(slot)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Product Image */}
          <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.productName}
              fill
              className="object-contain p-2"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-3">
            <div className="text-2xl font-bold text-red-500">
              ${product.price.toFixed(2)}
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-sm text-gray-600">({product.rating})</span>
            </div>

            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Category:</span> {product.category}</div>
              <div><span className="font-medium">Brand:</span> {product.manufacturer}</div>
              <div><span className="font-medium">Availability:</span> 
                <span className={`ml-1 ${product.availability === 'In stock' ? 'text-green-600' : 'text-orange-600'}`}>
                  {product.availability}
                </span>
              </div>
              <div><span className="font-medium">Color:</span> {product.color}</div>
              <div><span className="font-medium">Size:</span> {product.size}</div>
            </div>

            <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>

            <Button className="w-full bg-red-500 hover:bg-red-600">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-gray-400 min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium">No Product Selected</p>
            <Button
              variant="outline"
              onClick={() => setSelectedSlot(slot)}
              className="border-dashed border-2"
            >
              Click to Select Product
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Compare Products</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={clearCompare}>
                Clear All
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Search Section */}
        {selectedSlot !== null && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-3">
              Select a product for {selectedSlot === 0 ? "left" : "right"} side:
            </h3>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" onClick={() => setSelectedSlot(null)}>
                Cancel
              </Button>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="max-h-60 overflow-y-auto space-y-2">
                {searchResults.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => handleProductSelect(product)}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-white cursor-pointer transition-colors"
                  >
                    <div className="relative w-12 h-12 bg-gray-100 rounded">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.productName}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium line-clamp-1">{product.productName}</h4>
                      <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isSearching && (
              <div className="text-center py-4 text-gray-500">Searching...</div>
            )}

            {searchQuery && !isSearching && searchResults.length === 0 && (
              <div className="text-center py-4 text-gray-500">No products found</div>
            )}
          </div>
        )}

        {/* Comparison Section */}
        <div className="flex gap-6">
          <ProductSlot product={compareProducts[0]} slot={0} />
          <ProductSlot product={compareProducts[1]} slot={1} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompareModal;
