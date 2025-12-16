import React, { useState } from 'react';
import { useApp } from '../App';
import { RESULT_IMAGES, DB_PRODUCTS } from '../constants';
import { DraggableCanvas } from '../components/DraggableCanvas';
import { generateGeminiText } from '../services/gemini';
import { Sparkles, Store, QrCode, Plus } from 'lucide-react';
import { Product } from '../types';

export const ResultView: React.FC = () => {
  const { designStyle, addToCart, navigate, showToast } = useApp();
  const config = RESULT_IMAGES[designStyle];
  const [description, setDescription] = useState(config.desc);
  const [isRewriting, setIsRewriting] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const recommendedProducts = DB_PRODUCTS.filter(p => p.tags.includes(designStyle));

  const handleRewrite = async () => {
    setIsRewriting(true);
    const prompt = `你是 MUJI 無印良品的空間設計師。請為一個「${designStyle}」風格的房間,寫一段簡短、富有詩意且強調生活感的設計理念。使用繁體中文,約50字。風格關鍵字:極簡、自然、留白、舒適。`;
    const newText = await generateGeminiText(prompt);
    if (newText) setDescription(newText);
    setIsRewriting(false);
  };

  const handleAddAll = () => {
    recommendedProducts.forEach(p => addToCart(p.id, 1));
    showToast('整套配置已加入購物車');
    setTimeout(() => navigate('cart'), 600);
  };

  return (
    <div className="p-6">
      {/* Concept Card */}
      <div className="bg-white p-5 rounded-lg shadow-sm mb-6 relative">
        <DraggableCanvas bgUrl={config.url} styleTag={designStyle} />
        
        <h3 className="text-lg font-bold text-muji-red mb-2">{config.title}</h3>
        <p className={`text-sm text-text-gray leading-relaxed text-justify transition-opacity ${isRewriting ? 'opacity-50' : 'opacity-100'}`}>
          {description}
        </p>

        <div className="flex gap-2.5 mt-4">
          <button 
            onClick={handleRewrite}
            disabled={isRewriting}
            className="inline-flex items-center gap-1 bg-[#FFF0F2] text-muji-red border border-muji-red px-2.5 py-1 rounded-full text-[11px] active:opacity-70"
          >
            <Sparkles size={12} /> {isRewriting ? '思考中...' : 'AI 靈感重寫'}
          </button>
          <button className="ml-auto flex items-center gap-1 bg-black text-white px-3 py-1 rounded-full text-[11px]">
             <span className="text-sm font-sans">@</span> 參加挑戰
          </button>
        </div>
      </div>

      <h3 className="text-base font-bold mb-2">為您配置的家具</h3>
      <div className="flex flex-col gap-4 mb-20">
        {recommendedProducts.map(p => (
          <ProductRow key={p.id} product={p} onAdd={() => addToCart(p.id, 1)} />
        ))}
      </div>

      {/* Store Promo */}
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-5 mb-6 relative overflow-hidden shadow-sm">
        <div className="absolute left-0 top-0 h-full w-1 bg-muji-red"></div>
        <div className="flex items-center gap-2 font-bold text-text-dark mb-2">
          <Store className="text-muji-red" size={20} />
          門市實品體驗
        </div>
        <p className="text-[13px] text-text-gray mb-4 leading-relaxed">
          想要親身感受家具質感嗎？前往 <b>信義旗艦店</b> 諮詢，掃描專屬條碼，即可獲得 <b>85折專屬優惠</b>。
        </p>
        <button onClick={() => setShowQR(true)} className="w-full bg-white border border-[#CCC] text-text-dark py-3 rounded flex items-center justify-center gap-2 text-sm font-medium">
          <QrCode size={18} /> 領取體驗憑證
        </button>
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-[95px] left-0 w-full px-5 pointer-events-none z-10">
        <button onClick={handleAddAll} className="w-full bg-muji-red text-white py-4 rounded font-medium shadow-xl pointer-events-auto active:scale-[0.98] transition-transform">
          將整套配置加入購物車
        </button>
      </div>

      {/* QR Modal */}
      {showQR && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/80 z-[2500] flex flex-col items-center justify-center p-8 animate-fade-in" onClick={() => setShowQR(false)}>
          <div className="bg-white w-full max-w-xs rounded-2xl p-6 text-center shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <h3 className="text-muji-red font-bold mb-1">門市體驗憑證</h3>
            <p className="text-xs text-gray-400 mb-4">MUJI XINYI FLAGSHIP STORE</p>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=MUJI_EXPERIENCE_USER_888" className="w-[180px] h-[180px] mx-auto border border-gray-100 p-2 mb-4" />
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              請向 <b>信義旗艦店 3F</b> 顧問出示此畫面。<br />
              完成體驗後將發送 <b>85 折優惠券</b>。
            </p>
            <button onClick={() => setShowQR(false)} className="w-full bg-muji-red text-white py-2 rounded">關閉</button>
          </div>
        </div>
      )}
    </div>
  );
};

const ProductRow: React.FC<{ product: Product, onAdd: () => void }> = ({ product, onAdd }) => (
  <div className="flex bg-white p-4 rounded-lg shadow-sm items-center">
    <div className="w-20 h-20 bg-gray-100 mr-4 shrink-0 rounded overflow-hidden">
      <img src={product.img} className="w-full h-full object-contain mix-blend-multiply" />
    </div>
    <div className="flex-1">
      <div className="font-bold text-sm mb-1">{product.name}</div>
      <div className="text-text-gray text-xs">NT$ {product.price.toLocaleString()}</div>
    </div>
    <button onClick={onAdd} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center bg-white active:bg-gray-50">
      <Plus size={18} className="text-muji-red" />
    </button>
  </div>
);