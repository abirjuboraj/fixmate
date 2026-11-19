import { redirect } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  CalendarDays,
  DollarSign,
  User,
  Wrench,
  Receipt,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/server";
import { verifyStripeSession } from "@/lib/api/payment";
import { PaymentRecord } from "@/types";

export const metadata = {
  title: "Payment Successful | FixMate",
  description: "Your repair service payment was processed successfully.",
};

interface PaymentSuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}


export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  // 1. Verify user is logged in
  const session = await getSession();
  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const { session_id } = await searchParams;

  // 2. If no session_id in query, redirect to customer dashboard
  if (!session_id) {
    redirect("/dashboard/customer/bookings");
  }

  // 3. Verify payment on backend (saves payment document and updates booking status)
  const result = await verifyStripeSession(session_id);
  const payment: PaymentRecord | null = result?.data?.payment || null;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-background">
      <div className="w-full max-w-lg mx-auto space-y-8 text-center animate-in fade-in duration-300">

        {/* Success Icon */}
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-md">
          <CheckCircle2 className="h-10 w-10 stroke-[2]" />
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white font-bold text-xs shadow-xs">
            ✓
          </span>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Stripe Payment Confirmed</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Payment Completed!
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Thank you! Your payment has been received and verified. The repair booking is now fully closed.
          </p>
        </div>

        {/* Receipt Summary Card */}
        {payment && (
          <div className="rounded-2xl border border-border/70 bg-card p-5 text-left space-y-3.5 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Receipt className="h-3.5 w-3.5 text-primary" />
                Payment Receipt
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                Paid
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Service</span>
                <span className="font-semibold text-foreground truncate max-w-[220px]">
                  {payment.serviceTitle}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Technician</span>
                <span className="font-medium text-foreground">
                  {payment.technicianName}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-extrabold text-foreground text-sm">
                  ${payment.amount?.toFixed(2)} {payment.currency?.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-mono text-[11px] text-muted-foreground truncate max-w-[200px]" title={payment.transactionId}>
                  {payment.transactionId}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="text-muted-foreground">
                  {new Date(payment.paidAt || Date.now()).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button asChild size="lg" className="w-full sm:w-auto gap-2 font-semibold shadow-xs">
            <Link href="/dashboard/customer/bookings">
              View My Bookings
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/services">Browse More Services</Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
