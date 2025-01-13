import Link from "next/link";

function SideBar() {
  return (
    <div>
      <ul className="flex flex-col space-y-6">
        <li>
          <Link href="/">صفحه اصلی</Link>
        </li>
        <li>
          <Link href="/profile/me">اطلاعات کاربری</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
