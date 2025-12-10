import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f172a] text-white py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Products Column */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-2">Products</h3>
            <ul className="space-y-3 text-sm font-medium text-gray-300">
              {['Anime T-Shirt', 'Kimono', 'Haori', 'Anime Figures', 'Mystery Box', 'Mini Anime Figures', 'Anime Accessories'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-cyan-400 transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Column */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-2">Info.</h3>
            <ul className="space-y-3 text-sm font-medium text-gray-300">
              {['About Us', 'Policy', 'Return & Exchange', 'Order Issues', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-cyan-400 transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo & Socials Column */}
          <div className="flex flex-col md:items-end space-y-6">
            <div className="flex items-center space-x-2">
              <div className="relative group cursor-pointer">
                 {/* REPLACE THE SRC BELOW WITH YOUR LOGO URL */}
                 <img 
                    src="https://placehold.co/200x70/transparent/ffffff?text=BankaiMise&font=montserrat" 
                    alt="BankaiMise" 
                    className="h-16 w-auto object-contain"
                 />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="#" className="bg-white text-[#0f172a] p-2 rounded-full hover:bg-cyan-400 hover:text-white transition-all duration-300 transform hover:scale-110">
                <Facebook size={20} fill="currentColor" className="stroke-none" />
              </a>
              <a href="#" className="bg-white text-[#0f172a] p-2 rounded-full hover:bg-cyan-400 hover:text-white transition-all duration-300 transform hover:scale-110">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-white text-[#0f172a] p-2 rounded-full hover:bg-cyan-400 hover:text-white transition-all duration-300 transform hover:scale-110">
                <Youtube size={20} fill="currentColor" className="stroke-none" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col items-center">
          <p className="text-gray-500 text-sm font-medium">
            Copyright © 2025 - All right reserved by BankaiMise
          </p>
        </div>
      </div>
    </footer>
  );
};