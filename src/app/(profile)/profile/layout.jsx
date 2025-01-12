import "../../globals.css";
import Header from "@/components/Header";
import vazirFont from "@/constants/localFonts";
import Providers from "app/Providers";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "پروفایل کاربر",
  description: "پروفایل کاربر",
};

function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-sans`}>
        <Providers>
          <Toaster />
          <Header />
          <div className="container xl:max-w-screen-xl">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
