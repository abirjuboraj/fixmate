"use server";

import { AUTH_URL, CreateBookingPayload } from "@/types";
import { protectedMutation } from "../server";

// customer replair request
export const createBooking = async (payload: CreateBookingPayload) => {
  const api = `${AUTH_URL}/api/bookings`;
  return protectedMutation(api, "POST", payload);
};

//customer repair request cancel
export const cancelBooking = async (bookingId: string) => {

  console.log(bookingId);

  const api = `${AUTH_URL}/api/bookings/${bookingId}/cancel`;

  return protectedMutation(api, "PATCH");
};

/**
 * Starts Stripe Checkout session for an unpaid completed booking
 * TODO (you): Wire this with your Stripe checkout endpoint (e.g. POST /api/billing/checkout or /api/bookings/:id/pay)
 */
export const initiateBookingPayment = async (bookingId: string) => {
  // TODO: Update the endpoint path below based on your backend payment implementation
  const api = `${AUTH_URL}/api/billing/create-checkout-session`;
  return protectedMutation(api, "POST", { bookingId });
};
