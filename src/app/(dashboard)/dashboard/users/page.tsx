"use client";

import getUsers from "@/actions/getUsers";
import deleteUser from "@/actions/deleteUser";
import promoteUserToAdmin from "@/actions/promoteUserToAdmin";
import getUserById from "@/actions/getUserById";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { AddNewUserModal } from "@/ui/components/dashboard/users/AddNewUserModal";
import { EditUserDialog } from "@/ui/components/dashboard/users/EditUserDialog";
import { ViewUserDetailsDialog } from "@/ui/components/dashboard/users/ViewUserDetailsDialog";
import { Loading } from "@/ui/components/shared/Loading";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import { Role } from "@prisma/client";
import { Plus, Shield, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SharedAlertDialog from "@/ui/components/shared/SharedAlertDialog";
import FilterUser from "@/ui/components/dashboard/users/FilterUser";
import { IUsersWithVotesAndComments } from "@/ui/types/types";
import UserDataShow from "@/ui/components/dashboard/users/UserDataShow";

export default function UsersPage() {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<Role | "all">("all");
  const [users, setUsers] = useState<IUsersWithVotesAndComments[]>([]);
  const [addNewUserModalOpen, setAddNewUserModalOpen] =
    useState<boolean>(false);
  const [viewDetailsOpen, setViewDetailsOpen] = useState<boolean>(false);
  const [editUserOpen, setEditUserOpen] = useState<boolean>(false);
  const [deleteUserOpen, setDeleteUserOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] =
    useState<IUsersWithVotesAndComments | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersData = await getUsers();
      setUsers(usersData as unknown as IUsersWithVotesAndComments[]);
    } catch (error) {
      toast.error(t("loadUsersError"));
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = (user: IUsersWithVotesAndComments) => {
    if (selectedUser) return; // Prevent opening if another dialog is active
    setSelectedUser(user);
    setDeleteUserOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!selectedUser) return;
    try {
      setLoading(true);
      const result = await deleteUser(selectedUser.id);
      if (result.success) {
        toast.success(t("deleteUserSuccess"));
        // Update UI by removing the deleted user
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== selectedUser.id)
        );
      } else {
        toast.error(t("deleteUserFailed"));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(t("errorOccuredInDeleteUser"));
    } finally {
      setSelectedUser(null); // Clear selectedArtwork
      setLoading(false);
      setDeleteUserOpen(false); // Ensure dialog is closed
      fetchUsers();
    }
  };

  const handlePromoteToAdmin = async (userId: string) => {
    setLoading(true);
    try {
      const result = await promoteUserToAdmin(userId);
      if (result.success) {
        toast.success(t("promoteToAdminSuccess"));
        // Update UI by updating the user's role
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role: Role.ADMIN } : user
          )
        );
      } else {
        toast.error(t("promoteToAdminFailed"));
      }
    } catch (error) {
      console.error("Error promoting user:", error);
      toast.error(t("errorOccuredInPromoteToAdmin"));
    } finally {
      setLoading(false);
    }
  };

  const handleViewUserDetails = async (userId: string) => {
    setLoading(true);
    try {
      const user = await getUserById(userId);
      if (user) {
        setSelectedUser(user as unknown as IUsersWithVotesAndComments);
        setViewDetailsOpen(true);
      } else {
        toast.error(t("errorOccuredShowDetailsUser"));
      }
    } catch (error) {
      console.error("Error loading user details:", error);
      toast.error(t("uploadShowDetailsUserDataFailed"));
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = async (userId: string) => {
    setLoading(true);
    try {
      const user = await getUserById(userId);
      if (user) {
        setSelectedUser(user as unknown as IUsersWithVotesAndComments);
        setEditUserOpen(true);
      } else {
        toast.error(t("uploadEditUserDataFailed"));
      }
    } catch (error) {
      console.error("Error loading user for editing:", error);
      toast.error(t("errorOccuredEditUser"));
    } finally {
      setLoading(false);
    }
  };

  const handleUserUpdated = () => {
    fetchUsers(); // Refresh the users list after an update
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = [
    { label: t("totalUsers"), value: users.length, icon: UsersIcon },
    {
      label: t("adminUsers"),
      value: users.filter((u) => u.role === Role.ADMIN).length,
      icon: Shield,
    },
  ];
  return (
    <main
      className="flex-1 p-6 animate-fade-in"
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              {t("usersPageTitle")}
            </h1>
            <p className="text-muted-foreground text-sm">
              {language === "en"
                ? "Manage users, roles, and permissions"
                : "إدارة الأدوار والصلاحيات"}
            </p>
          </div>
          <Button
            className="flex items-center gap-2"
            onClick={() => setAddNewUserModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            {language === "en" ? "Add User" : "إضافة مستخدم"}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 grid-cols-2">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                  <stat.icon className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Filters */}
        <FilterUser
          language={language}
          roleFilter={roleFilter}
          searchTerm={searchTerm}
          setRoleFilter={setRoleFilter}
          setSearchTerm={setSearchTerm}
          t={t}
        />
        {/* Users Table */}
        <UserDataShow
          filteredUsers={filteredUsers}
          handleDeleteUser={handleDeleteUser}
          handleEditUser={handleEditUser}
          handlePromoteToAdmin={handlePromoteToAdmin}
          handleViewUserDetails={handleViewUserDetails}
          language={language}
          isLoading={loading}
          t={t}
        />
      </div>
      <AddNewUserModal
        t={t}
        language={language}
        open={addNewUserModalOpen}
        onClose={() => {
          setAddNewUserModalOpen(false);
          fetchUsers(); // Refresh users list after modal closes
        }}
      />
      <ViewUserDetailsDialog
        open={viewDetailsOpen}
        onClose={() => setViewDetailsOpen(false)}
        user={selectedUser}
        t={t}
        language={language}
      />
      <EditUserDialog
        language={language}
        t={t}
        open={editUserOpen}
        onClose={() => setEditUserOpen(false)}
        user={selectedUser}
        onUserUpdated={handleUserUpdated}
      />
      <SharedAlertDialog
        action={confirmDeleteUser}
        cancel
        description={t("deleteUserDescription")}
        isLoading={loading}
        onClose={() => {
          setDeleteUserOpen(false);
          setSelectedUser(null);
        }} // Use custom handler
        open={deleteUserOpen}
        t={t}
        title={t("deleteTitle")}
        lang={language}
      />
      {loading && <Loading />}
    </main>
  );
}
