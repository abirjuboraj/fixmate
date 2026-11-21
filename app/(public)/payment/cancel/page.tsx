import { redirect } from "next/navigation";
import Link from "next/link";
import {
  XCircle,
  AlertTriangle,
  RotateCcw,
  ShieldX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/server";
import { PageToast } from "@/components/shared/page-toast";

export const metadata = {
  title: "Payment Cancelled | FixMate",
  description: "Your repair service payment was not completed.",
};

/**
 * Server Component: Payment Cancel Page
 * Rendered when a customer cancels Stripe Checkout or closes the tab.
 * Informs the user that no charge was made, and allows returning to My Bookings.
 */
export default async function PaymentCancelPage() {
  const session = await getSession();
  if (!session || !session.user) {
    redirect("/sign-in?reason=protected");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-background">
      {/* One-time toast: payment not completed */}
      <PageToast
        type="warning"
        message="Payment cancelled — you were not charged. You can pay anytime from My Bookings."
      />
      <div className="w-full max-w-md mx-auto space-y-8 text-center animate-in fade-in duration-300">
        
        {/* Cancel Icon */}
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-destructive/10 text-destructive border border-destructive/20 shadow-md">
          <XCircle className="h-10 w-10 stroke-[2]" />
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white font-bold text-xs shadow-xs">
            ✕
          </span>
        </div>

        {/* Heading & Notice */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-destructive/20 bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
            <ShieldX className="h-3.5 w-3.5" />
            <span>Transaction Not Completed</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Payment Cancelled
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            You were not charged. Your booking status remains ready for payment whenever you wish to complete it.
          </p>
        </div>

        {/* Info Box */}
        <div className="rounded-2xl border border-border/70 bg-card p-4 text-xs text-muted-foreground text-left space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
            <span>Need to pay later?</span>
          </div>
          <p className="leading-relaxed">
            Your completed booking will stay in your <strong>My Bookings</strong> tab. You can click <strong>Pay Now</strong> at any time to resume checkout with Stripe.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button asChild size="lg" className="w-full sm:w-auto gap-2 font-semibold shadow-xs">
            <Link href="/dashboard/customer/bookings">
              <RotateCcw className="h-4 w-4" />
              Return to My Bookings
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
