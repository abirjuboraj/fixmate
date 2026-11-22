import { unstable_rethrow } from "next/navigation";
import { AUTH_URL, PaymentRecord } from "@/types";
import { authFetch } from "../server";

/**
 * Verifies a Stripe Checkout Session on the success page (non-webhook flow).
 * Records payment in DB and updates booking status to 'paid'.
 */
export const verifyStripeSession = async (sessionId: string) => {
  try {
    const res = await authFetch(
      `${AUTH_URL}/api/payment/verify-session?session_id=${encodeURIComponent(sessionId)}`
    );
    return res;
  } catch (error) {
    unstable_rethrow(error);
    console.error("Payment session verification error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Verification failed",
    };
  }
};

/**
 * Fetches the logged-in customer's payment history.
 */
export const getMyPayments = async (): Promise<{
  success: boolean;
  data: PaymentRecord[];
}> => {
  try {
    const res = await authFetch(`${AUTH_URL}/api/payment/my-payments`);
    return res;
  } catch (error) {
    unstable_rethrow(error);
    console.error("Fetch payment history error:", error);
    return { success: false, data: [] };
  }
};


/**
 * all payment for admin panel
 */
export const getAllPaymentsAndRevenue = async () => {
  try {
    const res = await authFetch(
      `${AUTH_URL}/api/admin/transactions`
    );

    return res;
  } catch (error) {
    unstable_rethrow(error);
    console.error("Fetch payment history error:", error);

    return {
      success: false,
      data: {
        transactions: [],
        totalRevenue: 0,
      },
    };
  }
};