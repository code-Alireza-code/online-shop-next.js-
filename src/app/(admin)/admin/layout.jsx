import vazirFont from "@/constants/localFonts";
import Providers from "app/Providers";
import { Toaster } from "react-hot-toast";
import "../../globals.css";
import AdminSideBar from "./AdminSideBar";

export const metadata = {
  title: "پروفایل ادمین",
  description: "پروفایل ادمین",
};

function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-sans`}>
        <Providers>
          <Toaster />
          <div className="grid grid-cols-6 bg-white h-screen">
            <div className="col-span-1 bg-gray-100 overflow-y-auto p-4">
              <AdminSideBar />
            </div>
            <div className="col-span-5 overflow-y-auto p-4">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
