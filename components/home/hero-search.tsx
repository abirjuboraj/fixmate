"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// CLIENT COMPONENT — the hero search box.
// Navigates to the browse-services page with the search text as a query param,
// so the results page can read it via ?search=...
export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = query.trim();

    // Send the user to /services (with the search term if they typed one)
    if (trimmed) {
      router.push(`/services?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/services");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full max-w-[240px] items-center gap-1.5 rounded-xl border border-neutral-200/20 bg-white/95 p-1 text-neutral-900 shadow-md backdrop-blur-md sm:max-w-sm sm:gap-2 sm:p-1.5 lg:w-2/3 lg:max-w-none"
    >
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500 sm:left-3 sm:h-4 sm:w-4" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a repair: iPhone screen, AC..."
          className="h-8 border-0 bg-transparent pl-8 text-xs font-medium text-neutral-900 shadow-none placeholder:text-neutral-500 focus-visible:ring-0 sm:h-9 sm:pl-9 sm:text-sm"
          aria-label="Search repair services"
        />
      </div>
      <Button
        type="submit"
        size="sm"
        className="h-8 shrink-0 gap-1 rounded-lg px-2.5 text-xs font-semibold shadow-sm sm:h-9 sm:px-3 sm:text-sm"
      >
        Search
      </Button>
    </form>
  );
}
