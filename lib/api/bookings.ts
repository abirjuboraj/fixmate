import { AUTH_URL } from "@/types";
import { authFetch } from "../server";

/**
 * GET /api/bookings/my — the logged-in customer's own bookings.
 *
 * NOTE: the backend controller (getMyBookings) is a TODO stub for now and
 * returns []. Once you finish it, the My Bookings page will receive real
 * data through this same function — no frontend change needed.
 */
export const getMyBookings = async () => {
  return await authFetch(`${AUTH_URL}/api/bookings/my`);
};
