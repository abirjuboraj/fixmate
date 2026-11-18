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
      className="flex w-full max-w-md items-center gap-2 rounded-xl border border-neutral-200/20 bg-white/95 text-neutral-900 p-1.5 shadow-md backdrop-blur-md"
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a repair: iPhone screen, AC..."
          className="border-0 bg-transparent pl-9 text-neutral-900 placeholder:text-neutral-500 shadow-none focus-visible:ring-0 text-sm font-medium"
          aria-label="Search repair services"
        />
      </div>
      <Button type="submit" className="gap-1.5 shadow-sm font-semibold shrink-0">
        Search
      </Button>
    </form>
  );
}
