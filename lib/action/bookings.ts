"use server";

import { AUTH_URL, CreateBookingPayload } from "@/types";
import { protectedMutation } from "../server";


export const createBooking = async (payload: CreateBookingPayload) => {
  const api = `${AUTH_URL}/api/bookings`;

  return protectedMutation(api, "POST", payload);
};
