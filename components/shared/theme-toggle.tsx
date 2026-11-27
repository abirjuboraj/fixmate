"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "relative h-9 w-9 rounded-full border-border/80 bg-card shadow-xs transition-colors hover:border-primary/40 hover:text-primary",
        className
      )}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle light or dark theme"
      title="Toggle theme"
    >

      <Sun className="absolute h-4 w-4 text-amber-500 transition-transform duration-200 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-4 w-4 text-primary scale-0 rotate-90 transition-transform duration-200 dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
