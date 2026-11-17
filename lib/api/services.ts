import { authFetch } from "../server"


export const getTechnicianServices = async (api: string) => {
    const result = await authFetch(api);

    console.log(result);

    return result;
}
