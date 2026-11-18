"use server";

import { AUTH_URL } from "@/types";
import { protectedMutation } from "../server";

export interface UpdateProfilePayload {
  name: string;
  phone?: string;
  area?: string;
  bio?: string;
  image?: string;
}

export const updateUserProfile = async (payload: UpdateProfilePayload) => {
  const api = `${AUTH_URL}/api/user/profile`;

  return protectedMutation(api, "PATCH", payload);
};
