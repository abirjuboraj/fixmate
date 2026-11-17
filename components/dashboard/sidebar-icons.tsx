import React from "react";
import {
  LayoutDashboard,
  CalendarClock,
  CreditCard,
  UserCog,
  PlusCircle,
  Wrench,
  ClipboardList,
  Users,
  CheckCircle2,
  CalendarCheck2,
  ReceiptText,
  LucideIcon,
} from "lucide-react";

export function getSidebarIcon(iconName: string): LucideIcon {
  switch (iconName) {
    case "LayoutDashboard":
      return LayoutDashboard;
    case "CalendarClock":
      return CalendarClock;
    case "CreditCard":
      return CreditCard;
    case "UserCog":
      return UserCog;
    case "PlusCircle":
      return PlusCircle;
    case "Wrench":
      return Wrench;
    case "ClipboardList":
      return ClipboardList;
    case "Users":
      return Users;
    case "CheckCircle2":
      return CheckCircle2;
    case "CalendarCheck2":
      return CalendarCheck2;
    case "ReceiptText":
      return ReceiptText;
    default:
      return LayoutDashboard;
  }
}
