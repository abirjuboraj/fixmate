"use client";

import React, { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  ArrowUpDown,
  X,
  RotateCcw,
  Loader2,
} from "lucide-react";

import {
  ServiceItem,
  SERVICE_CATEGORIES,
  SERVICE_MODES,
  SortOption,
} from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceCard } from "./service-card";
import { ServicesEmptyState } from "./services-empty-state";
import { ServicesSkeletonGrid } from "./services-skeleton-grid";

interface ServicesBrowserClientProps {
  initialServices: ServiceItem[];
  initialSearch?: string;
  initialCategory?: string;
  initialServiceMode?: string;
  initialSort?: string;
}

const SORT_OPTIONS: SortOption[] = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "low-to-high" },
  { label: "Price: High to Low", value: "high-to-low" },
];

export function ServicesBrowserClient({
  initialServices,
  initialSearch = "",
  initialCategory = "All",
  initialServiceMode = "All",
  initialSort = "newest",
}: ServicesBrowserClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Instant typing state
  const [searchInput, setSearchInput] = useState(initialSearch);

  // Synchronize state with URL parameters
  const activeCategory = searchParams.get("category") || "All";
  const activeServiceMode = searchParams.get("serviceMode") || "All";
  const activeSort = searchParams.get("sort") || "newest";

  // Helper to push URL query updates to Next.js server component
  const updateQueryParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (!value || value === "All" || (key === "sort" && value === "newest")) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, router, searchParams]
  );

  // Live real-time search with 300ms debounce as user types
  useEffect(() => {
    const currentParam = searchParams.get("search") || "";
    if (searchInput === currentParam) return;

    const timer = setTimeout(() => {
      updateQueryParams({ search: searchInput.trim() || undefined });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, searchParams, updateQueryParams]);

  const handleClearSearch = () => {
    setSearchInput("");
    updateQueryParams({ search: undefined });
  };

  const handleCategorySelect = (category: string) => {
    updateQueryParams({ category });
  };

  const handleServiceModeSelect = (mode: string) => {
    updateQueryParams({ serviceMode: mode });
  };

  const handleSortChange = (sort: string) => {
    updateQueryParams({ sort });
  };

  const handleResetAll = () => {
    setSearchInput("");
    startTransition(() => {
      router.push(pathname);
    });
  };

  const hasActiveFilters =
    Boolean(searchInput) ||
    activeCategory !== "All" ||
    activeServiceMode !== "All" ||
    activeSort !== "newest";

  return (
    <div className="space-y-8">
      {/* 1. Header & Filters Container */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs space-y-5">
        {/* Top Row: Search on far left, Sorts & Filters together on far right */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Far Left: Real-time Live Search Bar (no search button) */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search repair services as you type..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 pr-9 h-11 text-sm bg-background w-full"
            />
            {isPending ? (
              <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
            ) : searchInput ? (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          {/* Far Right: Mode filter, Sort dropdown, and Reset button grouped side by side */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Service Mode Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:inline">
                Mode:
              </span>
              <Select
                value={activeServiceMode}
                onValueChange={(val) => handleServiceModeSelect(val || "All")}
              >
                <SelectTrigger className="w-[150px] sm:w-[160px] h-10 text-xs">
                  <SelectValue placeholder="All Modes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Modes</SelectItem>
                  {SERVICE_MODES.map((mode) => (
                    <SelectItem key={mode} value={mode}>
                      {mode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:inline">
                Sort:
              </span>
              <Select
                value={activeSort}
                onValueChange={(val) => handleSortChange(val || "newest")}
              >
                <SelectTrigger className="w-[160px] sm:w-[180px] h-10 text-xs">
                  <ArrowUpDown className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <SelectValue placeholder="Sort Services" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reset Filters Icon/Button */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetAll}
                className="text-xs text-muted-foreground hover:text-foreground gap-1.5 h-10 px-2.5"
                title="Reset all filters"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
            )}
          </div>
        </div>

        {/* Bottom Row: Category Pills below search & sort */}
        <div className="space-y-2 pt-4 border-t border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5 text-primary" />
              Categories
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleCategorySelect("All")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${activeCategory === "All"
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-background text-foreground border-border/80 hover:bg-muted/60"
                }`}
            >
              All Categories
            </button>
            {SERVICE_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "bg-background text-foreground border-border/80 hover:bg-muted/60"
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Results Grid or Loading or Clean Dynamic Empty State */}
      {isPending ? (
        <ServicesSkeletonGrid />
      ) : initialServices.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {initialServices.map((service) => (
            <ServiceCard
              key={service._id ? String(service._id) : service.title}
              service={service}
            />
          ))}
        </div>
      ) : (
        <ServicesEmptyState onResetFilters={handleResetAll} />
      )}
    </div>
  );
}
