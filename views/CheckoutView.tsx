import React, { useState } from 'react';
import { useApp } from '../App';

export const CheckoutView: React.FC = () => {
  const { user, showToast, showModal, navigate, cart, clearCart, addOrder } = useApp();
  const [formData, setFormData] = useState({ name: user.name, phone: user.phone, addr: '' });
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.addr) return showToast('請完整填寫配送資料');
    if (!agreed) return showToast('請同意消費者條款');

    const total = Object.values(cart).length * 1000 + 1200; // Mock calculation
    const orderId = '24' + Math.floor(Math.random() * 1000000);
    
    addOrder({
      id: orderId,
      date: new Date().toISOString().split('T')[0].replace(/-/g, '/'),
      total,
      status: 'processing',
      items: `MUJI 家具組合 x${Object.keys(cart).length}`
    });
    
    clearCart();
    showModal(`感謝您的訂購, ${formData.name}。\n我們將盡快安排配送至: ${formData.addr}`);
    navigate('orders');
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4 border-l-4 border-muji-red pl-3 tracking-wide">訂單確認</h2>
      
      <div className="bg-white p-5 rounded-lg shadow-sm mb-5">
        <h3 className="font-bold mb-3 text-sm">配送資訊</h3>
        <input 
          className="w-full p-3 mb-3 border border-gray-200 rounded text-sm bg-gray-50" 
          placeholder="收件人姓名" 
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
        />
        <input 
          className="w-full p-3 mb-3 border border-gray-200 rounded text-sm bg-gray-50" 
          placeholder="手機號碼" 
          value={formData.phone}
          onChange={e => setFormData({...formData, phone: e.target.value})}
        />
        <input 
          className="w-full p-3 border border-gray-200 rounded text-sm bg-gray-50" 
          placeholder="配送地址(請包含樓層)" 
          value={formData.addr}
          onChange={e => setFormData({...formData, addr: e.target.value})}
        />
      </div>

      <div className="bg-white p-5 rounded-lg shadow-sm mb-5">
        <h3 className="font-bold mb-3 text-sm">付款方式</h3>
        <div className="flex gap-2.5 mb-4">
          <div className="flex-1 py-2.5 border border-muji-red text-muji-red text-center rounded text-xs font-bold">信用卡</div>
          <div className="flex-1 py-2.5 border border-gray-200 text-center rounded text-xs text-gray-500">LINE Pay</div>
        </div>
        <input className="w-full p-3 border border-gray-200 rounded text-sm bg-gray-50 text-gray-400" value="**** **** **** 8888" disabled />
      </div>

      <div className="flex items-start gap-2 mb-6">
        <input type="checkbox" id="policy" className="mt-1" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
        <label htmlFor="policy" className="text-xs text-gray-600 leading-relaxed">
          我已閱讀並同意 <span className="underline">消費者權益須知</span> 與 <span className="underline">退換貨政策</span>。
        </label>
      </div>

      <button onClick={handleSubmit} className="w-full bg-muji-red text-white py-3.5 rounded font-medium">提交訂單</button>
    </div>
  );
};