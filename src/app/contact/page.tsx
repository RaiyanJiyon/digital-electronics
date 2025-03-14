import ContactForm from "@/components/contact-page/ContactForm";
import PageCover from "@/components/shared/PageCover";
import React from "react";

const ContactPage: React.FC = () => {
    return (
        <div>
            <div className="mt-12">
                <PageCover prev="About Us" next="Contact" />
            </div>
            <div className="my-14">
                <ContactForm />
            </div>
        </div>
    );
};

export default ContactPage;