'use client';

import { usePathname } from "next/navigation";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { Providers } from "./providers";

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  
  // Check if current path is an authentication page or dashboard page
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/verify' || pathname ==='/reset-password' || pathname ==='/request-forgot-password';
  const isDashboardPage = pathname.startsWith('/dashboard');
  
  if (isAuthPage || isDashboardPage) {
    return (
      <Providers>
        {children}
      </Providers>
    );
  }
  
  return (
    <>
      <Header />
      <Providers>
        {children}
      </Providers>
      <Footer />
    </>
  );
}
