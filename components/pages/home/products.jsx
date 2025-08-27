import Image from "next/image";
import { ArrowRight } from 'lucide-react';

const products = [
  {
    name: "Fire Extinguisher",
    image: "/images/products/fire-extinguisher.jpg",
    description: "High-quality ABC powder fire extinguisher for hom",
    price: "₹1,499",
  },
  {
    name: "Fire Alarm System",
    image: "/images/products/fire-pump.jpeg",
    description: "Advanced smoke and heat detection system for early warning.",
    price: "₹3,999",
  },
  {
    name: "Sprinkler System",
    image: "/images/products/fire-alarm.jpeg",
    description: "Automatic water sprinkler system for effective fire suppression.",
    price: "₹7,499",
  },
  {
    name: "Fire Hose Reel",
    image: "/images/products/fire-spray.jpeg",
    description: "Durable and easy-to-use fire hose reel for emergency response.",
    price: "₹2,299",
  },

];

export default function Products() {
  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-10">
          Popular Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 flex justify-between rounded-2xl shadow-md hover:shadow-xl hover:border-primary transition-all flex-col relative overflow-hidden group"
            >
              {/* Popular Badge */}
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow group-hover:bg-primary transition-colors z-10">
                Popular
              </span>
              <div className="w-2/3 relative rounded-xl mt-4 overflow-hidden mx-auto">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  width={300}
                  height={300}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={idx < 3}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1 text-gray-800 text-left w-full">{product.name}</h3>
                <p className="text-gray-600 text-sm text-left w-full">{product.description}</p>
                <div className="text-lg font-bold text-primary text-left w-full">{product.price}</div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl z-0" />
              </div>
            </div>
          ))}
        </div>
       
      </div>
    </section>
  );
}
