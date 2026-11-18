"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  RotateCcw,
  KeyRound,
  ShieldAlert,
  SearchX,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { toast } from "@/components/ui/toast";
import {
  getRoleBadgeStyle,
  formatRoleLabel,
  getUserInitials,
} from "@/components/shared/user-badge";
import { SERVICE_CATEGORIES, ASSIGNABLE_ROLES } from "@/types";
import type { AdminUser, UserRole } from "@/types";
import { updateUserRole } from "@/lib/action/users";
import { ConfirmRoleModal } from "./confirm-role-modal";

interface AdminUsersViewProps {
  users: AdminUser[];
  fetchError: string | null;
  currentSearch: string;
  currentRole: string;
  currentCategory: string;
  adminEmail: string;
}


// Small helper: "2026-11-18T..." -> "Nov 18, 2026"
const formatDate = (iso?: string) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};


export function AdminUsersView({
  users,
  fetchError,
  currentSearch,
  currentRole,
  currentCategory,
  adminEmail,
}: AdminUsersViewProps) {
  const router = useRouter();

  // The role change waiting for the admin to confirm (null = modal closed)
  const [roleTarget, setRoleTarget] = useState<{
    user: AdminUser;
    newRole: UserRole;
  } | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Search input state: lets the table search live while the user types
  const [searchInput, setSearchInput] = useState(currentSearch);

  // Debounce timer: we wait a moment after the LAST keystroke before
  // triggering the search, so we don't re-fetch on every single letter.
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stop the pending timer if the user leaves the page
  useEffect(() => {
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, []);


  const updateParams = (updates: {
    search?: string;
    role?: string;
    category?: string;
  }) => {
    const merged = {
      search: currentSearch,
      role: currentRole,
      category: currentCategory,
      ...updates,
    };

    const params = new URLSearchParams();
    if (merged.search) params.set("search", merged.search);
    if (merged.role && merged.role !== "all") params.set("role", merged.role);
    if (merged.category && merged.category !== "all")
      params.set("category", merged.category);

    const qs = params.toString();
    router.push(qs ? `/dashboard/admin/users?${qs}` : "/dashboard/admin/users");
  };

  // Live search: runs 400ms after the user stops typing (no button needed)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);

    // Restart the wait timer on every keystroke
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      // Only search when the text actually changed
      if (value !== currentSearch) updateParams({ search: value });
    }, 400);
  };

  const resetFilters = () => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    setSearchInput("");
    router.push("/dashboard/admin/users");
  };


  // ---------- Role change ----------

  // TODO (works after you finish the backend TODO): the Select below opens this
  // confirm modal, and handleRoleChange calls the protected admin API
  // PATCH /api/admin/users/:id/role. Until that endpoint exists the UI shows
  // an error toast — nothing else needs to change on the frontend.
  const handleRoleChange = async () => {
    if (!roleTarget) return;

    setIsUpdating(true);

    try {
      const result = await updateUserRole(roleTarget.user._id, roleTarget.newRole);

      if (!result?.success) {
        throw new Error(result?.message || "Failed to update role");
      }

      toast.add({
        title: "Role updated",
        description: `${roleTarget.user.name} is now ${formatRoleLabel(roleTarget.newRole)}.`,
        type: "success",
      });

      setRoleTarget(null);

      // Re-fetch fresh data from the server
      router.refresh();
    } catch (error) {
      toast.add({
        title: "Could not update role",
        description:
          error instanceof Error
            ? error.message
            : "Make sure the admin role API is implemented, then try again.",
        type: "error",
      });
    } finally {
      setIsUpdating(false);
    }
  };


  // ---------- Error state (backend unreachable etc.) ----------

  if (fetchError) {
    return (
      <div className="rounded-xl border border-border bg-card p-10 text-center">
        <ShieldAlert className="h-10 w-10 mx-auto text-destructive" />
        <h3 className="mt-4 font-semibold text-foreground">
          Failed to load users
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{fetchError}</p>
        <Button
          variant="outline"
          onClick={() => router.refresh()}
          className="mt-4 gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Try again
        </Button>
      </div>
    );
  }


  const hasFilters = Boolean(currentSearch || currentRole || currentCategory);

  // The row control shown for changing a role (used in both table and cards).

  const renderRoleSelect = (user: AdminUser) => {
    const isSelf = user.email === adminEmail;

    return (
      <Select
        value={user.role || "customer"}
        onValueChange={(value) => {
          // Picking the same role again = nothing changed, so don't
          // open the confirmation modal at all.
          if (!value || value === (user.role || "customer")) return;
          setRoleTarget({ user, newRole: value as UserRole });
        }}
        disabled={isSelf}
      >
        <SelectTrigger
          size="sm"
          className="w-32.5"
          title={isSelf ? "You cannot change your own role" : undefined}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ASSIGNABLE_ROLES.map((role) => (
            <SelectItem key={role} value={role}>
              {formatRoleLabel(role)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };


  return (
    <div className="space-y-4">
      {/* ---------- Search + filters bar ---------- */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 md:flex-row md:items-center">
        {/* Search by name or email — searches live as you type */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search by name or email..."
            className="pl-9"
          />
        </div>

        {/* Filter by role */}
        <div className="flex gap-2 items-center">
          <Select
            value={currentRole || "all"}
            onValueChange={(value) =>
              updateParams({ role: value === "all" ? "" : value ?? "" })
            }
          >
            <SelectTrigger className="w-full md:w-37.5">
              <SelectValue placeholder="All roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              {ASSIGNABLE_ROLES.map((role) => (
                <SelectItem key={role} value={role}>
                  {formatRoleLabel(role)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filter by service category (finds technicians offering it) */}
          <Select
            value={currentCategory || "all"}
            onValueChange={(value) =>
              updateParams({ category: value === "all" ? "" : value ?? "" })
            }
          >
            <SelectTrigger className="w-full md:w-47.5">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {SERVICE_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Result count + reset */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          <span className="font-semibold text-foreground">{users.length}</span>{" "}
          user{users.length === 1 ? "" : "s"} found
          {currentCategory && (
            <span className="hidden sm:inline">
              {" "}
              (technicians offering &quot;{currentCategory}&quot;)
            </span>
          )}
        </p>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
        )}
      </div>

      {/* ---------- Empty state ---------- */}
      {users.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
          <SearchX className="h-10 w-10 mx-auto text-muted-foreground" />
          <h3 className="mt-4 font-semibold text-foreground">No users found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            No users match your search or filters.
          </p>
          {hasFilters && (
            <Button variant="outline" onClick={resetFilters} className="mt-4 gap-2">
              <RotateCcw className="h-4 w-4" />
              Clear search &amp; filters
            </Button>
          )}
        </div>
      ) : (
        <>
          {/* ---------- Desktop: table ---------- */}
          <div className="hidden md:block rounded-xl border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Change Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  const isSelf = user.email === adminEmail;

                  return (
                    <TableRow key={user._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            {user.image && (
                              <AvatarImage
                                src={user.image || undefined}
                                alt={user.name}
                              />
                            )}
                            <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
                              {getUserInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-foreground">
                            {user.name}
                            {isSelf && (
                              <Badge
                                variant="outline"
                                className="ml-2 text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-primary/20"
                              >
                                You
                              </Badge>
                            )}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getRoleBadgeStyle((user.role || "customer") as UserRole)}
                        >
                          {formatRoleLabel((user.role || "customer") as UserRole)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(user.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        {/* justify-end keeps the select aligned with the
                            right-aligned "Change Role" column header */}
                        <div className="flex justify-end">
                          {renderRoleSelect(user)}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* ---------- Mobile: cards ---------- */}
          <div className="md:hidden space-y-3">
            {users.map((user) => {
              const isSelf = user.email === adminEmail;

              return (
                <div
                  key={user._id}
                  className="rounded-xl border border-border bg-card p-4 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                      {user.image && (
                        <AvatarImage
                          src={user.image || undefined}
                          alt={user.name}
                        />
                      )}
                      <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
                        {getUserInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground truncate">
                        {user.name}
                        {isSelf && (
                          <Badge
                            variant="outline"
                            className="ml-2 text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-primary/20"
                          >
                            You
                          </Badge>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs">
                    <Badge
                      variant="outline"
                      className={getRoleBadgeStyle((user.role || "customer") as UserRole)}
                    >
                      {formatRoleLabel((user.role || "customer") as UserRole)}
                    </Badge>
                    <span className="text-muted-foreground">
                      Joined {formatDate(user.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-1 border-t border-border/60">
                    <KeyRound className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground flex-1">
                      {isSelf ? "Your own role (locked)" : "Change role"}
                    </span>
                    {renderRoleSelect(user)}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ---------- Confirm before changing a role ---------- */}
      {roleTarget && (
        <ConfirmRoleModal
          userName={roleTarget.user.name}
          currentRole={roleTarget.user.role || "customer"}
          newRole={roleTarget.newRole}
          isUpdating={isUpdating}
          onConfirm={handleRoleChange}
          onClose={() => setRoleTarget(null)}
        />
      )}
    </div>
  );
}
