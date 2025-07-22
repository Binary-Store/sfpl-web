import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-8 px-4">
        {/* Left: Logo & Company Name */}
        <div className="flex flex-col items-start gap-4 min-w-[220px]">
          <div className="flex items-center gap-3">
            <Image src="/shared/white-logo.svg" alt="SFPL Logo" width={79} height={32} priority />

          </div>
          {/* Social Icons */}
          <div className="flex gap-4 mt-2">
            <Link href="https://www.linkedin.com/company/specificfire/" target="_blank" aria-label="LinkedIn" className="hover:text-white/80 transition-colors">
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link href="https://www.instagram.com/specificfire/" target="_blank" aria-label="Instagram" className="hover:text-white/80 transition-colors">
              <Instagram className="w-6 h-6" />
            </Link>
            <Link href="https://www.facebook.com/specificfire/" target="_blank" aria-label="Facebook" className="hover:text-white/80 transition-colors">
              <Facebook className="w-6 h-6" />
            </Link>
            <Link href="https://www.youtube.com/@specificfire" target="_blank" aria-label="YouTube" className="hover:text-white/80 transition-colors">
              <Youtube className="w-6 h-6" />
            </Link>
          </div>
        </div>
        {/* Center: Addresses */}
        <div className="flex flex-col md:flex-row gap-8 flex-1 justify-center text-center md:text-left">
          <div>
            <h3 className="font-semibold text-lg mb-2">Ahmedabad</h3>
            <p className="text-sm leading-relaxed">
              718, Binori B Square - III,<br />
              Sindhu Bhavan Road,<br />
              Ahmedabad - 380059.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Rajkot</h3>
            <p className="text-sm leading-relaxed">
              1005, The Spire, Near Shital Park Circle,<br />
              150 Ft. Ring Road,<br />
              Rajkot - 360007.
            </p>
          </div>
        </div>
        {/* Right: Contact */}
        <div className="min-w-[220px] flex flex-col items-start md:items-end gap-2">
          <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
          <a href="tel:+919512570092" className="text-sm hover:underline">+91 9512570092</a>
          <a href="mailto:sales@specificfire.com" className="text-sm hover:underline">sales@specificfire.com</a>
        </div>
      </div>
    </footer>
  );
}