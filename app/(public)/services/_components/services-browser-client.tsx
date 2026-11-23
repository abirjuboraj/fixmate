"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  ArrowUpDown,
  X,
} from "lucide-react";

import {
  ServiceItem,
  SERVICE_CATEGORIES,
  SERVICE_MODES,
  SortOption,
} from "@/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceCard } from "./service-card";
import { ServicesEmptyState } from "./services-empty-state";

interface ServicesBrowserClientProps {
  initialServices: ServiceItem[];
  initialSearch?: string;
  initialCategory?: string;
  initialServiceMode?: string;
  initialSort?: string;
}

// Sort options for the dropdown
const SORT_OPTIONS: SortOption[] = [
  { label: "Newest First", value: "Newest" },
  { label: "Price: Low to High", value: "Low-to-High" },
  { label: "Price: High to Low", value: "High-to-Low" },
];

export function ServicesBrowserClient({
  initialServices,
  initialSearch = "",
  initialCategory = "All",
  initialServiceMode = "All",
  initialSort = "Newest",
}: ServicesBrowserClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const [searchText, setSearchText] = useState(initialSearch);


  const activeCategory = searchParams.get("category") || initialCategory;
  const activeMode = searchParams.get("serviceMode") || initialServiceMode;
  const rawSort = searchParams.get("sort") || initialSort;
  // Normalize sort string to ensure case-insensitive match with SORT_OPTIONS (e.g. "newest" -> "Newest")
  const activeSort =
    SORT_OPTIONS.find(
      (opt) => opt.value.toLowerCase() === rawSort.toLowerCase()
    )?.value || "Newest";


  const changeFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());


    if (!value || value === "All" || (key === "sort" && value === "Newest")) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const queryString = params.toString();
    const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(targetUrl, { scroll: false });
  };

  // Debounced live search: updates URL 300ms after user stops typing
  useEffect(() => {
    const currentSearchInUrl = searchParams.get("search") || "";
    if (searchText === currentSearchInUrl) return;

    const timer = setTimeout(() => {
      changeFilter("search", searchText.trim());
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  // Clear search text
  const handleClearSearch = () => {
    setSearchText("");
    changeFilter("search", "");
  };

  // Reset all filters to default
  const handleResetFilters = () => {
    setSearchText("");
    router.push(pathname, { scroll: false });
  };

  return (
    <div className="space-y-8">
      {/* Search Bar, Mode, Sort & Category Filters Box */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs space-y-5">

        {/* Top Row: Search on far-left, Mode & Sort side-by-side on far-right (1 horizontal line on md/tablet and desktop) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          {/* Far-Left: Search input with real-time live typing */}
          <div className="relative w-full md:flex-1 md:max-w-md lg:max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search repair services by title and category..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10 pr-9 h-11 text-sm bg-background w-full"
            />
            {searchText && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Far-Right: Service Mode & Sort Dropdowns grouped together with clean spacing */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Service Mode Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:inline">
                Mode:
              </span>
              <Select
                value={activeMode}
                onValueChange={(value) => changeFilter("serviceMode", value || "All")}
              >
                <SelectTrigger className="w-36 sm:w-38 md:w-40 h-10 text-xs">
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
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:inline">
                Sort:
              </span>
              <Select
                value={activeSort}
                onValueChange={(value) => changeFilter("sort", value || "Newest")}
              >
                <SelectTrigger className="w-38 sm:w-42 md:w-44 h-10 text-xs">
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
          </div>
        </div>

        {/* Bottom Row: Category Pills */}
        <div className="space-y-2 pt-4 border-t border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5 text-primary" />
              Categories
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {/* "All Categories" Button */}
            <button
              type="button"
              onClick={() => changeFilter("category", "All")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${activeCategory === "All"
                ? "bg-primary text-primary-foreground border-primary shadow-xs"
                : "bg-background text-foreground border-border/80 hover:bg-muted/60"
                }`}
            >
              All Categories
            </button>

            {/* Individual Category Buttons */}
            {SERVICE_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => changeFilter("category", cat)}
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

      {/* Services Grid or Clean Empty State */}
      {initialServices.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          {initialServices.map((service) => (
            <ServiceCard
              key={service._id ? String(service._id) : service.title}
              service={service}
            />
          ))}
        </div>
      ) : (
        <ServicesEmptyState onResetFilters={handleResetFilters} />
      )}
    </div>
  );
}
