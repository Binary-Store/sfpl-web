"use client";

import { useProducts } from "@/hooks/useProducts";
import { IndianRupee } from "lucide-react";
import { serverDetails } from "@/config";
import { useRouter } from "next/navigation";

export default function Products() {
  const router = useRouter();
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of fire protection solutions
            designed to keep you safe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products?.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden cursor-pointer"
              onClick={() => {
                // toast.success("Coming Soon");
                router.push(`/products/${product.id}`);
              }}
            >
              {product.images?.length > 0 && (
                // blur photo for all
                <div className="relative overflow-hidden ">
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 text-gray-900 capitalize">
                  {product.name?.toUpperCase()}
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
                      {product?.price / 100}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
