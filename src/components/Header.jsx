import Link from "next/link";

function Header() {
  return (
    <header className="shadow-md mb-10">
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
            <Link href="/auth" className="block py-2">
              ورود
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
