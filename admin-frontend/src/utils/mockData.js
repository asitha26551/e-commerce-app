// src/data/mockData.js

export const products = [
  {
    id: 1,
    name: 'Wireless Noise-Cancelling Headphones',
    category: 'Electronics',
    price: 299.99,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    ],
    description: 'Premium wireless headphones with active noise cancellation.',
  },
  {
    id: 2,
    name: 'Ergonomic Office Chair',
    category: 'Furniture',
    price: 349.0,
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80',
    ],
    description: 'Comfortable office chair with lumbar support.',
  },
  {
    id: 3,
    name: 'Smart Watch Series 5',
    category: 'Electronics',
    price: 399.0,
    stock: 0,
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80',
    ],
    description: 'Advanced smartwatch with health tracking features.',
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 129.5,
    stock: 28,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=500&q=80',
    ],
    description: 'Tactile mechanical keyboard with RGB backlighting.',
  },
  {
    id: 5,
    name: 'Minimalist Desk Lamp',
    category: 'Furniture',
    price: 45.0,
    stock: 150,
    images: [
      'https://images.unsplash.com/photo-1507473888900-52e1adad5420?w=500&q=80',
    ],
    description: 'LED desk lamp with adjustable brightness.',
  },
]

export const mockOrders = [
  {
    id: '#ORD-7782',
    date: '2023-10-24T10:30:00',
    total: 429.99,
    status: 'Delivered',
  },
  {
    id: '#ORD-7783',
    date: '2023-10-24T14:15:00',
    total: 129.5,
    status: 'Processing',
  },
  {
    id: '#ORD-7784',
    date: '2023-10-23T09:45:00',
    total: 899.0,
    status: 'Shipped',
  },
  {
    id: '#ORD-7785',
    date: '2023-10-22T16:20:00',
    total: 55.0,
    status: 'Cancelled',
  },
  {
    id: '#ORD-7786',
    date: '2023-10-22T11:00:00',
    total: 299.99,
    status: 'Delivered',
  },
]

export const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    image:
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80',
    itemCount: 124,
  },
  {
    id: 'furniture',
    name: 'Furniture',
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&q=80',
    itemCount: 85,
  },
  {
    id: 'clothing',
    name: 'Clothing',
    image:
      'https://images.unsplash.com/photo-1445205170230-05328324f30f?w=500&q=80',
    itemCount: 342,
  },
  {
    id: 'books',
    name: 'Books',
    image:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80',
    itemCount: 56,
  },
]
