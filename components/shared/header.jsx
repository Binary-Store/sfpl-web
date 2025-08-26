"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const token = localStorage.getItem('token');
  
  const isActive = (path) => {
    return pathname === path;
  };
  
  return (
    <header className="w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="SFPL Logo" width={79} height={32} priority />
        </Link>
        {/* Navigation */}
        <nav className="hidden md:flex gap-2 lg:gap-4 xl:gap-6">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About Us" },
            { href: "/products", label: "Products" },
            { href: "/contact", label: "Contact us" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? ' text-primary font-semibold'
                  : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Actions */}
        <div className="flex items-center gap-2">
          {token ? (
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}