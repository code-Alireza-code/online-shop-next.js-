"use client";
import { useGetUser } from "@/hooks/useAuth";
import { toLocalDateString } from "@/utils/toLocalDate";

function ProfilePage() {
  const { data, isLoading } = useGetUser();
  const { user } = data || {};

  if (isLoading) return <p>loading....</p>;
  return (
    <div>
      <h1>{user.name} خوش آمدی</h1>
      <p>
        <span>تاریخ پیوستن :</span>
        <span>{toLocalDateString(user.createdAt)}</span>
      </p>
    </div>
  );
}

export default ProfilePage;
