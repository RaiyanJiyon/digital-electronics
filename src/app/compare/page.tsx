"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "@/app/types/types";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

function useFetchProduct(id?: string | null) {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load product");
        return res.json();
      })
      .then((p: Product) => {
        if (!cancelled) setData(p);
      })
      .catch((e: unknown) => !cancelled && setError(e instanceof Error ? e.message : "Error"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { data, loading, error };
}

function ProductSlot({ title, product, onRemove }: { title: string; product: Product | null; onRemove?: () => void }) {
  return (
    <div className="flex-1 border rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{title}</h3>
        {product && (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs text-red-600 hover:text-red-700 underline"
          >
            Remove
          </button>
        )}
      </div>
      {product ? (
        <div className="space-y-3">
          <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
            <Image
              src={product.images?.[0] || "/placeholder.svg"}
              alt={product.productName}
              fill
              className="object-contain p-2"
            />
          </div>
          <div className="space-y-1">
            <div className="font-medium text-lg line-clamp-2">{product.productName}</div>
            <div className="text-red-500 font-semibold">${product.price.toFixed(2)}</div>
            <div className="text-sm text-gray-600">{product.category}</div>
          </div>
        </div>
      ) : (
        <div className="text-gray-400 min-h-[420px] grid place-items-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-full grid place-items-center">
              <Search className="w-7 h-7" />
            </div>
            <p>Select a product to compare</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  const params = useSearchParams();
  const router = useRouter();
  const leftId = params.get("left");
  const rightId = params.get("right");

  const { data: left } = useFetchProduct(leftId);
  const { data: right } = useFetchProduct(rightId);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const t = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setSearching(true);
      try {
        const res = await fetch(`/api/products?limit=10&search=${encodeURIComponent(query)}`);
        const json = await res.json();
        setResults(json?.data || []);
      } catch {
        // ignore error
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const specRows = useMemo(() => {
    // fields to compare
    const keys: Array<{ key: keyof Product; label: string }> = [
      { key: "manufacturer", label: "Brand" },
      { key: "category", label: "Category" },
      { key: "availability", label: "Availability" },
      { key: "color", label: "Color" },
      { key: "size", label: "Size" },
      { key: "rating", label: "Rating" },
      { key: "quantity", label: "Stock Qty" },
      { key: "productTypes", label: "Type" },
    ];
    return keys;
  }, []);

  const setRight = (p: Product) => {
    const next = new URLSearchParams(params.toString());
    next.set("right", p._id);
    router.push(`/compare?${next.toString()}`);
  };

  const setLeft = (p: Product) => {
    const next = new URLSearchParams(params.toString());
    next.set("left", p._id);
    router.push(`/compare?${next.toString()}`);
  };

  const clearParamAndPush = (key: "left" | "right") => {
    const next = new URLSearchParams(params.toString());
    next.delete(key);
    const qs = next.toString();
    router.push(qs ? `/compare?${qs}` : "/compare");
  };

  const clearLeft = () => clearParamAndPush("left");
  const clearRight = () => clearParamAndPush("right");

  const getSpec = (p: Product | null, k: keyof Product) => {
    if (!p) return "-";
    const v = p[k] as unknown;
    return v === undefined || v === null ? "-" : String(v);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/shop" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to shop
          </Link>
          <h1 className="text-xl font-semibold">Compare Products</h1>
        </div>
      </div>

      {/* Top: search to pick the right product */}
      <div className="mb-6">
        <div className="flex gap-2">
          <Input
            placeholder="Search a product to compare on the right..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="outline" onClick={() => setQuery("")}>Clear</Button>
        </div>
        {searching && <div className="text-sm text-gray-500 mt-2">Searching...</div>}
        {results.length > 0 && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {results.map((p) => (
              <button
                key={p._id}
                onClick={() => {
                  if (!leftId) setLeft(p);
                  else setRight(p);
                }}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-white transition text-left"
              >
                <div className="relative w-12 h-12 bg-gray-100 rounded">
                  <Image src={p.images?.[0] || "/placeholder.svg"} alt={p.productName} fill className="object-contain p-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium line-clamp-1">{p.productName}</div>
                  <div className="text-sm text-red-500">${p.price.toFixed(2)}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Comparison cards */}
      <div className="flex flex-col lg:flex-row gap-6">
        <ProductSlot title="Selected (left)" product={left} onRemove={clearLeft} />
        <ProductSlot title="Selected (right)" product={right} onRemove={clearRight} />
      </div>

      {/* Specs table */}
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-3 w-56">Specification</th>
              <th className="text-left p-3">Left</th>
              <th className="text-left p-3">Right</th>
            </tr>
          </thead>
          <tbody>
            {specRows.map(({ key, label }) => (
              <tr key={String(key)} className="border-t">
                <td className="p-3 font-medium text-sm">{label}</td>
                <td className="p-3 text-sm">{getSpec(left, key)}</td>
                <td className="p-3 text-sm">{getSpec(right, key)}</td>
              </tr>
            ))}
            <tr className="border-t">
              <td className="p-3 font-medium text-sm">Price</td>
              <td className="p-3 text-sm">{left ? `$${left.price.toFixed(2)}` : "-"}</td>
              <td className="p-3 text-sm">{right ? `$${right.price.toFixed(2)}` : "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
