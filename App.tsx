import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductDetails } from './components/ProductDetails';
import { AIChat } from './components/AIChat';
import { Login } from './components/Login';
import { Footer } from './components/Footer';
import { View, Product, CartItem } from './types';
import { ShoppingBag, Trash2, ArrowRight, Star, Package, Zap, Search } from 'lucide-react';

// Mock Data - Anime Accessories
const PRODUCTS: Product[] = [
  { id: 1, name: "Naruto Rasengan Figure | 19 CM", price: 29.99, category: "Figures", rating: 4.9, image: "https://picsum.photos/400/400?random=101" },
  { id: 2, name: "Demon Slayer Mystery Box", price: 49.99, category: "Mystery Box", rating: 4.8, image: "https://picsum.photos/400/400?random=102" },
  { id: 3, name: "Luffy Gear 5 T-Shirt", price: 24.99, category: "Apparel", rating: 4.7, image: "https://picsum.photos/400/400?random=103" },
  { id: 4, name: "Zoro's Enma Katana Replica", price: 89.99, category: "Accessories", rating: 4.9, image: "https://picsum.photos/400/400?random=104" },
  { id: 5, name: "Gojo Satoru Blindfold", price: 14.99, category: "Cosplay", rating: 4.6, image: "https://picsum.photos/400/400?random=105" },
  { id: 6, name: "Attack on Titan Scout Cloak", price: 34.99, category: "Apparel", rating: 4.8, image: "https://picsum.photos/400/400?random=106" },
  { id: 7, name: "Any Anime Mini Figure Set", price: 19.99, category: "Figures", rating: 4.5, image: "https://picsum.photos/400/400?random=107" },
  { id: 8, name: "Akatsuki Cloud Ring", price: 9.99, category: "Accessories", rating: 4.4, image: "https://picsum.photos/400/400?random=108" },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  // Initialize cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('bankaimise_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      return [];
    }
  });
  
  // Initialize login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bankaimise_cart', JSON.stringify(cart));
  }, [cart]);

  // Wrapper to switch views properly
  const handleSetCurrentView = (view: View) => {
    setSelectedProduct(null);
    setCurrentView(view);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('shop'); // Redirect to shop after successful login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCart([]); // Optional: Clear cart on logout
    setCurrentView('home');
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    if (!isLoggedIn) {
      // Force user to login if they try to add to cart without being authenticated
      alert("Please log in to add items to your cart.");
      setCurrentView('login');
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const filteredProducts = PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderHome = () => (
    <div className="space-y-12 pb-12 animate-fade-in">
      {/* Hero Section */}
      <div className="relative bg-gray-900 rounded-3xl overflow-hidden shadow-2xl mx-4 lg:mx-0 min-h-[500px] flex items-center">
        <div className="absolute inset-0 opacity-50">
           {/* Updated Hero Image */}
           <img src="https://files.pilku.com/user_uploads/1740292728860-image.png" className="w-full h-full object-cover" alt="Anime Hero Background"/>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
        <div className="relative z-10 max-w-2xl px-8 lg:px-12 py-12 text-white">
          <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-sm font-bold mb-6">
            New Arrivals
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Unleash Your<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Inner Otaku.
            </span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-lg">
            From high-quality figures to authentic cosplay gear. Explore the best merchandise from Naruto, One Piece, Demon Slayer, and more.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => handleSetCurrentView('shop')}
              className="px-8 py-3 bg-cyan-500 text-white rounded-xl font-bold hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-900/50 flex items-center"
            >
              Shop Now <ArrowRight size={20} className="ml-2" />
            </button>
            <button 
              onClick={() => handleSetCurrentView('chat')}
              className="px-8 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center"
            >
              Ask AI Assistant
            </button>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="px-4 lg:px-0">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Why Shop With Us?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { title: 'Authentic Merch', icon: Star, color: 'bg-yellow-100 text-yellow-600', desc: '100% Licensed Products' },
                { title: 'Secure Packaging', icon: Package, color: 'bg-blue-100 text-blue-600', desc: 'Safe delivery guaranteed' },
                { title: 'Fast Shipping', icon: Zap, color: 'bg-cyan-100 text-cyan-600', desc: 'Tracked global shipping' },
            ].map((feat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className={`p-4 rounded-xl ${feat.color}`}>
                        <feat.icon size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">{feat.title}</h3>
                        <p className="text-sm text-gray-500">{feat.desc}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Trending Products Preview */}
      <div className="px-4 lg:px-0">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Trending Accessories</h2>
          <button 
            onClick={() => handleSetCurrentView('shop')}
            className="text-cyan-600 font-semibold hover:text-cyan-700 flex items-center"
          >
            View All <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.slice(0, 4).map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={(p) => addToCart(p, 1)} 
              onClick={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      <Navbar 
        currentView={currentView} 
        setCurrentView={handleSetCurrentView}
        cartCount={cartCount}
        toggleCart={() => setIsCartOpen(true)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full pt-6 pb-12">
        {selectedProduct && currentView !== 'login' ? (
          <ProductDetails 
            product={selectedProduct} 
            relatedProducts={PRODUCTS.filter(p => p.id !== selectedProduct.id).slice(0, 4)}
            onBack={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
            onProductClick={setSelectedProduct}
          />
        ) : (
          <>
            {currentView === 'home' && renderHome()}
            
            {currentView === 'shop' && (
              <div className="px-4 lg:px-0 animate-fade-in">
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Anime Collection</h1>
                        <p className="text-gray-500">Browse the finest collection of items from the anime universe.</p>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="relative w-full md:w-72">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm"
                        placeholder="Search figures, apparel..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAddToCart={(p) => addToCart(p, 1)}
                        onClick={(p) => setSelectedProduct(p)} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Search className="text-gray-400" size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500 max-w-xs mx-auto">
                      We couldn't find any items matching "{searchQuery}". Try searching for something else like "Naruto" or "Figure".
                    </p>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="mt-6 text-cyan-600 font-semibold hover:text-cyan-700 hover:underline"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            )}

            {currentView === 'chat' && (
              <div className="px-4 lg:px-0 animate-fade-in h-full">
                <AIChat />
              </div>
            )}

            {currentView === 'login' && (
              <div className="px-4 lg:px-0">
                <Login onLogin={handleLogin} />
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col animate-slide-in">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold flex items-center">
                <ShoppingBag className="mr-2 text-cyan-600" size={20} /> Your Cart
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600">
                 {/* Close icon embedded to save import */}
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>Your cart is empty.</p>
                  <button onClick={() => { setIsCartOpen(false); handleSetCurrentView('shop'); }} className="mt-4 text-cyan-600 font-medium">Go Shopping</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-gray-50" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-gray-500 text-xs">${item.price}</p>
                      <div className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Total</span>
                <span className="text-xl font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
              </div>
              <button 
                disabled={cart.length === 0}
                className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;