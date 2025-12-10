import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductDetailsProps {
  product: Product;
  relatedProducts: Product[];
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onProductClick: (product: Product) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  product, 
  relatedProducts,
  onBack, 
  onAddToCart,
  onProductClick
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  // Reset state when product changes
  useEffect(() => {
    setQuantity(1);
    setSelectedSize('');
    setSelectedColor('');
    // Scroll to top when switching products
    window.scrollTo(0, 0);
  }, [product.id]);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  return (
    <div className="bg-white min-h-[calc(100vh-6rem)] animate-fade-in pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-0 py-6">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-cyan-500 transition-colors mb-6 group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="relative bg-gray-50 rounded-none aspect-square overflow-hidden border border-gray-100 group">
              {/* Mock arrows for gallery feel */}
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                 <button className="p-2 bg-white/80 rounded-full shadow-sm hover:bg-white text-gray-400">
                    <ChevronLeft size={24} />
                 </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                 <button className="p-2 bg-white/80 rounded-full shadow-sm hover:bg-white text-gray-400">
                    <ChevronRight size={24} />
                 </button>
              </div>
              
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain p-8 mix-blend-multiply"
              />
            </div>
            {/* Mock Thumbnails */}
            <div className="flex justify-center gap-2">
               <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
               <div className="w-2 h-2 rounded-full bg-gray-300"></div>
               <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-cyan-500 mb-4">{product.name}</h1>
            
            <div className="space-y-2 mb-6">
              <p className="text-gray-600 flex items-center">
                <span className="font-bold text-cyan-500 min-w-[120px]">Product Type:</span> 
                {product.category}
              </p>
              <p className="text-gray-600 flex items-center">
                <span className="font-bold text-cyan-500 min-w-[120px]">Rating:</span>
                <span className="flex items-center text-yellow-400">
                  {product.rating} <Star size={14} className="fill-current ml-1" />
                </span>
              </p>
              <p className="text-gray-600 flex items-center">
                <span className="font-bold text-cyan-500 min-w-[120px]">Price:</span>
                <span className="text-xl font-bold text-cyan-500">${product.price.toFixed(2)}</span>
              </p>
            </div>

            {/* Selectors */}
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-cyan-500 mb-2">Size</label>
                <select 
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full p-3 border border-cyan-400 rounded-md text-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 bg-white"
                >
                  <option value="">Select Size (If applicable)</option>
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                  <option value="XL">Extra Large</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-500 mb-2">Select the color</label>
                <select 
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full p-3 border border-cyan-400 rounded-md text-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 bg-white"
                >
                  <option value="">Select Color (If applicable)</option>
                  <option value="Standard">Standard</option>
                  <option value="Shiny">Shiny (Rare)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-500 mb-2">Quantity</label>
                <div className="flex items-center border border-cyan-400 rounded-md max-w-[150px]">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 text-cyan-500 hover:bg-cyan-50 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    readOnly
                    className="flex-1 w-full text-center text-cyan-500 font-bold focus:outline-none"
                  />
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 text-cyan-500 hover:bg-cyan-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 mt-auto">
              <button 
                onClick={() => onAddToCart(product, quantity)}
                className="w-full py-3 border border-cyan-400 text-cyan-500 font-bold rounded-md hover:bg-cyan-50 transition-colors uppercase tracking-wide"
              >
                Add to Cart
              </button>
              <div className="flex items-center space-x-2">
                 <span className="text-gray-400 text-sm">Or,</span>
              </div>
              <button 
                onClick={() => {
                  onAddToCart(product, quantity);
                }}
                className="w-full py-3 border border-cyan-400 text-cyan-500 font-bold rounded-md hover:bg-cyan-50 transition-colors uppercase tracking-wide"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
        
        {/* Description Section */}
        <div className="mt-16 border-t border-gray-100 pt-8">
           <h3 className="text-xl font-bold text-cyan-500 mb-4">Description</h3>
           <p className="text-cyan-600/80 leading-relaxed max-w-4xl text-sm md:text-base">
             This product is made from durable PVC material and originates from Guangdong. 
             It features a 1*50 specification and comes under an unbranded category with standard packaging. 
             The item includes anime-themed imagery and is listed under item number HY-16. 
             It provides a shopping guide video and requires simple assembly. 
             Unlike many similar products, it is not exclusively for foreign trade and is classified under 
             the 3C category for toys suitable for ages 14 and up. The set comes in a Naruto four-piece box set color variant 
             and is supplied as an exclusive source for cross-border export. Designed for adult collectors aged 18 years and older, 
             this figure set is ideal for display, gifting, and anime collection enthusiasts.
           </p>
        </div>

        {/* Discover Our Products Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-cyan-500 mb-10">Discover Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard 
                key={relatedProduct.id} 
                product={relatedProduct} 
                onAddToCart={(p) => onAddToCart(p, 1)}
                onClick={onProductClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};