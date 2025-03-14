import ContactForm from "@/components/contact-page/ContactForm";
import Locations from "@/components/contact-page/Locations";
import PageCover from "@/components/shared/PageCover";
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
                <Locations />
            </div>
        </div>
    );
};

export default ContactPage;