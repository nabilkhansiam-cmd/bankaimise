export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'Figures' | 'Apparel' | 'Accessories' | 'Mystery Box' | 'Cosplay';
  image: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type View = 'home' | 'shop' | 'chat' | 'login';