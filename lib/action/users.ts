"use server";

import { AUTH_URL, UserRole } from "@/types"
import { protectedMutation } from "../server";


export const updateUserRole = async (userId: string, role: UserRole) => {

    const api = `${AUTH_URL}/api/admin/users/${userId}/role`;

    return protectedMutation(api, "PATCH", { role });
}
