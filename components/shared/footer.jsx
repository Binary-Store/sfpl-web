"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Shield,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <footer className="w-full bg-white border-t border-gray-100 py-12">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo-full-black.svg"
                alt="SFPL"
                width={100}
                height={100}
              />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Specific Fire Protection Limited - Your trusted partner for fire
              safety solutions.
            </p>
            <div className="flex space-x-3">
              <Link
                href="https://www.linkedin.com/in/specific-fire/"
                target="_blank"
                aria-label="LinkedIn"
                className="p-2 bg-gray-100 hover:bg-primary hover:text-white text-gray-600 rounded-lg transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.instagram.com/specificfire"
                target="_blank"
                aria-label="Instagram"
                className="p-2 bg-gray-100 hover:bg-primary hover:text-white text-gray-600 rounded-lg transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.facebook.com/specific.fire"
                target="_blank"
                aria-label="Facebook"
                className="p-2 bg-gray-100 hover:bg-primary hover:text-white text-gray-600 rounded-lg transition-all duration-200"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.youtube.com/@SPECIFIC_FIRE"
                target="_blank"
                aria-label="YouTube"
                className="p-2 bg-gray-100 hover:bg-primary hover:text-white text-gray-600 rounded-lg transition-all duration-200"
              >
                <Youtube className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Pages</h3>
            <div className="space-y-2">
              <Link
                href="/"
                className={`block text-sm transition-colors ${
                  isActive("/")
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                Home
              </Link>

              <Link
                href="/products"
                className={`block text-sm transition-colors ${
                  isActive("/products")
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                Services
              </Link>
              <Link
                href="/about"
                className={`block text-sm transition-colors ${
                  isActive("/about")
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className={`block text-sm transition-colors ${
                  isActive("/contact")
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Quick links</h3>
            <div className="space-y-2">
              <Link
                href="/terms-conditions"
                className={`block text-sm transition-colors ${
                  isActive("/terms-conditions")
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy"
                className={`block text-sm transition-colors ${
                  isActive("/privacy")
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                Privacy Policy
              </Link>
              <Link
                href="/return-refund"
                className={`block text-sm transition-colors ${
                  isActive("/return-refund")
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                Return & Refund
              </Link>
              <Link
                href="/order-shipping"
                className={`block text-sm transition-colors ${
                  isActive("/order-shipping")
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                Order & Shipping
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-red-600" />
                  <a
                    href="tel:+919512570090"
                    className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                  >
                    +91 9512570090
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-red-600" />
                  <a
                    href="mailto:contact@specificfire.com"
                    className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                  >
                    contact@specificfire.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Both Offices */}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © 2023 Specific Fire Protection Limited. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-500">
              <Link
                href="/privacy"
                className={`transition-colors ${
                  isActive("/privacy")
                    ? "text-primary font-semibold"
                    : "hover:text-red-600"
                }`}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-conditions"
                className={`transition-colors ${
                  isActive("/terms-conditions")
                    ? "text-primary font-semibold"
                    : "hover:text-red-600"
                }`}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
