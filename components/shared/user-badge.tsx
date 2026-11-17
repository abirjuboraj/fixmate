import { ShieldCheck, Wrench, UserCheck } from "lucide-react";
import React from "react";
import { UserRole } from "@/types";

export function getRoleBadgeStyle(role: UserRole) {
  switch (role) {
    case "admin":
      return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
    case "technician":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    default:
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
  }
}

export function formatRoleLabel(role: UserRole) {
  switch (role) {
    case "admin":
      return "Admin";
    case "technician":
      return "Technician";
    default:
      return "Customer";
  }
}

export function getUserInitials(name?: string) {
  if (!name) return "FM";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function renderRoleIcon(role: UserRole) {
  switch (role) {
    case "admin":
      return <ShieldCheck className="h-3 w-3 mr-1 text-rose-500" />;
    case "technician":
      return <Wrench className="h-3 w-3 mr-1 text-amber-500" />;
    default:
      return <UserCheck className="h-3 w-3 mr-1 text-blue-500" />;
  }
}
