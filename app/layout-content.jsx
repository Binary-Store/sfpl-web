"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { useGetCart } from "@/hooks/useServices";
import { useGlobal } from "@/contexts/GlobalContext";
import { Providers } from "./providers";
import { useEffect } from "react";

export default function LayoutContent({ children }) {
  const { data: cartItems } = useGetCart();
  const { setCartItems } = useGlobal();
  useEffect(() => {
    if (cartItems) {
      console.log(cartItems);
      setCartItems(cartItems);
    }
  }, [cartItems]);
  const pathname = usePathname();

  // Check if current path is an authentication page or dashboard page
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/verify" ||
    pathname === "/reset-password" ||
    pathname === "/request-forgot-password";
  const isDashboardPage = pathname.startsWith("/dashboard");

  if (isAuthPage || isDashboardPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
