'use client';

import { useProducts } from "@/hooks/useProducts";
import { IndianRupee, ArrowRight, Shield } from "lucide-react";
import { serverDetails } from "@/config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Products() {
  const { data: products, isLoading, error } = useProducts();
  const router = useRouter();
  
  if (isLoading) {
    return <div className="p-6">Loading products...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error loading products</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Most Popular Services</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          {products?.slice(0,2).map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden cursor-pointer" 
            onClick={() => {
              toast.success('Coming Soon');
            }}
            >
              <div className="relative overflow-hidden h-72 bg-gray-100 ">
                {product.photo_url ? (
                  <img 
                    src={`${serverDetails.socketPath}/files/${product.photo_url}`} 
                    alt={product.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                
                {/* Fallback icon when no image or image fails to load */}
                <div className={`w-full h-full flex items-center justify-center ${product.photo_url ? 'hidden' : 'flex'}`}>
                  <Shield className="h-24 w-24 text-gray-400" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 text-gray-900 capitalize">
                  {product.name?.toUpperCase()}
                </h3>
                {product.description && (
                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed ">
                    {product.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-2 ">
                    <IndianRupee className="w-5 h-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">
                      {product.price?.toLocaleString()}
                    </span>
                  </div>
                  
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                    View 
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More Services Button */}
        <div className="text-center">
          <button 
            onClick={() => router.push('/products')}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View More Services
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
