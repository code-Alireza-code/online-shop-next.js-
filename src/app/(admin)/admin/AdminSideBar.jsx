"use client";
import { logoutUserApi } from "@/services/authService";
import Link from "next/link";
import toast from "react-hot-toast";
import { MdExitToApp } from "react-icons/md";

function AdminSideBar() {
  const handleLogout = async () => {
    try {
      await logoutUserApi();
      toast.success("از حساب خود خارج شدید !");
      // localStorage.removeItem("userInfo");
      // localStorage.removeItem("cartItems");
      // localStorage.removeItem("token");
      document.location.href = "/";
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "خطا در هنگام خروج از حساب"
      );
    }
  };

  return (
    <div>
      <ul className="flex flex-col space-y-6">
        <li>
          <Link href="/">صفحه اصلی</Link>
        </li>
        <li>
          <Link href="/admin">داشبورد</Link>
        </li>
        <li>
          <Link href="/admin/users">کاربران</Link>
        </li>
        <li>
          <Link href="/admin/products">محصولات</Link>
        </li>
        <li>
          <Link href="/admin/categories">دسته بندی</Link>
        </li>
        <li>
          <Link href="/admin/payments">سفارشات</Link>
        </li>
        <li>
          <Link href="/admin/coupons">کد تخفیف</Link>
        </li>
        <li>
          <button
            className="text-error absolute bottom-5 flex gap-1 justify-center items-center"
            onClick={handleLogout}
          >
            <MdExitToApp />
            <span> خروج از حساب کاربری</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AdminSideBar;
