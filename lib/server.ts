  "use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"
import { auth } from "./auth"


export const getSession = cache(async () => {

    const session = await auth.api.getSession(
        {
            headers: await headers()
        }
    )

    return session
})

export const getToken = async (): Promise<string> => {
   const jwtToken = await auth.api.getToken({
    headers: await headers(),
   });

   return jwtToken?.token;
}

export const authFetch = async (api: string) => {
    const token = await getToken();
    const res = await fetch(api, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    if (res.status === 401 || res.status === 403) {
        redirect(`/unauthorized?status=${res.status}`);
    }

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message ?? `Request failed with status ${res.status}`);
    }

    

    return res.json();
}

export const protectedMutation = async (api: string, method: string, data?: unknown) => {

    const token = await getToken();

    const res = await fetch(api, {
        method: method,
        headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: data ? JSON.stringify(data) : null
    })

    if (res.status === 401 || res.status === 403) {
        redirect(`/unauthorized?status=${res.status}`);
    }

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        return {
            success: false,
            statusCode: res.status,
            message: errorData?.message ?? `Request failed with status ${res.status}`,
        };
    }

    return res.json();
}

export const requireRole = async (role: string) => {
    const session = await getSession();

    if (!session) {
        redirect("/unauthorized?status=401");
    }

    if (session.user.role !== role) {
        redirect("/unauthorized?status=403");
    }

    return session;
}