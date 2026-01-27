
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity, onCheckout }) => {
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right duration-500">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Il Tuo Carrello</h2>
              <p className="text-xs text-gray-400 font-medium mt-1">{items.length} prodotti selezionati</p>
            </div>
            <button onClick={onClose} className="p-2.5 hover:bg-gray-100 rounded-2xl transition-all">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-8 space-y-8">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Carrello vuoto</h3>
                <p className="text-sm text-gray-400">Sembra che tu non abbia ancora aggiunto nulla.</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-6 group">
                  <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-grow py-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                      <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                    <p className="text-blue-600 font-bold text-sm mb-4">{item.price.toFixed(2)}€</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-gray-50 rounded-xl px-2 py-1 gap-4 border border-gray-100">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-lg transition-all">-</button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-lg transition-all">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-8 border-t border-gray-100 bg-gray-50/50">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Totale</span>
                <span className="text-3xl font-black text-gray-900">{total.toFixed(2)}€</span>
              </div>
              <p className="text-[10px] text-gray-400 text-right max-w-[120px]">Spedizione gratuita e tasse incluse</p>
            </div>
            <button 
              onClick={onCheckout}
              disabled={items.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-5 rounded-3xl shadow-2xl shadow-blue-200 transition-all active:scale-95 disabled:shadow-none"
            >
              Concludi Ordine
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
