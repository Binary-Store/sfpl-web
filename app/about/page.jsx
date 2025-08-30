import Image from "next/image";
import { Shield, Target, Users, Building2, Flame, CheckCircle, Award, Star } from "lucide-react";

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://kaarwan.s3.amazonaws.com/public/blog/media/fire_protection_systems_c63098698.jpeg"
          alt="About SFPL Fire Safety"
          fill
          className="object-cover object-center z-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <div className="relative z-20 container mx-auto px-4 py-20 flex flex-col items-center justify-center gap-6 text-center text-white">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-16 w-16 text-red-500 mr-4" />
            <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow">About SFPL</h1>
          </div>
          <p className="text-2xl md:text-3xl text-white/90 max-w-3xl drop-shadow">
            Leading the way in fire safety innovation and protection across India
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="w-full bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-red-600">About</span> Us
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Founded with a vision to make India fire safe, <strong>Specific Fire Protection Limited (SFPL)</strong> has been at the forefront of fire safety innovation for over a decade. Our journey began with a simple belief: safety is a right, not a privilege.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We have grown into a trusted partner for businesses, industries, and homes, delivering reliable, advanced, and accessible fire protection solutions that meet international standards.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">1000+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">50+</div>
                  <div className="text-sm text-gray-600">Cities Served</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl transform rotate-3"></div>
              <Image 
                src="/images/home/vision-image.png" 
                alt="SFPL Fire Safety Solutions" 
                width={500} 
                height={400} 
                className="relative rounded-3xl shadow-2xl" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="w-full bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Mission & <span className="text-red-600">Vision</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
              </div>
              <p className="text-gray-700 text-center leading-relaxed">
              Delivering smart, reliable, and adaptable life-safety solutions.
              </p>
            </div>
            
            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
              </div>
              <p className="text-gray-700 text-center leading-relaxed">
              Safeguarding lives with intelligent safety innovations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="w-full bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-red-600">Team</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
              Meet the dedicated professionals who make SFPL a leader in fire safety solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Team Member 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <Image
                    src="/Nikhil_1.jpg"
                    alt="Managing Director"
                    width={128}
                    height={128}
                    className="rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full  opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Nikhil Bhalara</h3>
                <p className="text-red-600 font-semibold mb-3">Director</p>
              
              </div>
            </div>
              {/* Team Member 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <Image
                    src="/Manish_1.JPG"
                    alt="Chief Technical Officer"
                    width={128}
                    height={118}
                    className="rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full  opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Manish Virani</h3>
                <p className="text-red-600 font-semibold mb-3">Director</p>
           
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <Image
                    src="/mukesh_vasu.jpeg"
                    alt="Director of Operations"
                    width={128}
                    height={128}
                    className="rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full  opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Mukesh Vasu</h3>
                <p className="text-red-600 font-semibold mb-3">Director</p>
                
              </div>
            </div>

          
          </div>
        </div>
      </section>

      {/* Group of Companies Section */}
      <section className="w-full bg-gradient-to-br from-red-50 to-orange-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Group of <span className="text-red-600">Companies</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
              SFPL is part of a larger ecosystem of companies dedicated to safety and protection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Company 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
                <div className="w-40 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Image
                    src="/Anupam_logo.png"
                    alt="Anupam Security"
                    width={280}
                    height={80}
                    className="object-contain rounded-lg"
                  />
                </div>
              <div className="text-center">

                <h3 className="text-xl font-bold text-gray-900 mb-2">Anupam <br/> Security</h3>
                <p className="text-gray-600 text-sm mb-2">
                Integrated whole system using AI in one stop solution.
                </p>
                <p className="text-sm text-gray-500 font-medium">
                   January 26, 2016
                </p>

              </div>
            </div>

            {/* Company 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
                <div className="w-40 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Image
                    src="/logo.svg"
                    alt="Specific Fire Protection Limited"
                    width={280}
                    height={80}
                    className="object-contain rounded-lg"
                  />
                </div>
              <div className="text-center">

                <h3 className="text-xl font-bold text-gray-900 mb-2">Specific Fire Protection Limited</h3>
                <p className="text-gray-600 text-sm mb-2">
                Deal with client in advance fire safety solution.
                </p>
                <p className="text-sm text-gray-500 font-medium">
                   November 29, 2023
                </p>
              </div>
            </div>

            {/* Company 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
              
                <div className="w-40 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Image
                    src="/firelynk.jpeg"
                    alt="Firelynk Protech Limited"
                    width={280}
                    height={80}
                    className="object-contain rounded-lg"
                  />
                </div>
              <div className="text-center">

                <h3 className="text-xl font-bold text-gray-900 mb-2">Firelynk Protech Limited</h3>
                <p className="text-gray-600 text-sm mb-2">
                Innovation in advance fire safety solution.
                </p>
                <p className="text-sm text-gray-500 font-medium">
                   February 1, 2024
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
                <div className="w-40 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Image
                    src="/firelynk_tech.jpeg"
                    alt="Firelynk Tech Limited"
                    width={280}
                    height={80}
                    className="object-contain rounded-lg"
                  />
                </div>
              <div className="text-center">

                <h3 className="text-xl font-bold text-gray-900 mb-2">Firelynk Tech Limited</h3>
                <p className="text-gray-600 text-sm mb-2">
                Manufacturing in advance fire safety solution.
                </p>
                <p className="text-sm text-gray-500 font-medium">
                   August 1, 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 