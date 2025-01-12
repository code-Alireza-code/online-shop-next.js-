import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.url;
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/profile")) {
    let strCookie = "";
    req.cookies.getAll().forEach((item) => {
      strCookie += `${item?.name}=${item?.value}; `;
    });

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: strCookie,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const { user } = data || {};
        if (!user) {
          return NextResponse.redirect(new URL("/auth", url));
        }

        return NextResponse.next();
      });
  }

  if (pathname.startsWith("/admin")) {
    console.log("admin req");
  }
}

export const config = {
  matcher: ["/admin", "/profile"],
};
