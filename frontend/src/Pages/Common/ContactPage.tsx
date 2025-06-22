import React from "react";

import ContactHeader from "../../Components/Common/Contact/ContactHeader";
import ContactForm from "../../Components/Common/Contact/ContactForm";
import ContactInfo from "../../Components/Common/Contact/ContactInfo";
import LocationMap from "../../Components/Common/Contact/LocationMap";
import FAQSection from "../../Components/Common/Contact/FAQSection";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <ContactHeader />

      {/* Contact Form Section */}
      <ContactForm />

      {/* Contact Information Section */}
      <ContactInfo />

      {/* Location & Map Section */}
      <LocationMap />

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
};

export default ContactPage;
