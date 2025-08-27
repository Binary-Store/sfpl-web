import Image from "next/image";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[680px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://kaarwan.s3.amazonaws.com/public/blog/media/fire_protection_systems_c63098698.jpeg"
        alt="Fire Extinguisher Safety Solutions"
        fill
        className="object-cover object-center z-0"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40  z-10" />
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col items-start gap-6 max-w-xl text-white">

          <h1 className="text-5xl md:text-5xl font-extrabold leading-tight drop-shadow">
            Let's Make Fire Safe India
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 max-w-md drop-shadow">
            Providing Fire Safety Solutions for Your Business & Home
          </p>
         
        </div>
      </div>
    </section>
  );
}