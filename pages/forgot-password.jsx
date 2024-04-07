import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Import Yup for validation

import loginBanner from "../styles/sass/images/landing-page/login-banner.png";
import google from "../styles/sass/images/landing-page/Google.svg";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";
import BookImageCOmponent from "../components/BookImageComps/BookImageCOmponent";

const ForgotPass = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [feild, setFeild] = useState();
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .test("is-email-or-phone", "Invalid Email or Phone Format", (value) => {
        const isEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
          value
        );
        const isPhone = /^[0-9]{10}$/.test(value);
        return isEmail || isPhone;
      }),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d+$/;

    if (emailRegex.test(values.email)) {
      setFeild("Email");
      const data = {
        email: values.email,
      };
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME}/forgotpassword`;

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          // pass token here fetch from api
        });
        if (response.ok && response.status && response.status === 200) {
          const data = await response.json();

          toast.success("Reset password link sent successfully");
        } else {
          const data = await response.json();
          setLoading(false);
          toast.warn(data.message);
        }
        setLoading(false);
      } 
      catch (error) {
        setLoading(false);
      }
    } else if (phoneRegex.test(values.email)) {
      setFeild("Password");
      const data = {
        phoneNumber: values.email,
      };
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME}/forgotpassword`;

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          // pass token here fetch from api
        });
        if (response.ok) {
          const data = await response.json();
          toast.success("Reset password link sent successfully");
        } else {
          toast.warn("This ID is not registered");
        }
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <section className="lyt-section typ-authentication ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12  p-0">
              <div className="login-left">
                <div className="typ-big-img">
                  <Image src={loginBanner} alt="book" className="img-fluid" />
                </div>
                {/* <BookImageCOmponent/> */}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 mob-height p-0">
              <div className="login-right">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form className="bs-form">
                    <div className="er_box ">
                      <h2 className="title">Forgot password?</h2>
                      <h3 className="sub_title">
                        No Worries we’ll send you reset instructions
                      </h3>
                    </div>

                    <div className="field-box mb-40">
                      <label htmlFor="email" className="text-title">
                        Email or phone number
                      </label>
                      <Field
                        type="text"
                        placeholder="Enter your email id or phone number"
                        name="email"
                        id="email"
                      />
                      <ErrorMessage
                        name="email"
                        component="span"
                        className="error-msg"
                      />
                    </div>
                    <button type="submit" disabled={loading} className="btn-submit">
                      {!loading ? (
                        "Submit"
                      ) : (
                        <ClipLoader
                          color="#ffffff"
                          size={18}
                          speedMultiplier={1}
                        />
                      )}
                    </button>
                  </Form>
                </Formik>
                <div className="bs-auth">
                  <div className="sepration-part">
                    <hr className="line" />
                    <p className="line-text">or</p>
                  </div>
                  <a href="#" className="google-btn">
                    <Image src={google} alt="google" />
                    <span className="btn-text">Sign in with google</span>
                  </a>

                  <Link href="/login" className=" sign-up-btn">
                    Don’t have an account |{" "}
                    <span className="typ-theme">Log In</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPass;
