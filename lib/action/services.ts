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


// DELETE /api/services/:id — delete a service
export const deleteService = async (serviceId: string) => {

    const api = `${AUTH_URL}/api/services/${serviceId}`;

    return protectedMutation(api, "DELETE");

}
