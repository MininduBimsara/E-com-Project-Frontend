// utils/checkoutHelpers.ts
import { Truck } from "lucide-react";
import { ShippingOption, OrderData } from "../types/checkout";

export const shippingOptions: ShippingOption[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "Carbon-neutral delivery",
    price: 0,
    duration: "5-7 business days",
    icon: Truck,
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "Eco-friendly express",
    price: 500,
    duration: "2-3 business days",
    icon: Truck,
  },
];

export const provinces = [
  "Western Province",
  "Central Province",
  "Southern Province",
  "Northern Province",
  "Eastern Province",
  "North Western Province",
  "North Central Province",
  "Uva Province",
  "Sabaragamuwa Province",
];

export const createOrderData = (
  items: any[],
  totalPrice: number,
  totalCarbonFootprint: number,
  formData: any,
  selectedShipping: ShippingOption | undefined
): OrderData => {
  return {
    id: `ORD-${Date.now()}`,
    items,
    total: totalPrice + (selectedShipping?.price || 0),
    shippingInfo: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      province: formData.province,
    },
    shippingMethod: formData.shippingMethod,
    carbonFootprint: totalCarbonFootprint,
    date: new Date().toISOString(),
  };
};
