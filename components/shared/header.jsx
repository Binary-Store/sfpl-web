"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [token, setToken] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    try {
      const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      setToken(storedToken);

      const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        // Accept either the whole object as the customer, or nested under `customer`
        const c = parsed?.customer ?? parsed;
        setCustomer(c ?? null);
      } else {
        // Sometimes APIs store just `customer` key
        const storedCustomer = typeof window !== 'undefined' ? localStorage.getItem('customer') : null;
        if (storedCustomer) {
          setCustomer(JSON.parse(storedCustomer));
        }
      }
    } catch (e) {
      // If parsing fails, ignore
      setCustomer(null);
    }
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', onClickOutside);
    }
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [menuOpen]);

  const isActive = (path) => pathname === path;

  const getInitial = (name) => {
    if (!name || typeof name !== 'string') return '?';
    const ch = name.trim().charAt(0);
    return ch ? ch.toUpperCase() : '?';
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('customer');
    } catch {}
    setMenuOpen(false);
    setToken(null);
    setCustomer(null);
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
            { href: "/products", label: "Products" },
            { href: "/about", label: "About Us" },
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
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                aria-label="Account menu"
                onClick={() => setMenuOpen((o) => !o)}
                className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold shadow hover:opacity-90 focus:outline-none"
              >
                {getInitial(customer?.name)}
              </button>
              {menuOpen && (
                <div className="absolute top-11 right-0 bg-white shadow-md rounded-md p-3 w-64 border border-gray-100">
                  <div className="mb-3 pb-3 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                        {getInitial(customer?.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{customer?.name || 'Customer'}</p>
                        <p className="text-xs text-gray-600 truncate">{customer?.email || '-'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <Link href="/dashboard" className="flex items-center justify-between">
                      <span className="text-gray-600">Dashboard</span>
                      <span className="text-gray-900 font-medium">Go to Dashboard</span>
                    </Link>
                   
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Phone</span>
                      <span className="text-gray-900 font-medium">{customer?.phone_number || '-'}</span>
                    </div>

                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
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