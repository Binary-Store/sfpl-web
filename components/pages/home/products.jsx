'use client';

import { useProducts } from "@/hooks/useProducts";
import { IndianRupee } from "lucide-react";
import { serverDetails } from "@/config";

export default function Products() {
  const { data: products, isLoading, error } = useProducts();

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Most Selling Products</h1>
          
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products?.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
              {product.photo_url && (
                <div className="relative overflow-hidden">
                  <img 
                    src={`${serverDetails.socketPath}/files/${product.photo_url}`} 
                    alt={product.name}
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Fire Safety
                    </span>
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 text-gray-900 capitalize">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
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
      </div>
    </div>
  );
}
