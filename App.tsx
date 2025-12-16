import React, { useState, createContext, useContext, useEffect, useCallback } from 'react';
import { Product, CartItem, UserProfile, Order, AppView } from './types';
import { DB_PRODUCTS } from './constants';
import { Layout } from './components/Layout';
import { HomeView } from './views/HomeView';
import { ScanView } from './views/ScanView';
import { ResultView } from './views/ResultView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { MemberView } from './views/MemberView';
import { OrdersView } from './views/OrdersView';
import { ProfileView } from './views/ProfileView';
import { AIChat } from './components/AIChat';

// --- Context ---
interface AppContextType {
  view: AppView;
  navigate: (view: AppView) => void;
  goBack: () => void;
  user: UserProfile;
  updateUser: (data: Partial<UserProfile>) => void;
  cart: Record<string, number>;
  addToCart: (productId: string, qty: number) => void;
  clearCart: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  scanImage: string | null;
  setScanImage: (img: string | null) => void;
  designStyle: 'wood' | 'steel' | 'mix';
  setDesignStyle: (style: 'wood' | 'steel' | 'mix') => void;
  showToast: (msg: string) => void;
  showModal: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// --- Main Component ---
const App: React.FC = () => {
  // Navigation State
  const [view, setView] = useState<AppView>('home');
  const [history, setHistory] = useState<AppView[]>(['home']);

  // Data State
  const [user, setUser] = useState<UserProfile>({
    name: '',
    phone: '',
    email: '',
    birth: '',
    points: 12500,
    shoppingPoints: 150
  });
  
  const [cart, setCart] = useState<Record<string, number>>({});
  const [orders, setOrders] = useState<Order[]>([
    { id: '240501001', date: '2024/05/01', total: 4500, status: 'completed', items: '懶骨頭沙發 x1, 檔案盒x1' },
    { id: '240515088', date: '2024/05/15', total: 1200, status: 'processing', items: '鋼製折疊椅 x1' }
  ]);
  
  const [scanImage, setScanImage] = useState<string | null>(null);
  const [designStyle, setDesignStyle] = useState<'wood' | 'steel' | 'mix'>('wood');

  // UI State
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [modalMsg, setModalMsg] = useState<string | null>(null);

  // --- Actions ---
  const navigate = useCallback((newView: AppView) => {
    setHistory(prev => [...prev, newView]);
    setView(newView);
  }, []);

  const goBack = useCallback(() => {
    if (history.length <= 1) return;
    const newHistory = [...history];
    newHistory.pop(); // Remove current
    const prevView = newHistory[newHistory.length - 1];
    setHistory(newHistory);
    setView(prevView);
  }, [history]);

  const updateUser = (data: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  const addToCart = (productId: string, qty: number) => {
    setCart(prev => {
      const current = prev[productId] || 0;
      const next = current + qty;
      if (next <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: next };
    });
    showToast(qty > 0 ? '已加入購物車' : '已更新購物車');
  };

  const clearCart = () => setCart({});

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const showModal = (msg: string) => {
    setModalMsg(msg);
  };

  // --- Render ---
  return (
    <AppContext.Provider value={{
      view, navigate, goBack,
      user, updateUser,
      cart, addToCart, clearCart,
      orders, addOrder,
      scanImage, setScanImage,
      designStyle, setDesignStyle,
      showToast, showModal
    }}>
      <Layout 
        toastMsg={toastMsg} 
        modalMsg={modalMsg} 
        closeModal={() => setModalMsg(null)}
      >
        {view === 'home' && <HomeView />}
        {view === 'scan' && <ScanView />}
        {view === 'result' && <ResultView />}
        {view === 'cart' && <CartView />}
        {view === 'checkout' && <CheckoutView />}
        {view === 'member' && <MemberView />}
        {view === 'orders' && <OrdersView />}
        {view === 'profile' && <ProfileView />}
        {view === 'coupons' && <MemberView initialTab="coupons" />} 
        {view === 'policy' && <MemberView initialTab="policy" />}
      </Layout>
      <AIChat />
    </AppContext.Provider>
  );
};

export default App;