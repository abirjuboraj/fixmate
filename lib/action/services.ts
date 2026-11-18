"use server";

import { AddServicePayload, UpdateServicePayload, AUTH_URL } from "@/types"
import { protectedMutation } from "../server";


// POST /api/services — add a new service (starts as "pending")
export const addService = async (servicePayload: AddServicePayload) => {

    const api = `${AUTH_URL}/api/services`;

    return protectedMutation(api, "POST", servicePayload);

}


// PATCH /api/services/:id — edit a service
// The backend sets approvalStatus back to "pending" after every edit.
export const updateService = async (serviceId: string, servicePayload: UpdateServicePayload) => {

    const api = `${AUTH_URL}/api/services/${serviceId}`;

    return protectedMutation(api, "PATCH", servicePayload);

}

// availability toggle --> /api/services/:id/availability

export const toggleServiceAvailability = async (serviceId: string, isAvailable: boolean) => {

    const api = `${AUTH_URL}/api/services/${serviceId}/availability`;

    return protectedMutation(api, "PATCH", { isAvailable });

}


// PATCH /api/admin/services/:id/approval — admin approves or rejects a service.
// approvalStatus can only be "approved" or "rejected" (the backend rejects anything else).
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
