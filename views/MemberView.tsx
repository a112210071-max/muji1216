import React from 'react';
import { useApp } from '../App';
import { Barcode, QrCode, Package, Ticket, UserGear, Info, Headset, CaretRight, InstagramLogo, FacebookLogo } from '@phosphor-icons/react'; // Using phosphor here via generic icon wrapper approach or switch to lucide equivalents
// Actually switching to Lucide for consistency as I imported lucide in Layout
import { ScanBarcode, QrCode as QrIcon, Package as PkgIcon, Ticket as TicketIcon, Settings, Info as InfoIcon, Headset as HeadsetIcon, ChevronRight, Instagram, Facebook } from 'lucide-react';

interface MemberViewProps {
  initialTab?: string;
}

export const MemberView: React.FC<MemberViewProps> = ({ initialTab }) => {
  const { user, navigate } = useApp();

  return (
    <div className="p-6">
      <div className="bg-gradient-to-br from-[#7F0019] to-[#590012] text-white rounded-xl p-5 h-[180px] shadow-lg flex flex-col justify-between relative overflow-hidden mb-6">
        <ScanBarcode size={140} className="absolute -right-5 -bottom-5 opacity-10" />
        <div className="flex justify-between items-start">
          <div>
            <div className="text-xs opacity-80">MUJI PASSPORT</div>
            <div className="text-lg font-bold mt-1">{user.name ? user.name.toUpperCase() : 'GUEST'}</div>
          </div>
          <div className="bg-white/20 px-2.5 py-1 rounded-full text-[10px] tracking-widest">SILVER STAGE</div>
        </div>
        <div className="flex gap-8 relative z-10">
          <div>
            <label className="block text-[10px] opacity-80 mb-0.5">MUJI Mile</label>
            <span className="text-2xl font-bold font-mono">{user.points.toLocaleString()}</span>
          </div>
          <div>
            <label className="block text-[10px] opacity-80 mb-0.5">購物點數</label>
            <span className="text-2xl font-bold font-mono">{user.shoppingPoints}</span>
          </div>
        </div>
        <QrIcon size={32} className="absolute right-5 bottom-5" />
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-5">
        <MenuItem icon={<QrIcon size={20}/>} label="我的體驗憑證" />
        <MenuItem icon={<PkgIcon size={20}/>} label="我的訂單" onClick={() => navigate('orders')} />
        <MenuItem icon={<TicketIcon size={20}/>} label="優惠券夾" onClick={() => navigate('coupons')} />
        <MenuItem icon={<Settings size={20}/>} label="個人資料設定" onClick={() => navigate('profile')} />
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-5">
        <MenuItem icon={<InfoIcon size={20}/>} label="消費者權益中心" onClick={() => navigate('policy')} />
        <MenuItem icon={<HeadsetIcon size={20}/>} label="聯絡 AI 客服" />
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <MenuItem icon={<Instagram size={20}/>} label="追蹤 Instagram" />
        <MenuItem icon={<Facebook size={20}/>} label="追蹤 Facebook" />
      </div>
      
      <p className="text-center text-gray-300 text-[10px] mt-6">會員 ID: 2938 1029 3847<br/>version 2.7.0</p>
    </div>
  );
};

const MenuItem: React.FC<{ icon: React.ReactNode, label: string, onClick?: () => void }> = ({ icon, label, onClick }) => (
  <div onClick={onClick} className="p-4 border-b border-gray-50 flex items-center justify-between cursor-pointer active:bg-gray-50 last:border-none">
    <div className="flex items-center gap-3 text-text-dark text-[15px]">
      <span className="text-gray-400">{icon}</span> {label}
    </div>
    <ChevronRight size={16} className="text-gray-300" />
  </div>
);