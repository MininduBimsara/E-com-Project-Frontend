// hooks/useCheckoutForm.ts
import { useState } from "react";
import { FormData } from "../types/checkout";

const initialFormData: FormData = {
  // Shipping Information
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  province: "",

  // Payment Information
  cardNumber: "",
  expiryDate: "",
  cvv: "",
  cardName: "",

  // Options
  shippingMethod: "standard",
  paymentMethod: "card",
  saveInfo: false,
  marketing: false,
};

export const useCheckoutForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return {
    formData,
    handleInputChange,
    resetForm,
  };
};
