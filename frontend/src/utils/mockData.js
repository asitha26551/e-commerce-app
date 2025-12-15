// Plain mock data exports for use across pages/components
export const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 99.99,
    stock: 32,
    rating: 4.5,
    reviewCount: 128,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'Wearables',
    price: 149.0,
    stock: 12,
    rating: 4.8,
    reviewCount: 89,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 3,
    name: 'Laptop Stand',
    category: 'Electronics',
    price: 49.99,
    stock: 45,
    rating: 4.2,
    reviewCount: 56,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=60',
    ],
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 129.99,
    stock: 18,
    rating: 4.7,
    reviewCount: 203,
    isBestSeller: true,
    isNew: true,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=60',
    ],
  },
]

export const mockOrders = [
  { id: 'ORD-1001', date: '2024-10-12', total: 199.99, status: 'Delivered' },
  { id: 'ORD-1002', date: '2024-10-15', total: 89.5, status: 'Shipped' },
  { id: 'ORD-1003', date: '2024-10-18', total: 29.0, status: 'Processing' },
]

export const categories = [
  {
    id: 'cat-1',
    name: 'Electronics',
    image:
      'https://images.unsplash.com/photo-1518779578993-66fe3a3c88b8?w=600&auto=format&fit=crop&q=60',
    itemCount: 124,
  },
  {
    id: 'cat-2',
    name: 'Fashion',
    image:
      'https://images.unsplash.com/photo-1520974735194-2048e1066a95?w=600&auto=format&fit=crop&q=60',
    itemCount: 76,
  },
]
