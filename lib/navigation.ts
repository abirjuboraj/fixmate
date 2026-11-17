import { MenuItem, UserRole } from "@/types";

export const DASHBOARD_MENUS: Record<UserRole, MenuItem[]> = {
  customer: [
    {
      title: "Overview",
      href: "/dashboard/customer",
      iconName: "LayoutDashboard",
    },
    {
      title: "My Bookings",
      href: "/dashboard/customer/bookings",
      iconName: "CalendarClock",
    },
    {
      title: "Payment History",
      href: "/dashboard/customer/payments",
      iconName: "CreditCard",
    },
    {
      title: "Update Profile",
      href: "/dashboard/profile",
      iconName: "UserCog",
    },
  ],
  technician: [
    {
      title: "Overview",
      href: "/dashboard/technician",
      iconName: "LayoutDashboard",
    },
    {
      title: "Add Service",
      href: "/dashboard/technician/add-service",
      iconName: "PlusCircle",
    },
    {
      title: "My Services",
      href: "/dashboard/technician/my-services",
      iconName: "Wrench",
    },
    {
      title: "Manage Requests",
      href: "/dashboard/technician/requests",
      iconName: "ClipboardList",
    },
    {
      title: "Update Profile",
      href: "/dashboard/profile",
      iconName: "UserCog",
    },
  ],
  admin: [
    {
      title: "Overview",
      href: "/dashboard/admin",
      iconName: "LayoutDashboard",
    },
    {
      title: "Manage Users",
      href: "/dashboard/admin/users",
      iconName: "Users",
    },
    {
      title: "Service Approval",
      href: "/dashboard/admin/services",
      iconName: "CheckCircle2",
    },
    {
      title: "All Bookings",
      href: "/dashboard/admin/bookings",
      iconName: "CalendarCheck2",
    },
    {
      title: "Transactions",
      href: "/dashboard/admin/transactions",
      iconName: "ReceiptText",
    },
    {
      title: "Update Profile",
      href: "/dashboard/profile",
      iconName: "UserCog",
    },
  ],
};

export const ROLE_DEFAULT_ROUTES: Record<UserRole, string> = {
  customer: "/dashboard/customer",
  technician: "/dashboard/technician",
  admin: "/dashboard/admin",
};
