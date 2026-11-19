import { AUTH_URL } from "@/types";
import { authFetch } from "../server";

/**
 * Fetches all bookings belonging to the currently authenticated customer.
 */
export const getMyBookings = async () => {
  try {
    const res = await authFetch(`${AUTH_URL}/api/bookings/own`);
    return res;
  } catch (error) {
    console.error("Error fetching customer bookings:", error);
    return { success: false, data: [] };
  }
};
