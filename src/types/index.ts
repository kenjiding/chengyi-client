export interface IProduct {
  id: string;
  name: string;
  score: number;
  description: string;
  price: number;
  category: string;
  images: string[];
  special?: number;
  features?: string;
  specifications?: Array<{
    name: string;
    value: string;
  }>;
  stock: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  specifications?: string[];
  applications?: string[];
} 

export interface CartItem {
  product: IProduct;
  quantity: number;
}
export interface Slide {
  id: number;
  title: string;
  src: string;
  subtitle: string;
  description: string;
  buttonText: string | null;
  buttonLink: string | null;
  type: 'image' | 'video';
  media: string;
  backgroundColor: string;
}

export interface ICollaboration {
  id?: number;
  name: string;
  image: string;
  count?: number;
}

export interface NewsItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  top: boolean;
  publishDate: string;
  type: 'news' | 'event';
  videoUrl?: string;
}

export interface IPaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}