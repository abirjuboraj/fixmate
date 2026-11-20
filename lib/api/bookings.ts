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



/**
 * technician bookings
 */

export const getTechnicianBookings = async () => {
  try {
    const res = await authFetch(`${AUTH_URL}/api/bookings/technician`);
    return res;
  } catch (error) {
    console.error("Error fetching technician bookings:", error);
    return { success: false, data: [] };
  }
};


/**
 * get all bookings for admin
 * NOTE: errors are intentionally NOT swallowed here — the admin bookings page
 * catches them and shows a friendly "Could not load bookings" state.
 */

export const getAllBookings = async (status: string = '') => {
  const res = await authFetch(
    `${AUTH_URL}/api/admin/bookings?status=${encodeURIComponent(status)}`
  );
  return res;
}
