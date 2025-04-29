export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string
}

export interface Product {
  _id: string
  product_name: string;
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
  product_types: string;
  images: string[];
  email: string;
  phone_number: string;
  address: string;
  status: string
}

export interface Blog {
  _id: string;
  title: string;
  date: string;
  author: string;
  description: string;
  image: string;
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