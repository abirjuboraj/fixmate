
import { authFetch } from "../server"


export const getTechnicianServices = async (api: string) => {
    const result = await authFetch(api);


    return result;
}


export const getAllServices = async(api: string) => {
    const result = await authFetch(api);
    return result;
}
