export interface FormData {
  // Shipping Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;

  // Payment Information
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;

  // Options
  shippingMethod: string;
  paymentMethod: string;
  saveInfo: boolean;
  marketing: boolean;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  icon: any;
}

export interface CheckoutPageProps {
  onBack?: () => void;
  onOrderComplete?: (orderData: any) => void;
}

export interface OrderData {
  id: string;
  items: any[];
  total: number;
  shippingInfo: any;
  shippingMethod: string;
  carbonFootprint: number;
  date: string;
}
