import { useEffect, useState } from "react";
import logo from "../../styles/sass/images/landing-page/logo.svg";
import faceBook from "../../styles/sass/images/landing-page/facebook.svg"
import twiter from "../../styles/sass/images/landing-page/twitter.svg"
import whatsApp from "../../styles/sass/images/landing-page/whatsapp.svg"
import linkedIn from "../../styles/sass/images/landing-page/linkedin.svg"
import instagram from "../../styles/sass/images/landing-page/instagram.svg"
import Link from "next/link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { toast } from "react-toastify";
import { postSubscriptionUser } from "../../redux/apiService";


const Footer = (props) => {

  const {userToken} = props
  // iniatial value of mail
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      // .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Invalid Email Format"
      ),
  });

  const generateWhatsAppLink = () => {
    const phoneNumber = '9702092579';
    const message = 'Hello, this is a WhatsApp message!'; 
    const encodedPhoneNumber = encodeURIComponent(phoneNumber);
    const encodedMessage = encodeURIComponent(message);

    // Create the WhatsApp link
    return `https://wa.me/${encodedPhoneNumber}?text=${encodedMessage}`;
  };

  const checkValidate = (values) => {
    let status = true;

    if (!values.email) {
      status = false;
    }

    return status;
  };

  const handleSubmit = (values, { resetForm }) => {
    if (checkValidate(values)) {


    const payload = {
      email: values.email,
    };

    const sentInfo = async () => {
      try {
        const result  = await postSubscriptionUser(payload)
        
        if(result.status ==201){
          toast.success("Thank you for subscribing!")
        }else{
          toast.error(result?.data?.message ? result?.data?.message:"Something went wrong !")
        }
      } catch (error) {
        toast.error( error?.response?.data?.message ||"Something went wrong!")
      }
    };
    
    sentInfo();
    resetForm();
    }
  };

  // redirect on whats App
  const whatsappLink = generateWhatsAppLink();
  return (
    <>
      <footer className="bs-footer" name="contact-us" id="contact-us">
        <div className="container">
          <h2 className="footer-heading">Redefining the Learning Experience through our <span className="clr-theme">24/7 automated human</span> like personal tutor</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="contact-mail">
              <div className="email-field">
                <Field
                  placeholder="Enter your email id"
                  type="text"
                  id="email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-msg"
                />
              </div>
              <div className="btn-bg">
                <button className="bs-btn btn btn-contact" type="submit">
                  Send
                </button>
              </div>
            </Form>
          </Formik>
          <h2 className="tearms-text typ-text">Subscribe To our newsletter</h2>
          <div className="bottom-content">
            <div className="footer-logo">
              <Image src={logo} alt="logo" className="img-fluid" />
            </div>
            <div className="navbar-tabs">

            </div>
            <div className="media-icons">
              <a href="https://www.facebook.com/profile.php?id=61550958963463" target="_blank" rel="noreferrer" noreferrer>
                <div className="img-width">
                  <Image src={faceBook} alt="facebook" className="img-fluid" />
                </div>
              </a>
              <a href={whatsappLink} target="_blank" rel="noreferrer" noreferrer>
                <div className="img-width">
                  <Image src={whatsApp} alt="whatsApp" className="img-fluid" />
                </div>
              </a><a href="https://www.linkedin.com/company/shikshaml/" target="_blank" rel="noreferrer" noreferrer>
                <div className="img-width">
                  <Image src={linkedIn} alt="linkedIn" className="img-fluid" />
                </div>
              </a>
              <a href="https://www.instagram.com/shikshaml_official/" target="_blank" rel="noreferrer" noreferrer>
                <div className="img-width">
                  <Image src={instagram} alt="instagram" className="img-fluid" />
                </div>
              </a>
              <a href="https://twitter.com/Shiksha_ML" target="_blank" rel="noreferrer" noreferrer>
                <div className="img-width">
                  <Image src={twiter} alt="twiter" className="img-fluid" />
                </div>
              </a>
            </div>
          </div>
          <div className="copy-right-area">
            <h2 className="text-copyright">All Rights Reserved @ 2023</h2>
            <div className="privacy_policy">

              <Link href="/terms-and-condition" target="_blank" className="tearms-text rightbr" rel="noreferrer">
                Terms and Conditions
              </Link>
              <Link href="/privacy-policy" target="_blank" className="tearms-text rightbr" rel="noreferrer">
                Privacy policy
              </Link>
              <Link href="/refund-policy" target="_blank" className="tearms-text " rel="noreferrer">
                Refund policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;