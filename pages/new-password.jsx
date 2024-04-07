// coded by yaseen 
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import loginBanner from "../styles/sass/images/landing-page/banner_login.png";
import google from "../styles/sass/images/landing-page/Google.svg";
import Link from 'next/link'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import Image from "next/image";
import { toast } from 'react-toastify';
import BookImageCOmponent from '../components/BookImageComps/BookImageCOmponent';

const NewPassword = () => {

  const router = useRouter();
  const { token } = router.query;

  
  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),

  });

  const handleSubmit = async (values) => {
    const data = {
      newPassword: values.confirmPassword
    }
    const apiUrl = `${process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME}/resetpassword`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }
    );
    if (response.ok) {
      const data = await response.json();
      toast.success(data.message)
      router.push("/login")
    } else {
    }

  };


  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <section className="lyt-section typ-authentication">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12  p-0">
              <div className="login-left typ-light">
                {/* <div className="banner-book">
                  <Image src={loginBanner} alt="book" className="img-fluid" />
                </div> */}
                 <BookImageCOmponent/>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 mob-height p-0">
              <div className="login-right">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form className="bs-form typ-newpass">
                    <div className="er_box mb-1">
                      <h2 className="title">Please enter a new password below</h2>
                    </div>

                    <div className="field-box mb-2">
                      <label htmlFor="password" className="text-title">
                        New password
                      </label>
                      <div className="password-input ">
                        <Field
                          className="w-[100%]"
                          placeholder="Enter your new password"
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error-msg"
                      />
                    </div>

                    <div className="field-box mb-2">
                      <label
                        htmlFor="confirmPassword"
                        className="text-title"
                      >
                        Confirm password
                      </label>
                      <div className="password-input ">
                        <Field
                          className="w-[100%]"
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="error-msg"
                      />
                    </div>
                    <button type="submit" className="btn-submit mt-3">
                      Submit
                    </button>
                  </Form>
                </Formik>
                <div className="bs-auth ">
                  <div className="sepration-part">
                    <hr className="line" />
                    <p className="line-text">or</p>
                  </div>
                  <a href="#" className="google-btn">
                    <Image src={google} alt="google" />
                    <span className="btn-text">
                      Sign in with google
                    </span>
                  </a>

                  <Link
                    href="/login"
                    className=" sign-up-btn"
                  >
                    Already have an account |{' '}
                    <span className="typ-theme">Login</span>
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

export default NewPassword;
