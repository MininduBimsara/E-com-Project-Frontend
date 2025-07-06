// Admin Dashboard Types

export interface DashboardStats {
  users: number;
  products: number;
  orders: number;
  revenue: number;
  status: {
    userService: string;
    productService: string;
    orderService: string;
  };
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  lastLoginAt?: string;
  orders?: number;
  totalSpent?: number;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  status: string;
  createdAt: string;
  sold?: number;
  rating?: number;
}

export interface Order {
  _id: string;
  customer: string;
  customerEmail: string;
  total: number;
  status: string;
  createdAt: string;
  items: number;
  paymentMethod?: string;
  shippingAddress?: string;
}

export interface Activity {
  action: string;
  details: string;
  time: string;
  type: "order" | "product" | "user" | "payment";
  icon: React.ElementType;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  gradient: string;
  status?: string;
  change?: string;
  changeType?: "increase" | "decrease";
}

export interface TabButtonProps {
  id: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
  count?: number;
}

export interface StatusBadgeProps {
  status: string;
}

export interface UserModalProps {
  user: User;
  onClose: () => void;
}

export interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export interface SectionProps {
  stats?: DashboardStats;
  users?: User[];
  products?: Product[];
  orders?: Order[];
  setUsers?: React.Dispatch<React.SetStateAction<User[]>>;
  setProducts?: React.Dispatch<React.SetStateAction<Product[]>>;
  setOrders?: React.Dispatch<React.SetStateAction<Order[]>>;
  onNavigateToTab?: (tab: string) => void;
}
