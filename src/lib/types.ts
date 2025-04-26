export interface Blog {
  _id: string;
  title: string;
  date: string;
  author: string;
  description: string;
  image: string;
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
