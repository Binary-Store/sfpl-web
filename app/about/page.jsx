import Image from "next/image";

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://kaarwan.s3.amazonaws.com/public/blog/media/fire_protection_systems_c63098698.jpeg"
          alt="About SFPL Fire Safety"
          fill
          className="object-cover object-center z-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <div className="relative z-20 container mx-auto px-4 py-20 flex flex-col items-center justify-center gap-6 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow">About Us</h1>
          <p className="text-2xl md:text-3xl text-white/90 max-w-2xl drop-shadow">
            Protecting lives and property with innovative fire safety solutions.
          </p>
        </div>
      </section>

      {/* Company Story & Mission */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          {/* Left: Text */}
          <div className="flex-1 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 relative inline-block">
              <span className="text-red-600">Our Story</span>
              <span className="text-gray-800 ml-2">& Values</span>
              <span className="block h-1 w-16 bg-red-600 mt-2 rounded"></span>
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Founded with a vision to make India fire safe, Specific Fire Protection Limited (SFPL) has been at the forefront of fire safety innovation. Our journey began with a simple belief: safety is a right, not a privilege. Over the years, we have grown into a trusted partner for businesses and homes, delivering reliable, advanced, and accessible fire protection solutions.
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
              <li>Expertise in designing and maintaining fire safety systems for diverse industries.</li>
              <li>Commitment to continuous innovation and customer-centric solutions.</li>
              <li>Driven by integrity, responsibility, and a passion for safety.</li>
            </ul>
            <p className="text-gray-700">
              Our mission is to empower communities with the knowledge and tools to prevent and respond to fire emergencies, building a safer future for all.
            </p>
          </div>
          {/* Right: Image */}
          <div className="flex-1 flex justify-center relative min-w-[320px]">
            <Image src="/images/home/vision-image.png" alt="SFPL Team" width={320} height={340} className="relative w-2/3" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col items-center gap-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            <div className="bg-white/10 rounded-lg p-8 flex flex-col items-center text-center shadow">
              <span className="text-4xl mb-4">🔥</span>
              <h3 className="font-semibold text-xl mb-2">Safety First</h3>
              <p className="text-primary-foreground/90">We prioritize the safety of our clients, employees, and communities in everything we do.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-8 flex flex-col items-center text-center shadow">
              <span className="text-4xl mb-4">💡</span>
              <h3 className="font-semibold text-xl mb-2">Innovation</h3>
              <p className="text-primary-foreground/90">We embrace new technologies and ideas to deliver the best fire protection solutions.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-8 flex flex-col items-center text-center shadow">
              <span className="text-4xl mb-4">🤝</span>
              <h3 className="font-semibold text-xl mb-2">Integrity</h3>
              <p className="text-primary-foreground/90">We act with honesty, transparency, and responsibility in all our relationships.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Directors Section */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col items-center gap-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Meet Our Directors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            {/* Director 1 */}
            <div className="bg-gray-100 rounded-lg p-8 flex flex-col items-center text-center shadow">
              <Image
                src="https://via.placeholder.com/160x160.png?text=Director+1"
                alt="Director 1"
                width={160}
                height={160}
                className="rounded-full mb-4 object-cover"
              />
              <h3 className="font-semibold text-xl mb-1">Mr. Rajesh Sharma</h3>
              <p className="text-red-600 font-medium mb-2">Managing Director</p>
              <p className="text-gray-700">With over 20 years of experience in the fire safety industry, Mr. Sharma leads SFPL with a vision for innovation and excellence. His commitment to safety and quality has been instrumental in the company's growth.</p>
            </div>
            {/* Director 2 */}
            <div className="bg-gray-100 rounded-lg p-8 flex flex-col items-center text-center shadow">
              <Image
                src="https://via.placeholder.com/160x160.png?text=Director+2"
                alt="Director 2"
                width={160}
                height={160}
                className="rounded-full mb-4 object-cover"
              />
              <h3 className="font-semibold text-xl mb-1">Ms. Priya Patel</h3>
              <p className="text-red-600 font-medium mb-2">Director of Operations</p>
              <p className="text-gray-700">Ms. Patel brings a wealth of operational expertise and a passion for customer service. She ensures that SFPL delivers on its promise of reliability and customer satisfaction every day.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 