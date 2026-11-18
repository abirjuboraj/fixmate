import {
  AUTH_URL,
  PublicServicesQueryParams,
  PublicServicesResponse,
} from "@/types";
import { authFetch } from "../server";

/**
 * Technician own services fetcher
 */
export const getTechnicianServices = async (api: string) => {
  const result = await authFetch(api);
  return result;
};

/**
 * Admin all services fetcher
 */
export const getAllServices = async (api: string) => {
  const result = await authFetch(api);
  return result;
};

export const buildPublicServicesUrl = (params: PublicServicesQueryParams = {}) => {
  const baseUrl = AUTH_URL || "http://localhost:5000";
  const url = new URL(`${baseUrl}/api/services`);

  if (params.search?.trim()) {
    url.searchParams.set("search", params.search.trim());
  }

  if (params.category && params.category !== "All") {
    url.searchParams.set("category", params.category);
  }

  if (params.serviceMode && params.serviceMode !== "All") {
    url.searchParams.set("serviceMode", params.serviceMode);
  }

  if (params.sort) {
    url.searchParams.set("sort", params.sort);
  }

  if (params.limit && params.limit > 0) {
    url.searchParams.set("limit", String(params.limit));
  }


  return url.toString();
};


export const getAllPublicServices = async (
  params: PublicServicesQueryParams = {}
): Promise<PublicServicesResponse> => {
  const apiUrl = buildPublicServicesUrl(params);

  try {
    const res = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(
        errorData?.message || `Failed to fetch services (HTTP ${res.status})`
      );
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "Services fetched successfully",
      data: Array.isArray(data.data) ? data.data : [],
    };
  } catch (err: unknown) {
    console.error("Public services fetch error:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Failed to fetch services",
      data: [],
    };
  }
};

// service details page (public)

export const getPublicServiceDetails = async (id: string) => {
  const res = await fetch(`${AUTH_URL}/api/services/${id}`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(
      errorData?.message || `Failed to fetch service (HTTP ${res.status})`
    );
  }

  const data = await res.json();
  return data;
}
