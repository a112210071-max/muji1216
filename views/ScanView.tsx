import React, { useRef, useState } from 'react';
import { useApp } from '../App';
import { Camera } from 'lucide-react';

export const ScanView: React.FC = () => {
  const { navigate, setScanImage, setDesignStyle, designStyle, showToast } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          const res = evt.target.result as string;
          setPreview(res);
          setScanImage(res);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRunAI = () => {
    if (!preview) {
      showToast('請先上傳空間照片');
      return;
    }
    setLoading(true);
    // Simulate AI processing time
    setTimeout(() => {
      setLoading(false);
      navigate('result');
    }, 2500);
  };

  if (loading) {
    return (
      <div className="absolute top-0 left-0 w-full h-full bg-white z-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-text-dark mb-4 border-none">MUJI AI</h2>
        <p className="text-text-gray animate-pulse">分析空間光源...</p>
        <div className="w-[200px] h-0.5 bg-gray-200 mt-5 overflow-hidden">
          <div className="h-full bg-muji-red animate-[width_2s_ease-in-out_forwards] w-0" style={{ width: '100%' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4 border-l-4 border-muji-red pl-3 tracking-wide">步驟1:空間取樣</h2>
      <p className="text-text-gray text-sm mb-4">請拍攝包含地板與牆角的完整空間,以利AI 測量尺寸。</p>
      
      <div 
        className={`w-full h-[280px] bg-[#EEE] border-2 border-dashed rounded-lg flex flex-col items-center justify-center relative overflow-hidden mb-6 transition-all ${preview ? 'border-muji-red border-solid' : 'border-[#CCC]'}`}
        onClick={() => fileInputRef.current?.click()}
      >
        {!preview ? (
          <div className="text-center">
            <Camera size={40} className="text-[#999] mx-auto mb-2" />
            <div className="text-[#999] text-sm">點擊開啟相機</div>
          </div>
        ) : (
          <img src={preview} alt="preview" className="w-full h-full object-cover" />
        )}
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
      </div>

      <h2 className="text-lg font-bold mb-4 border-l-4 border-muji-red pl-3 tracking-wide">步驟2:選擇生活風格</h2>
      <div className="grid grid-cols-3 gap-2.5 mb-8">
        {[
          { id: 'wood', label: '原木溫潤', img: 'https://i.imgur.com/fWMS708.jpg' },
          { id: 'steel', label: '鋼製洗鍊', img: 'https://www.muji.tw/tw/interior_advisor/case/img/case04_5.jpg' },
          { id: 'mix', label: '麻系收納', img: 'https://today-obs.line-scdn.net/0hRSl86BaeDXxRQROqkYlyK2kXAQ1iJxd1cyMRT3ZGUUV-bU4vPyZeH3cTVFB0IxkucSVDHiFAUR4uI04iZQ/w1200' }
        ].map((style) => (
          <div 
            key={style.id}
            className={`bg-white border-2 rounded-md p-1.5 pb-2 text-center cursor-pointer transition-all shadow-sm ${designStyle === style.id ? 'border-muji-red bg-red-50' : 'border-transparent'}`}
            onClick={() => setDesignStyle(style.id as any)}
          >
            <img src={style.img} alt={style.label} className={`w-full h-[80px] object-cover rounded mb-2 transition-opacity ${designStyle === style.id ? 'opacity-100' : 'opacity-80'}`} />
            <div className="text-xs font-bold text-[#555]">{style.label}</div>
          </div>
        ))}
      </div>

      <button onClick={handleRunAI} className="btn btn-primary bg-muji-red text-white w-full py-3.5 rounded font-medium">
        生成空間提案
      </button>
    </div>
  );
};