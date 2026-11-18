import { authFetch } from "../server"


// GET /api/admin/users?search=&role=&category= — all users for the admin table.
// Supports optional query params: search (name/email), role, category
// (finds technicians who offer that category). Newest users first.
export const getAllUsers = async (api: string) => {

    const result = await authFetch(api);

    return result;
}
