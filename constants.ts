
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Smartphone X Pro",
    description: "Display OLED da 6.7 pollici, fotocamera 108MP e batteria a lunga durata.",
    price: 999.00,
    category: "Elettronica",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Laptop Air Ultra",
    description: "Chip M3, 16GB RAM, SSD 512GB. Sottile, leggero e incredibilmente potente.",
    price: 1299.00,
    category: "Informatica",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Cuffie Wireless Pro",
    description: "Cancellazione attiva del rumore e 40 ore di autonomia. Qualità audio premium.",
    price: 349.00,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Smartwatch Sport v2",
    description: "Monitoraggio ECG, GPS integrato e impermeabile fino a 50 metri.",
    price: 199.00,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Tablet Vision 11",
    description: "Display Liquid Retina, compatibile con penna capacitiva. Ideale per artisti.",
    price: 749.00,
    category: "Elettronica",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Console GameMax",
    description: "4K Native, 120fps. La nuova generazione del gaming nel tuo salotto.",
    price: 499.00,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
  }
];

export const CATEGORIES = ["Tutti", "Elettronica", "Informatica", "Audio", "Wearables", "Gaming"];
