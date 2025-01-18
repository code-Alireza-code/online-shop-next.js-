"use client";

import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";

function Header() {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};

  return (
    <header
      className={`shadow-md mb-10 sticky z-10  bg-white top-0 transition-all duration-300${
        isLoading ? "blur-sm opacity-20" : "blur-0 opacity-100"
      }`}
    >
      <nav>
        <ul className="flex items-center justify-between py-2 container xl:max-w-screen-xl">
          <li>
            <Link href="/" className="block py-2">
              خانه
            </Link>
          </li>
          <li>
            <Link href="/products" className="block py-2">
              محصولات
            </Link>
          </li>
          <li>
            <Link href="/profile" className="block py-2">
              پنل کاربر
            </Link>
          </li>
          <li>
            <Link href="/admin" className="block py-2">
              پنل ادمین
            </Link>
          </li>
          <li>
            <Link href="/cart" className="block py-2">
              سبد خرید({cart && cart.payDetail.productIds.length})
            </Link>
          </li>
          <li>
            {user ? (
              <span>{data.user.name}</span>
            ) : (
              <Link href="/auth" className="block py-2">
                ورود
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
