export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string
}

export interface Product {
  _id: string;
  productName: string;
  category: string;
  price: number;
  availability: string;
  rating: number;
  description: string;
  quantity: number;
  details: string;
  color: string;
  size: string;
  manufacturer: string;
  productTypes: string;
  images: string[];
  email: string;
  phoneNumber: string;
  address: string;
  status: string;
}

export interface Wishlist {
  _id: string;
  productId: string;
  productName: string;
  productImage: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  _id: string;
  productId: string;
  productName: string;
  productImage: string;
  productPrice: number;
  quantity: number;
  userId: string;
}

export interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  coverImage: string; 
  content: string; 
  readTime: string;
  status: string;
}

export interface OrderItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface OrderTimelineStep {
  status: string;
  date: string;
  time?: string;
  completed: boolean;
  current?: boolean;
}

interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  statusText: string;
  estimatedDelivery: string;
  deliveredDate?: string;
  trackingNumber: string;
  carrier: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  timeline: OrderTimelineStep[];
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
}

export interface TimelineStep {
  status: string;
  date: string;
  time?: string; // Optional property
  completed: boolean;
  current?: boolean; // Optional property
}