import ContactForm from "@/app/contact/components/contact-form";
import GoogleMap from "@/app/contact/components/google-map";
import Locations from "@/app/contact/components/location";
import PageCover from "@/components/shared/page-cover";
import React from "react";

const ContactPage: React.FC = () => {
  return (
    <div>
      <div className="mt-12">
        <PageCover prev="About Us" next="Contact" />
      </div>
      <div className="mt-14">
        <ContactForm />
      </div>
      <div className="mb-10">
        <GoogleMap />
      </div>
      <div className="mb-10">
        <Locations />
      </div>
    </div>
  );
};

export default ContactPage;
