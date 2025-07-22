import Image from "next/image";

export default function Vision() {
  return (
    <section className="w-full bg-white my-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Left: Text */}
        <div className="flex-1 max-w-xl">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 relative inline-block">
            <span className="text-red-600">Vision</span>
            <span className="text-gray-800 ml-2">& Mission</span>
            <span className="block h-1 w-16 bg-red-600 mt-2 rounded"></span>
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            At Specific Fire Protection Limited, safety isn&apos;t just a goal—it&apos;s a fundamental right. Our mission is to deliver the highest standards of fire safety through innovation, expertise, and dedication.
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
            <li>Expertly trained team ensuring top-tier system maintenance and real-world fire drills.</li>
            <li>Commitment to accessible, reliable, and advanced fire safety solutions for all.</li>
            <li>Driven by our tagline: <span className="font-semibold text-red-600">"Let&apos;s make FIRE safety India."</span></li>
          </ul>
          <p className="text-gray-700">
            Together, we are building a safer, more secure future—step by step, alongside our customers, partners, and stakeholders.
          </p>
        </div>
        {/* Right: Image collage */}
        <div className="flex-1 flex justify-center relative min-w-[320px]">
          <Image src="/images/home/vision-image.png" alt="Vision" width={320} height={340} className="relative w-2/3" />
        </div>
      </div>
    </section>
  );
}