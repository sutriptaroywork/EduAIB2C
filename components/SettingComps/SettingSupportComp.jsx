// coded by sandeep
import React from "react";
import Image from "next/image";
import CustomAccordion from "../CustomAccordion";

const SettingSupportComp = () => {
  const generateWhatsAppLink = () => {
    const phoneNumber = "9702092579"; // Replace with the phone number you want to link to
    const message = "Hello, this is a WhatsApp message!"; // Replace with your desired message
    // Encode the phone number and message
    const encodedPhoneNumber = encodeURIComponent(phoneNumber);
    const encodedMessage = encodeURIComponent(message);

    // Create the WhatsApp link
    return `https://wa.me/${encodedPhoneNumber}?text=${encodedMessage}`;
  };
  const whatsappLink = generateWhatsAppLink();
  return (
    <>
      {/* code for Accordion */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-11 ">
            {" "}
            <CustomAccordion hideTitle={true} />
            {/* code for the contact us button */}
            <a href={whatsappLink} target="_blank" rel="noreferrer" noreferrer className="no-underline">
              <button
                className="contact-btn d-flex
      "
              >
                <Image
                  src={`/phone.png`}
                  alt="clock"
                  width={25}
                  height={25}
                  className="phone"
                />
                Contact us
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingSupportComp;
