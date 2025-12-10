import React from 'react';
import { Plus, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col cursor-pointer"
      onClick={() => onClick(product)}
    >
      <div className="relative pt-[100%] overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold text-gray-700 shadow-sm">
          {product.category}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-red-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center text-yellow-400 text-sm font-bold">
            <Star size={14} className="fill-current mr-1" />
            {product.rating}
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
           Official merchandise. High quality material suitable for all trainers.
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              onAddToCart(product);
            }}
            className="w-10 h-10 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-200"
            aria-label="Add to cart"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};