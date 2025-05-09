"use client"

import type React from "react"

import { useEffect, useState, useCallback } from "react"
import PageCover from "@/components/shared/page-cover"
import ProductCard from "@/components/shared/product-card"
import type { Product } from "../types/types"
import { Loader2, Filter, ChevronDown, ChevronUp, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import PriceRangeFilter from "@/components/shared/products/price-range-filter"
import BrandFilter from "@/components/shared/products/brand-filter"

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [availableBrands, setAvailableBrands] = useState<string[]>([])
  const [isFilterApplied, setIsFilterApplied] = useState(false)

  const LIMIT = 12

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Get filter values from URL
  const minPrice = searchParams.get("minPrice") || ""
  const maxPrice = searchParams.get("maxPrice") || ""
  const rating = searchParams.get("rating") || ""
  const availability = searchParams.get("availability") || ""
  const brand = searchParams.get("brand") || ""
  const sortBy = searchParams.get("sortBy") || "newest"
  const page = Number(searchParams.get("page") || "1")

  // Create query string from filters
  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())

      Object.entries(params).forEach(([name, value]) => {
        if (value) {
          newSearchParams.set(name, value)
        } else {
          newSearchParams.delete(name)
        }
      })

      return newSearchParams.toString()
    },
    [searchParams],
  )

  // Apply filters
  const applyFilters = useCallback(
    (filters: Record<string, string>) => {
      // When applying filters, reset to page 1
      const newFilters = { ...filters }
      if (!newFilters.page) {
        newFilters.page = "1"
      }

      const queryString = createQueryString(newFilters)
      router.push(`${pathname}?${queryString}`)
      setIsFilterApplied(
        !!(filters.minPrice || filters.maxPrice || filters.rating || filters.availability || filters.brand),
      )
    },
    [createQueryString, pathname, router],
  )

  // Clear all filters
  const clearFilters = () => {
    router.push(`${pathname}?page=1`)
    setIsFilterApplied(false)
  }

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return

    const queryString = createQueryString({ page: newPage.toString() })
    router.push(`${pathname}?${queryString}`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Fetch available brands for filter
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("/api/products/brands")
        if (!response.ok) throw new Error("Failed to fetch brands")
        const data = await response.json()
        setAvailableBrands(data.brands || [])
      } catch (err) {
        console.error("Error fetching brands:", err)
      }
    }

    fetchBrands()
  }, [])

  // Fetch products with filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)

      try {
        let url = `/api/products?limit=${LIMIT}&page=${page}`

        if (minPrice) url += `&minPrice=${minPrice}`
        if (maxPrice) url += `&maxPrice=${maxPrice}`
        if (rating) url += `&rating=${rating}`
        if (availability) url += `&availability=${availability}`
        if (brand) url += `&manufacturer=${brand}`
        if (sortBy) url += `&sortBy=${sortBy}`

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error("Failed to fetch products data")
        }

        const data = await response.json()
        setProducts(data.data || [])
        setTotalProducts(data.total || 0)
        setTotalPages(Math.ceil((data.total || 0) / LIMIT))
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [page, minPrice, maxPrice, rating, availability, brand, sortBy])

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    applyFilters({ sortBy: e.target.value, page: "1" })
  }

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = []
    const maxVisiblePages = 5

    // Always show first page
    items.push(
      <PaginationItem key="page-1">
        <PaginationLink isActive={page === 1} onClick={() => handlePageChange(1)}>
          1
        </PaginationLink>
      </PaginationItem>,
    )

    // Calculate range of pages to show
    const startPage = Math.max(2, page - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3)

    // Adjust if we're near the start
    if (startPage > 2) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink isActive={page === i} onClick={() => handlePageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    // Add ellipsis if needed
    if (endPage < totalPages - 1) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink isActive={page === totalPages} onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    return items
  }

  return (
    <div>
      {/* Page Cover */}
      <PageCover prev="Features" next="Shop" />

      {/* Main Content */}
      <div className="container px-4 mx-auto">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" />
            Filters
            {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>

          <div className="flex items-center">
            <label htmlFor="mobile-sort" className="text-sm mr-2">
              Sort by:
            </label>
            <select id="mobile-sort" className="text-sm border rounded p-1" value={sortBy} onChange={handleSortChange}>
              <option value="newest">Newest</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-4 gap-6 my-10">
          {/* Left Sidebar */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block bg-white p-4 rounded-lg border shadow-sm`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              {isFilterApplied && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-red-600 hover:text-red-700 p-0 h-auto"
                >
                  <X className="h-4 w-4 mr-1" /> Clear all
                </Button>
              )}
            </div>

            <div className="space-y-6">
              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <PriceRangeFilter
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  onApply={(min, max) => applyFilters({ minPrice: min, maxPrice: max, page: "1" })}
                />
              </div>

              <Separator />

              {/* Brand Filter */}
              <div>
                <h3 className="font-medium mb-3">Brand</h3>
                <BrandFilter
                  brands={availableBrands}
                  selectedBrand={brand}
                  onChange={(value) => applyFilters({ brand: value, page: "1" })}
                />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-span-4 lg:col-span-3">
            {/* Sort and Results Count - Desktop */}
            <div className="hidden lg:flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                Showing {products.length > 0 ? (page - 1) * LIMIT + 1 : 0} - {Math.min(page * LIMIT, totalProducts)} of{" "}
                {totalProducts} products
              </p>

              <div className="flex items-center">
                <label htmlFor="desktop-sort" className="text-sm mr-2">
                  Sort by:
                </label>
                <select
                  id="desktop-sort"
                  className="text-sm border rounded p-1"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="newest">Newest</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {error && <p className="text-red-500 text-center col-span-full">Error: {error}</p>}

              {!loading && !error && products.length === 0 && (
                <p className="text-gray-500 text-center col-span-full py-10">
                  No products available matching your filters.
                </p>
              )}

              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="col-span-full flex justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                </div>
              )}
            </div>

            {/* Pagination */}
            {!loading && totalPages > 0 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(page - 1)}
                        className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {renderPaginationItems()}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(page + 1)}
                        className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
