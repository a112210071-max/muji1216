import React from 'react';
import { useApp } from '../App';
import { ArrowRight } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { navigate, user } = useApp();

  return (
    <div className="h-full flex flex-col justify-end bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1000&auto=format&fit=crop')" }}>
      <div className="bg-white/95 backdrop-blur-sm p-8 pb-32 rounded-t-[20px]">
        <h1 className="text-2xl font-bold tracking-wider leading-tight text-text-dark">
          {user.name ? `Hi, ${user.name}` : '感覺良好的生活'}<br />由此開始
        </h1>
        <p className="mt-4 mb-8 text-text-gray text-sm leading-relaxed text-justify">
          透過 AI 智能演算,將雜亂的空間轉換為 MUJI 風格的舒適角落。我們提供的不只是家具,而是生活的餘裕。
        </p>
        <button 
          onClick={() => navigate('scan')}
          className="w-full bg-muji-red text-white py-4 rounded text-[15px] font-medium flex items-center justify-center gap-2 active:opacity-90 transition-opacity"
        >
          上傳空間照片 <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};