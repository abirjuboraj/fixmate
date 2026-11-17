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

export interface MenuItem {
  title: string;
  href: string;
  iconName: string;
  badge?: string;
}
