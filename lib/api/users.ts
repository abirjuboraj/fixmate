import { authFetch } from "../server"

export const getAllUsers = async (api: string) => {

    const result = await authFetch(api);

    return result;
}
