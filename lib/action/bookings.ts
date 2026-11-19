"use server";

import { AUTH_URL, CreateBookingPayload } from "@/types";
import { protectedMutation } from "../server";

/**
 * Customer repair request
 */
export const createBooking = async (payload: CreateBookingPayload) => {
  const api = `${AUTH_URL}/api/bookings`;
  return protectedMutation(api, "POST", payload);
};

/**
 * Customer repair request cancel
 */
export const cancelBooking = async (bookingId: string) => {
  const api = `${AUTH_URL}/api/bookings/${bookingId}/cancel`;
  return protectedMutation(api, "PATCH");
};

/**
 * Update booking status by technician
 */
export const updateBookingStatus = async (
  bookingId: string,
  status: "accepted" | "rejected" | "in-progress" | "completed",
  finalAmount?: number
) => {
  const api = `${AUTH_URL}/api/bookings/${bookingId}/status`;
  return protectedMutation(api, "PATCH", { status, finalAmount });
};

/**
 * Initiates Stripe Checkout session for a completed repair booking
 */
export const initiateBookingPayment = async (bookingId: string) => {
  const api = `${AUTH_URL}/api/payment/create-checkout-session`;
  return protectedMutation(api, "POST", { bookingId });
};
