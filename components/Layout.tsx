import React from 'react';
import { useApp } from '../App';
import { House, Scan, ShoppingBag, User, ChevronLeft, Check } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  toastMsg: string | null;
  modalMsg: string | null;
  closeModal: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, toastMsg, modalMsg, closeModal }) => {
  const { view, navigate, goBack, cart } = useApp();

  const showNav = ['home', 'scan', 'cart', 'member', 'result', 'orders', 'profile', 'coupons', 'policy'].includes(view);
  const showBackBtn = !['home', 'scan', 'cart', 'member'].includes(view);
  
  // Calculate cart count
  const cartCount = Object.values(cart).reduce((a: number, b: number) => a + b, 0);

  return (
    <>
      {/* Header */}
      <header className="h-[60px] flex items-center justify-center bg-white/95 border-b border-black/5 absolute top-0 w-full z-20 pt-[env(safe-area-inset-top)] backdrop-blur-sm">
        {showBackBtn && (
          <div className="absolute left-5 bottom-[18px] text-2xl cursor-pointer text-text-dark active:opacity-60" onClick={goBack}>
            <ChevronLeft size={24} />
          </div>
        )}
        <div className="font-extrabold text-muji-red text-2xl tracking-tighter">MUJI</div>
      </header>

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto overflow-x-hidden pt-[80px] ${showNav ? 'pb-[100px]' : 'pb-[40px]'} w-full bg-muji-bg no-scrollbar`}>
        <div className="animate-fade-in h-full">
            {children}
        </div>
      </main>

      {/* Navigation Bar */}
      {showNav && (
        <nav className="absolute bottom-0 w-full h-[85px] bg-white/98 border-t border-gray-200 flex justify-around z-30 pt-2.5 pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
          <NavItem 
            icon={<House weight={view === 'home' ? 'fill' : 'regular'} size={24} />} 
            label="首頁" 
            active={view === 'home'} 
            onClick={() => navigate('home')} 
          />
          <NavItem 
            icon={<Scan weight={['scan', 'result'].includes(view) ? 'fill' : 'regular'} size={24} />} 
            label="設計" 
            active={['scan', 'result'].includes(view)} 
            onClick={() => navigate('scan')} 
          />
          <NavItem 
            icon={<ShoppingBag weight={view === 'cart' ? 'fill' : 'regular'} size={24} />} 
            label="購物車" 
            active={view === 'cart'} 
            onClick={() => navigate('cart')} 
            badge={cartCount}
          />
          <NavItem 
            icon={<User weight={['member', 'profile', 'orders'].includes(view) ? 'fill' : 'regular'} size={24} />} 
            label="會員" 
            active={['member', 'profile', 'orders', 'coupons', 'policy'].includes(view)} 
            onClick={() => navigate('member')} 
          />
        </nav>
      )}

      {/* Toast */}
      <div className={`absolute top-[80px] left-0 w-full flex justify-center pointer-events-none z-[1000] transition-all duration-300 ${toastMsg ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        <div className="bg-[#323232]/95 text-white px-5 py-2.5 rounded shadow-lg text-sm flex items-center gap-2">
          <Check size={16} />
          <span>{toastMsg}</span>
        </div>
      </div>

      {/* Modal Alert */}
      {modalMsg && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-[2000] flex justify-center items-center p-5 animate-fade-in">
          <div className="bg-white rounded-lg p-6 w-full max-w-[300px] text-center shadow-xl animate-scale-in">
            <p className="mb-6 leading-relaxed text-text-dark whitespace-pre-line">{modalMsg}</p>
            <button className="w-full bg-muji-red text-white py-2.5 rounded font-medium active:opacity-90" onClick={closeModal}>
              確定
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void, badge?: number }> = ({ icon, label, active, onClick, badge }) => (
  <div className={`flex flex-col items-center w-1/4 cursor-pointer transition-colors ${active ? 'text-muji-red' : 'text-[#AAAAAA]'}`} onClick={onClick}>
    <div className="relative">
      {icon}
      {badge ? <span className="absolute -top-1 -right-2 bg-muji-red text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{badge}</span> : null}
    </div>
    <span className="text-[11px] mt-1">{label}</span>
  </div>
);