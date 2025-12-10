import React from 'react';
import { ShoppingBag, MessageCircle, Home, Menu, X, UserCircle, LogOut } from 'lucide-react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  cartCount: number;
  toggleCart: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  setCurrentView, 
  cartCount, 
  toggleCart,
  isLoggedIn,
  onLogout 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavItem = ({ view, icon: Icon, label }: { view: View; icon: any; label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
        currentView === view
          ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-200'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => setCurrentView('home')}
          >
            {/* REPLACE THE SRC BELOW WITH YOUR LOGO URL */}
            <img 
              src="https://placehold.co/180x60/transparent/06b6d4?text=BankaiMise&font=montserrat" 
              alt="BankaiMise" 
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            <NavItem view="home" icon={Home} label="Home" />
            <NavItem view="shop" icon={ShoppingBag} label="Shop" />
            <NavItem view="chat" icon={MessageCircle} label="AI Assistant" />
          </div>

          {/* Cart, Login & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <button 
                onClick={onLogout}
                className="hidden md:flex items-center space-x-2 px-5 py-2 rounded-md font-medium border border-cyan-200 text-cyan-600 hover:bg-cyan-50 transition-colors"
              >
                <LogOut size={18} />
                <span>Log out</span>
              </button>
            ) : (
              <button 
                onClick={() => setCurrentView('login')}
                className={`hidden md:block px-5 py-2 rounded-md font-medium border transition-colors ${
                  currentView === 'login' 
                  ? 'bg-cyan-50 border-cyan-400 text-cyan-600'
                  : 'border-cyan-300 text-cyan-500 hover:bg-cyan-50'
                }`}
              >
                Log in
              </button>
            )}

            <button 
              onClick={toggleCart}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-cyan-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-2">
           <NavItem view="home" icon={Home} label="Home" />
           <NavItem view="shop" icon={ShoppingBag} label="Shop" />
           <NavItem view="chat" icon={MessageCircle} label="AI Assistant" />
           
           {isLoggedIn ? (
             <button 
               onClick={() => {
                 onLogout();
                 setIsMobileMenuOpen(false);
               }}
               className="w-full flex items-center space-x-2 px-4 py-2 rounded-full text-cyan-600 hover:bg-cyan-50 font-medium"
             >
               <LogOut size={20} />
               <span>Log out</span>
             </button>
           ) : (
             <button 
               onClick={() => {
                  setCurrentView('login');
                  setIsMobileMenuOpen(false);
               }}
               className="w-full flex items-center space-x-2 px-4 py-2 rounded-full text-cyan-600 hover:bg-cyan-50 font-medium"
             >
               <UserCircle size={20} />
               <span>Log in</span>
             </button>
           )}
        </div>
      )}
    </nav>
  );
};