export type AppView = 
  | 'home' 
  | 'scan' 
  | 'result' 
  | 'cart' 
  | 'checkout' 
  | 'member' 
  | 'orders' 
  | 'profile' 
  | 'coupons' 
  | 'policy';

export interface Product {
  id: string;
  name: string;
  price: number;
  tags: ('wood' | 'steel' | 'mix')[];
  img: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  birth: string;
  points: number;
  shoppingPoints: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'processing' | 'completed';
  items: string;
}

export interface StyleConfig {
  url: string;
  title: string;
  desc: string;
}