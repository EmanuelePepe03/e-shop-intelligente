
import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem } from './types';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import ChatAssistant from './components/ChatAssistant';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tutti");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory === "Tutti" || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCart([]);
    setShowCheckoutSuccess(true);
    setTimeout(() => setShowCheckoutSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 selection:bg-blue-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-gray-900">EShop<span className="text-blue-600">Smart</span></h1>
          </div>

          <div className="flex-grow max-w-2xl relative group">
            <input 
              type="text" 
              placeholder="Cerca il tuo prossimo tech gadget..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100/80 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/30 text-sm transition-all placeholder:text-gray-400"
            />
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative bg-gray-100 hover:bg-gray-200 p-3 rounded-2xl transition-all"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {/* Banner */}
        <div className="mb-16 bg-blue-600 rounded-[40px] p-8 sm:p-16 text-white relative overflow-hidden flex flex-col items-start justify-center shadow-3xl shadow-blue-500/20">
          <div className="relative z-10 max-w-xl">
            <span className="inline-block bg-blue-400/30 backdrop-blur px-3 py-1 rounded-full text-xs font-bold mb-6 uppercase tracking-widest">Offerta del mese</span>
            <h2 className="text-4xl sm:text-6xl font-black leading-[1.1] mb-6">Upgrade your life with Smart Tech.</h2>
            <p className="text-blue-100 text-lg mb-10 opacity-90">Scopri la nuova selezione di prodotti hi-tech scelti appositamente per te.</p>
            <button className="bg-white text-blue-700 font-bold px-10 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all active:scale-95">
              Scopri Collezione
            </button>
          </div>
          <div className="absolute right-[-10%] bottom-[-20%] w-[60%] h-[140%] bg-white/5 rounded-full blur-3xl pointer-events-none transform rotate-45"></div>
        </div>

        {/* Filters & Grid */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                      : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p className="text-gray-400 text-sm font-medium">Mostrando {filteredProducts.length} risultati</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ops! Nessun prodotto</h3>
              <p className="text-gray-500">Prova con un'altra parola chiave o categoria.</p>
            </div>
          )}
        </section>
      </main>

      {/* Success Notification */}
      {showCheckoutSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-full">
          <div className="bg-green-600 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            <span className="font-bold">Ordine completato con successo! Grazie.</span>
          </div>
        </div>
      )}

      {/* Components */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />
      <ChatAssistant />

      <footer className="mt-20 border-t border-gray-100 py-16 px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <h2 className="text-xl font-black mb-4">EShopSmart</h2>
            <p className="text-gray-400 text-sm leading-relaxed">Il tuo shop di fiducia per la tecnologia di ultima generazione. Spedizioni veloci e assistenza intelligente inclusa.</p>
          </div>
          <div className="flex gap-20">
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-gray-900">Catalogo</h4>
              <span className="text-sm text-gray-400 cursor-pointer hover:text-blue-600 transition-colors">Nuovi Arrivi</span>
              <span className="text-sm text-gray-400 cursor-pointer hover:text-blue-600 transition-colors">Più Venduti</span>
              <span className="text-sm text-gray-400 cursor-pointer hover:text-blue-600 transition-colors">Promozioni</span>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-gray-900">Supporto</h4>
              <span className="text-sm text-gray-400 cursor-pointer hover:text-blue-600 transition-colors">Spedizioni</span>
              <span className="text-sm text-gray-400 cursor-pointer hover:text-blue-600 transition-colors">FAQ</span>
              <span className="text-sm text-gray-400 cursor-pointer hover:text-blue-600 transition-colors">Contatti</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-300 font-medium">
          <p>© 2024 EShopSmart Inc. Designed with Love.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <span className="hover:text-gray-500 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-500 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
