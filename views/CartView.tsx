import React, { useState } from 'react';
import { useApp } from '../App';
import { DB_PRODUCTS } from '../constants';
import { ChevronRight, Minus, Plus } from 'lucide-react';

export const CartView: React.FC = () => {
  const { cart, addToCart, navigate } = useApp();
  const [showThreadModal, setShowThreadModal] = useState(false);

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const product = DB_PRODUCTS.find(p => p.id === id);
    return product ? { ...product, qty } : null;
  }).filter(Boolean) as (typeof DB_PRODUCTS[0] & { qty: number })[];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shipping = cartItems.length > 0 ? 1200 : 0;
  const discount = cartItems.length >= 3 ? 2000 : 0;
  const total = Math.max(0, subtotal + shipping - discount);

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4 border-l-4 border-muji-red pl-3 tracking-wide">購物車內容</h2>
      
      <div className="mb-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-10 text-gray-400">購物車是空的</div>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="flex bg-white p-4 rounded-lg shadow-sm items-center mb-3">
              <div className="w-12 h-12 bg-gray-100 mr-4 rounded overflow-hidden">
                <img src={item.img} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm mb-1">{item.name}</div>
                <div className="text-xs">NT$ {item.price.toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => addToCart(item.id, -1)} className="w-6 h-6 rounded-full border flex items-center justify-center text-gray-500"><Minus size={14}/></button>
                <span className="text-sm w-4 text-center">{item.qty}</span>
                <button onClick={() => addToCart(item.id, 1)} className="w-6 h-6 rounded-full border flex items-center justify-center text-gray-500"><Plus size={14}/></button>
              </div>
            </div>
          ))
        )}
      </div>

      <div 
        onClick={() => setShowThreadModal(true)}
        className="bg-gradient-to-r from-black to-gray-800 text-white p-4 rounded-lg mb-6 flex items-center gap-3 cursor-pointer shadow-lg relative overflow-hidden"
      >
        <div className="font-sans text-2xl font-bold italic opacity-30 absolute -right-2 -bottom-4 text-[80px]">@</div>
        <div className="flex-1 z-10">
          <div className="font-bold text-sm">Threads 設計挑戰賽</div>
          <div className="text-[11px] opacity-80">分享設計贏取懶骨頭沙發</div>
        </div>
        <ChevronRight size={20} className="z-10" />
      </div>

      <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between py-2 border-b border-gray-100 text-sm"><span>商品合計</span><span>NT$ {subtotal.toLocaleString()}</span></div>
        <div className="flex justify-between py-2 border-b border-gray-100 text-sm"><span>大型家具運費</span><span>NT$ {shipping.toLocaleString()}</span></div>
        <div className="flex justify-between py-2 text-sm text-muji-red"><span>組合優惠</span><span>- NT$ {discount.toLocaleString()}</span></div>
        <div className="flex justify-between pt-4 text-lg font-bold text-muji-red"><span>總金額</span><span>NT$ {total.toLocaleString()}</span></div>
      </div>

      <button 
        onClick={() => navigate('checkout')}
        disabled={cartItems.length === 0}
        className="w-full bg-[#333] disabled:bg-gray-300 text-white py-4 rounded font-medium"
      >
        前往結帳
      </button>

      {/* Threads Modal */}
      {showThreadModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/90 z-[100] flex flex-col items-center justify-center p-8 animate-fade-in text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Threads 設計挑戰</h2>
          <p className="text-gray-300 mb-6 text-sm">分享您的AI 空間設計到 Threads<br/>標註 #MUJI Space #MyMujiRoom<br/>按讚數最高前三名即可獲獎</p>
          
          <div className="bg-[#111] border border-[#333] rounded-xl p-6 w-full mb-6">
            <RewardRow rank="🥇" name="MUJI 懶骨頭沙發組" desc="最極致的放鬆體驗(價值$4,200)" />
            <RewardRow rank="🥈" name="空氣循環風扇/大" desc="促進室內空氣流動(價值$2,980)" />
            <RewardRow rank="🥉" name="超音波芬香噴霧器" desc="營造溫馨香氛空間(價值$1,690)" />
          </div>

          <button className="bg-white text-black w-full py-3 rounded font-bold mb-3" onClick={() => setShowThreadModal(false)}>立即開始設計</button>
          <button className="text-gray-500 text-sm underline" onClick={() => setShowThreadModal(false)}>關閉</button>
        </div>
      )}
    </div>
  );
};

const RewardRow = ({ rank, name, desc }: any) => (
  <div className="flex items-center gap-3 mb-3 bg-[#222] p-2.5 rounded-lg text-left">
    <div className="text-xl w-8 text-center">{rank}</div>
    <div>
      <div className="font-bold text-sm text-white">{name}</div>
      <div className="text-[10px] text-gray-500">{desc}</div>
    </div>
  </div>
);