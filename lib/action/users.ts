"use server";

import { AUTH_URL, UserRole } from "@/types"
import { protectedMutation } from "../server";


// PATCH /api/admin/users/:id/role — admin changes a user's role.
//
// TODO (backend, you): this endpoint does NOT exist yet.
// Follow the step-by-step TODO inside fixmate-server/controllers/users.controller.js:
//   1. models/users.model.js  -> add updateUserRoleById
//   2. controllers/users.controller.js -> add updateUserRole
//      (validate role, block the admin from changing their OWN role)
//   3. routes/users.routes.js -> router.patch("/:id/role", verifyToken, verifyAdmin, updateUserRole)
//
// Until that endpoint exists, this action will throw and the UI
// simply shows an error toast — no other frontend changes are needed
// once the backend is live.
export const updateUserRole = async (userId: string, role: UserRole) => {

    const api = `${AUTH_URL}/api/admin/users/${userId}/role`;

    return protectedMutation(api, "PATCH", { role });
}
