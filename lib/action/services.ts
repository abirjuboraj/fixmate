"use server";

import { AddServicePayload, UpdateServicePayload, AUTH_URL } from "@/types"
import { protectedMutation } from "../server";


export const addService = async (servicePayload: AddServicePayload) => {

    const api = `${AUTH_URL}/api/services`;

    return protectedMutation(api, "POST", servicePayload);

}


export const updateService = async (serviceId: string, servicePayload: UpdateServicePayload) => {

    const api = `${AUTH_URL}/api/services/${serviceId}`;

    return protectedMutation(api, "PATCH", servicePayload);

}

// availability toggle --> /api/services/:id/availability

export const toggleServiceAvailability = async (serviceId: string, isAvailable: boolean) => {

    const api = `${AUTH_URL}/api/services/${serviceId}/availability`;

    return protectedMutation(api, "PATCH", { isAvailable });

}

export const updateServiceApproval = async (
    serviceId: string,
    approvalStatus: "approved" | "rejected"
) => {

    const api = `${AUTH_URL}/api/admin/services/${serviceId}/approval`;

    return protectedMutation(api, "PATCH", { approvalStatus });

}


// DELETE /api/services/:id — delete a service
export const deleteService = async (serviceId: string) => {

    const api = `${AUTH_URL}/api/services/${serviceId}`;

    return protectedMutation(api, "DELETE");

}
