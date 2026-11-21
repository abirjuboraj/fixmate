import { redirect } from "next/navigation";
import Link from "next/link";
import {
  CreditCard,
  Receipt,
  CalendarDays,
  DollarSign,
  User,
  Wrench,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSession } from "@/lib/server";
import { getMyPayments } from "@/lib/api/payment";
import { PaymentRecord } from "@/types";

export const metadata = {
  title: "Payment History | FixMate Customer Portal",
  description: "View all your completed repair transactions and payment receipts.",
};

export default async function CustomerPaymentsPage() {
  const session = await getSession();
  if (!session || !session.user) {
    redirect("/sign-in?reason=protected");
  }

  const result = await getMyPayments();
  const payments: PaymentRecord[] = result?.data || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-border/60 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full mb-2">
          <CreditCard className="h-3.5 w-3.5" />
          Customer Hub
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Payment History
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review all confirmed Stripe transactions and receipts for completed repair services.
        </p>
      </div>

      {/* Empty State */}
      {payments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/80 bg-card/40 p-12 text-center max-w-xl mx-auto space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground">
            <Receipt className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-foreground">
              No Payment Records Yet
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              When you pay for a completed repair service via Stripe, your verified receipts will appear here automatically.
            </p>
          </div>
          <Button asChild size="default" className="gap-2 font-semibold shadow-xs">
            <Link href="/dashboard/customer/bookings">
              Check My Bookings
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block rounded-2xl border border-border/70 bg-card shadow-xs overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="w-[240px]">Service Title</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((p) => (
                  <TableRow key={p._id || p.stripeSessionId}>
                    <TableCell>
                      <div className="font-semibold text-foreground text-sm truncate max-w-[220px]">
                        {p.serviceTitle}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
                        <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="truncate max-w-[130px]">{p.technicianName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-foreground text-sm">
                        ${p.amount?.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className="font-mono text-xs text-muted-foreground truncate block max-w-[180px]"
                        title={p.transactionId}
                      >
                        {p.transactionId}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>
                          {new Date(p.paidAt || Date.now()).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="outline"
                        className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs gap-1"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        Paid
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards View */}
          <div className="md:hidden space-y-4">
            {payments.map((p) => (
              <div
                key={p._id || p.stripeSessionId}
                className="rounded-2xl border border-border/80 bg-card p-4 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2 border-b border-border/60 pb-2.5">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wide">
                      Service
                    </span>
                    <h4 className="font-bold text-foreground text-sm">
                      {p.serviceTitle}
                    </h4>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs gap-1"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    Paid
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground text-[11px] block">
                      Technician
                    </span>
                    <span className="font-medium text-foreground">{p.technicianName}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-[11px] block">
                      Amount Paid
                    </span>
                    <span className="font-extrabold text-foreground text-sm">
                      ${p.amount?.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-muted-foreground border-t border-border/50 pt-2 space-y-1">
                  <p className="truncate">
                    <strong>Transaction:</strong> {p.transactionId}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(p.paidAt || Date.now()).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
