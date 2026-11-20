import { CreditCard } from "lucide-react";
import { getAllPaymentsAndRevenue } from "@/lib/api/payment";
import { PaymentRecord } from "@/types";
import { AdminTransactionsClient } from "./_components/admin-transactions-client";

export const metadata = {
  title: "Transactions | FixMate Admin",
  description: "View all payment transactions and total platform revenue.",
};

export default async function AdminTransactionsPage() {
  // Fetch all payment transactions and total revenue server-side
  const response = await getAllPaymentsAndRevenue();
  const transactions: PaymentRecord[] = response?.data?.transactions || [];
  const totalRevenue: number = response?.data?.totalRevenue || 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-border/60 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full mb-2">
          <CreditCard className="h-3.5 w-3.5" />
          Admin Panel
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Platform Transactions
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Complete ledger of Stripe payments, customer receipts, and platform revenue.
        </p>
      </div>

      {/* Interactive Transactions Client Component */}
      <AdminTransactionsClient
        initialTransactions={transactions}
        totalRevenue={totalRevenue}
      />
    </div>
  );
}
