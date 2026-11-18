
export const AUTH_URL = process.env.NEXT_PUBLIC_API_URL;



export type UserRole = "customer" | "technician" | "admin";

export interface CustomUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: UserRole;
  phone?: string | null;
  area?: string | null;
  bio?: string | null;
  emailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: UserRole;
  phone?: string | null;
  createdAt?: string;
}

/** The roles an admin can assign to a user. */
export const ASSIGNABLE_ROLES: UserRole[] = ["customer", "technician", "admin"];


export interface MenuItem {
  title: string;
  href: string;
  iconName: string;
  badge?: string;
}

export interface NavLinkItem {
  label: string;
  href: string;
}

export const SERVICE_CATEGORIES = [
  "Smartphone",
  "Laptop & PC",
  "AC",
  "Refrigerator",
  "TV",
  "Washing Machine",
  "Electrical",
] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

export const SERVICE_MODES = ["Home Visit", "Shop Drop-off"] as const;

export type ServiceMode = (typeof SERVICE_MODES)[number];

export type ServiceApprovalStatus = "pending" | "approved" | "rejected";

export interface ServiceItem {
  _id?: string;
  title: string;
  category: ServiceCategory | string;
  description: string;
  image: string;
  basePrice: number;
  estimatedDuration: string;
  serviceMode: ServiceMode | string;
  serviceArea: string;
  technicianName?: string;
  technicianEmail?: string;
  approvalStatus: ServiceApprovalStatus;
  isAvailable: boolean;
  createdAt?: Date;
}

export interface AddServicePayload {
  title: string;
  category: string;
  serviceMode: string;
  basePrice: number;
  estimatedDuration: string;
  serviceArea: string;
  description: string;
  image: string;
  approvalStatus: ServiceApprovalStatus;
  isAvailable: boolean;
}

export interface UpdateServicePayload {
  title: string;
  category: string;
  serviceMode: string;
  basePrice: number;
  estimatedDuration: string;
  serviceArea: string;
  description: string;
  image: string;
}

export type BookingStatus =
  | "requested"
  | "accepted"
  | "in-progress"
  | "completed"
  | "rejected"
  | "cancelled";

export type PaymentStatus = "unpaid" | "paid";

export interface BookingItem {
  _id?: string;
  serviceId: string;
  serviceTitle: string;
  serviceImage: string;
  category: string;
  basePrice: number;
  technicianName: string;
  technicianEmail: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  preferredDate: Date | string;
  problemDescription: string;
  status: BookingStatus;
  finalAmount?: number;
  paymentStatus: PaymentStatus;
  createdAt?: Date;
}


export interface PaymentRecord {
  _id?: string;
  bookingId: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  technicianName: string;
  technicianEmail: string;
  amount: number;
  currency: string;
  transactionId: string;
  stripeSessionId: string;
  paymentStatus: "paid";
  paidAt: Date | string;
}
