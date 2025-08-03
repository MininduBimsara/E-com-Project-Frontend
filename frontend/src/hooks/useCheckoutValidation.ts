// hooks/useCheckoutValidation.ts
import { useState } from "react";
import { FormData } from "../types/checkout";

export const useCheckoutValidation = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep = (step: number, formData: FormData): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      // Shipping Information Validation
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.postalCode.trim())
        newErrors.postalCode = "Postal code is required";
      if (!formData.province) newErrors.province = "Province is required";
      if (!formData.shippingMethod)
        newErrors.shippingMethod = "Please select a shipping method";
    }

    if (step === 2) {
      // Payment step - No validation needed for PayPal
      // PayPal handles its own validation during the checkout process
      // We only need to ensure shipping info is still valid
      if (
        !formData.firstName.trim() ||
        !formData.lastName.trim() ||
        !formData.email.trim() ||
        !formData.address.trim()
      ) {
        newErrors.general = "Please complete the shipping information first";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return {
    errors,
    validateStep,
    clearError,
    setErrors,
  };
};
