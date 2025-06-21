import React from "react";
import ContactHeader from "./ContactHeader";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import LocationMap from "./LocationMap";
import FAQSection from "./FAQSection";

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
