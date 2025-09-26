"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useGlobal } from "@/contexts/GlobalContext";
export default function Header() {
  const pathname = usePathname();
  const { cartItems } = useGlobal();

  const [token, setToken] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    try {
      const storedToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      setToken(storedToken);

      const storedUser =
        typeof window !== "undefined" ? localStorage.getItem("user") : null;
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        // Accept either the whole object as the customer, or nested under `customer`
        const c = parsed?.customer ?? parsed;
        setCustomer(c ?? null);
      } else {
        // Sometimes APIs store just `customer` key
        const storedCustomer =
          typeof window !== "undefined"
            ? localStorage.getItem("customer")
            : null;
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
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [menuOpen]);

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.includes(path);
  };

  const getInitial = (name) => {
    if (!name || typeof name !== "string") return "?";
    const ch = name.trim().charAt(0);
    return ch ? ch.toUpperCase() : "?";
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("customer");
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
          <Image
            src="/logo-full-black.svg"
            alt="SFPL Logo"
            width={170}
            height={42}
            priority
          />
        </Link>
        {/* Navigation */}
        <nav className="hidden md:flex gap-2 lg:gap-4 xl:gap-6">
          {[
            { href: "/", label: "Home" },
            { href: "/services", label: "Services" },
            { href: "/about", label: "About Us" },
            { href: "/contact", label: "Contact us" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? " text-primary font-semibold"
                  : "text-gray-700 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Actions */}
        <div className="flex items-center gap-2">
          {token && (
            <Link
              href="/cart"
              className={`p-2 rounded-md text-sm font-medium transition-colors relative ${
                isActive("/cart")
                  ? "text-primary bg-primary/10"
                  : "text-gray-700 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              {/* Cart badge for item count - you can add this later */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {
                  cartItems.filter(
                    (item, index, self) =>
                      index === self.findIndex((t) => t.id === item.id)
                  ).length
                }
              </span>
            </Link>
          )}
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
                <div className="absolute top-12 right-0 bg-white shadow-xl rounded-xl p-3 w-50 border border-gray-100/50 backdrop-">
                  {/* User Profile Section */}
                  <div className="mb-3 pb-3 border-b border-gray-100/50">
                    <div className="flex items-center gap-2.5">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center font-semibold text-sm shadow-md">
                        {getInitial(customer?.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Welcome back</p>
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {customer?.name.split(" ")[0] || "Customer"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-0.5 mb-3">
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-red-500 transition-colors duration-200"></div>
                      <span className="text-sm font-medium">Profile</span>
                    </Link>
                    <Link
                      href="/dashboard/projects"
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-red-500 transition-colors duration-200"></div>
                      <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                  </div>

                  {/* Logout Section */}
                  <div className="pt-2 border-t border-gray-100/50">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 group-hover:bg-red-600 transition-colors duration-200"></div>
                      <span className="text-sm font-medium">Logout</span>
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
