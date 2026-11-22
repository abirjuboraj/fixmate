import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Navbar />
      {/* min-h-dvh keeps the footer below the fold even when a page is empty
          or its content is still loading. */}
      <main className="min-h-dvh flex-1">{children}</main>
      <Footer />
    </div>
  );
}
