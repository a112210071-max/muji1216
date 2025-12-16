import { Product, StyleConfig } from './types';

export const DB_PRODUCTS: Product[] = [
  { id: 'w1', name: '白橡木收納床/雙人', price: 15900, tags: ['wood'], img: 'https://images.unsplash.com/photo-1505693416388-b0346ef41439?w=200&q=80' },
  { id: 'w2', name: '橡木無垢材餐桌', price: 11000, tags: ['wood'], img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=200&q=80' },
  { id: 'w3', name: '棉平織床組/米色', price: 2100, tags: ['wood', 'mix'], img: 'https://images.unsplash.com/photo-1522771753035-4a503567439f?w=200&q=80' },
  { id: 's1', name: 'SUS 鋼製層架組/寬', price: 5600, tags: ['steel'], img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200&q=80' },
  { id: 's2', name: '聚丙烯檔案盒/白', price: 300, tags: ['steel', 'mix', 'wood'], img: 'https://images.unsplash.com/photo-1589584649628-b4c65e8992dc?w=200&q=80' },
  { id: 's3', name: '鋼製折疊椅', price: 1200, tags: ['steel'], img: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=200&q=80' },
  { id: 'm1', name: '懶骨頭沙發/本體', price: 4200, tags: ['mix', 'wood', 'steel'], img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=80&q=80' },
  { id: 'm2', name: '拉菲草編織籃', price: 890, tags: ['mix', 'wood'], img: 'https://images.unsplash.com/photo-1516315720717-d6b1d473468c?w=200&q=80' },
  { id: 'm3', name: '超音波芬香噴霧器', price: 1690, tags: ['mix', 'wood', 'steel'], img: 'https://images.unsplash.com/photo-1602143407151-01114192003b?w=200&q=80' }
];

export const RESULT_IMAGES: Record<string, StyleConfig> = {
  wood: {
    url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
    title: "原木溫潤提案",
    desc: "以白橡木為主調,搭配米色織品。透過低重心的家具配置,讓光線在空間中自由流動,營造出寧靜致遠的日式居家氛圍。"
  },
  steel: {
    url: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
    title: "鋼製洗鍊提案",
    desc: "結合 SUS 鋼製層架與純白收納盒。強調功能的極致展現,將生活雜物系統化收納,打造現代且高效率的 Compact Life。"
  },
  mix: {
    url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
    title: "麻系自然提案",
    desc: "利用天然素材如亞麻與藤編,為空間注入有機的溫暖。不追求過度修飾,展現素材最原始的質感,適合喜愛自然生活的您。"
  }
};