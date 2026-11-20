"use client";

import { useState } from "react";
import {
  CreditCard,
  DollarSign,
  Receipt,
  User,
  Wrench,
  CalendarDays,
  Check,
  Copy,
  TrendingUp,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PaymentRecord } from "@/types";
import { toast } from "sonner";

interface AdminTransactionsClientProps {
  initialTransactions: PaymentRecord[];
  totalRevenue: number;
}

/**
 * Reusable Copy Button with Tooltip and Sonner Toast
 * Demonstrates clean, beginner-friendly clipboard interaction in React.
 */
function CopyTransactionIdButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Transaction ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy Transaction ID");
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
            aria-label="Copy Transaction ID"
          />
        }
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>{copied ? "Copied!" : "Copy Transaction ID"}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function AdminTransactionsClient({
  initialTransactions,
  totalRevenue,
}: AdminTransactionsClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Simple client-side search across customer, technician, service title, and transaction ID
  const filteredTransactions = initialTransactions.filter((item) => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return true;

    return (
      item.customerName?.toLowerCase().includes(query) ||
      item.customerEmail?.toLowerCase().includes(query) ||
      item.technicianName?.toLowerCase().includes(query) ||
      item.technicianEmail?.toLowerCase().includes(query) ||
      item.serviceTitle?.toLowerCase().includes(query)
    );
  });

  return (
    <TooltipProvider delay={150}>
      <div className="space-y-6">
        {/* Metric / Stat Card - Total Revenue */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Total Revenue
              </span>
              <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-foreground tracking-tight">
                ${Number(totalRevenue || 0).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              Accumulated from all confirmed repair payments
            </p>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Total Transactions
              </span>
              <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Receipt className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-3xl font-extrabold text-foreground tracking-tight">
                {initialTransactions.length}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Processed through Stripe payments
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer, technician, service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 text-sm rounded-xl"
            />
          </div>
          <div className="text-xs text-muted-foreground self-end sm:self-center">
            Showing <strong className="text-foreground">{filteredTransactions.length}</strong> of{" "}
            {initialTransactions.length} transactions
          </div>
        </div>

        {/* Empty State */}
        {filteredTransactions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/80 bg-card/40 p-12 text-center max-w-md mx-auto space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground">
              <Receipt className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-foreground">
              {searchTerm ? "No matching transactions" : "No transactions yet"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {searchTerm
                ? "Try searching with a different name, email, or service title."
                : "When customers complete repairs and pay with Stripe, transactions will appear here."}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block rounded-2xl border border-border/70 bg-card shadow-xs overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead className="w-[180px]">Customer</TableHead>
                    <TableHead className="w-[180px]">Technician</TableHead>
                    <TableHead className="w-[200px]">Service</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="w-[240px]">Transaction ID</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((tx) => (
                    <TableRow key={tx._id || tx.stripeSessionId}>
                      {/* Customer */}
                      <TableCell>
                        <div className="space-y-0.5">
                          <div className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <span className="truncate max-w-[140px]">{tx.customerName}</span>
                          </div>
                          <div className="text-xs text-muted-foreground truncate max-w-[150px]">
                            {tx.customerEmail}
                          </div>
                        </div>
                      </TableCell>

                      {/* Technician */}
                      <TableCell>
                        <div className="space-y-0.5">
                          <div className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                            <Wrench className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <span className="truncate max-w-[140px]">{tx.technicianName}</span>
                          </div>
                          <div className="text-xs text-muted-foreground truncate max-w-[150px]">
                            {tx.technicianEmail || "—"}
                          </div>
                        </div>
                      </TableCell>

                      {/* Service */}
                      <TableCell>
                        <div className="font-medium text-foreground text-sm truncate max-w-[190px]">
                          {tx.serviceTitle}
                        </div>
                      </TableCell>

                      {/* Amount */}
                      <TableCell>
                        <span className="font-bold text-foreground text-sm">
                          ${tx.amount?.toFixed(2)}
                        </span>
                      </TableCell>

                      {/* Transaction ID with Copy Button */}
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="font-mono text-xs text-muted-foreground truncate max-w-[160px] bg-muted/50 px-2 py-1 rounded-md"
                            title={tx.transactionId}
                          >
                            {tx.transactionId}
                          </span>
                          <CopyTransactionIdButton text={tx.transactionId} />
                        </div>
                      </TableCell>

                      {/* Payment Date */}
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>
                            {new Date(tx.paidAt || Date.now()).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs"
                        >
                          Paid
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile / Tablet Cards View */}
            <div className="lg:hidden space-y-3">
              {filteredTransactions.map((tx) => (
                <div
                  key={tx._id || tx.stripeSessionId}
                  className="rounded-2xl border border-border/80 bg-card p-4 shadow-xs space-y-3"
                >
                  {/* Top: Service title & Status */}
                  <div className="flex items-start justify-between gap-2 border-b border-border/60 pb-2.5">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wide block">
                        Service
                      </span>
                      <h4 className="font-bold text-foreground text-sm">
                        {tx.serviceTitle}
                      </h4>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs"
                    >
                      Paid
                    </Badge>
                  </div>

                  {/* Customer & Technician */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground text-[11px] block">Customer</span>
                      <span className="font-semibold text-foreground">{tx.customerName}</span>
                      <span className="text-muted-foreground text-[10px] block truncate">
                        {tx.customerEmail}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[11px] block">Technician</span>
                      <span className="font-semibold text-foreground">{tx.technicianName}</span>
                      <span className="text-muted-foreground text-[10px] block truncate">
                        {tx.technicianEmail || "—"}
                      </span>
                    </div>
                  </div>

                  {/* Amount & Date */}
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-border/40">
                    <div>
                      <span className="text-muted-foreground text-[11px] block">Amount</span>
                      <span className="font-extrabold text-foreground text-sm">
                        ${tx.amount?.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-muted-foreground text-[11px] block">Date</span>
                      <span className="text-muted-foreground">
                        {new Date(tx.paidAt || Date.now()).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Transaction ID with Copy */}
                  <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs bg-muted/30 p-2 rounded-xl">
                    <div className="space-y-0.5 truncate pr-2">
                      <span className="text-[10px] text-muted-foreground uppercase font-semibold block">
                        Transaction ID
                      </span>
                      <span className="font-mono text-xs text-foreground truncate block">
                        {tx.transactionId}
                      </span>
                    </div>
                    <CopyTransactionIdButton text={tx.transactionId} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </TooltipProvider>
  );
}
