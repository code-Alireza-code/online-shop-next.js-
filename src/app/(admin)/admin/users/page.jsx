"use client";

import { useGetAllUsers } from "@/hooks/useAuth";
import UsersTable from "./UsersTable";

function UsersPage() {
  const { data } = useGetAllUsers();
  const { users } = data || {};

  return (
    <div>
      <h1>اطلاعات کاربران</h1>
      <UsersTable users={users} />
    </div>
  );
}

export default UsersPage;
