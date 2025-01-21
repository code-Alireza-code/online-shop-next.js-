"use client";
import Loading from "@/common/Loading";
import { useGetUser } from "@/hooks/useAuth";
import { toLocalDateString } from "@/utils/toLocalDate";
import PaymentTable from "./payment/PaymentTable";
import Link from "next/link";

function ProfilePage() {
  const { data, isLoading } = useGetUser();
  const { user, payments } = data || {};

  if (isLoading) return <Loading />;
  return (
    <div>
      <h1 className="mb-4">
        <span className="font-bold">{user.name}</span> خوش آمدی
      </h1>
      <p>
        <span>تاریخ پیوستن :</span>
        <span>{toLocalDateString(user.createdAt)}</span>
      </p>
      <div className="p-4 mt-8">
        <div className="flex items-center justify-between">
          <h2>آخرین سفارشات کاربر</h2>
          <Link
            href="/profile/payment"
            className="text-primary-900 btn btn--secondary text-sm"
          >
            مشاهده همه سفارشات
          </Link>
        </div>
        <PaymentTable
          payments={payments
            .sort((a, b) =>
              new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
            )
            .slice(0, 3)}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
