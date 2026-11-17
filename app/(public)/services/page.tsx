import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Browse Repair Services
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Discover certified technicians for mobile devices, laptops, home
          appliances, and electrical systems. (Full service catalog, search, and
          filtering will be available in the upcoming phase).
        </p>
        <div className="mt-6">
          <Button variant="outline" asChild className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
