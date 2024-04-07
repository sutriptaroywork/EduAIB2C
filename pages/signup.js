import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import loginBanner from "../styles/sass/images/landing-page/banner_login.png";
import googleButton from "../public/images/icons/google-signin-button.png"
import google from "../styles/sass/images/landing-page/Google.svg";
import Link from 'next/link'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import BookImageCOmponent from '../components/BookImageComps/BookImageCOmponent';
import logo from "../styles/sass/images/landing-page/edudotai-2.png";

const SignUP = () => {

  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [emailValue, setEmailValue] = useState("");
  const [emailPhone, setEmailPhone] = useState("");
  const { code } = router.query;
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [step, timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  };

  let validationSchema;

  if (step === 1) {
    validationSchema = Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .test(
          "is-email-or-phone",
          "Invalid Email or Phone Format",
          (value) => {
            const isEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
              value
            );
            const isPhone = /^[0-9]{10}$/.test(value);
            return isEmail || isPhone;
          }
        ),
    });
  } else if (step === 2) {
    validationSchema = Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .test(
          "is-email-or-phone",
          "Invalid Email or Phone Format",
          (value) => {
            const isEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
              value
            );
            const isPhone = /^[0-9]{10}$/.test(value);
            return isEmail || isPhone;
          }
        ),
      otp: Yup.string().required('OTP is required'),
    });
  } else if (step === 3) {
    validationSchema = Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .test(
          "is-email-or-phone",
          "Invalid Email or Phone Format",
          (value) => {
            const isEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
              value
            );
            const isPhone = /^[0-9]{10}$/.test(value);
            return isEmail || isPhone;
          }
        ),
      password: Yup.string().required('New password is required').min(6, 'Password must be at least 6 characters'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    });
  }


  let apiUrl;

  if (!code) {
    apiUrl = `${process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME}/register`;
  }
  else {
    apiUrl = `${process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME}/register?refcode=${code}`
  }


  const handleSubmitSignup = async (values) => {
    setLoading(true);
    setEmailPhone(values.email)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d+$/;

    if (step == 1) {
      if (emailRegex.test(values.email)) {
        const data1 = {
          email: values.email,
        }
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME}/generateRegisterOtp`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data1),
          });
          if (response && response.status && response.status === 200) {
            const data = await response.json();
            setLoading(false);
            setStep(2);
            setEmailValue(values.email);
            toast.success(data.message)
          } else {
            setLoading(false);
          }
        } catch (error) {
        }
      }
      else if (phoneRegex.test(values.email)) {
        const data2 = {
          phoneNumber: values.email,
        }
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME}/generateRegisterOtp`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data2),
          });
          if (response && response.status && response.status === 200) {
            const data = await response.json();
            setLoading(false);
            setStep(2);
            setEmailValue(values.email);
            toast.success(data.message)
          } else {
            setLoading(false);
          }
        } catch (error) {
          toast.error("Something went wrong")
        }
      }
    } else if (step == 2) {
      if (emailRegex.test(values.email)) {
        const data1 = {
          email: values.email,
          otp: values.otp
        }
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME}/validateRegisterOtp`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data1),
          });
          if (response && response.status && response.status === 200) {
            const data = await response.json();
            setLoading(false);
            setStep(3);
            toast.success(data.message);
          } else {
            setLoading(false);
            toast.error("Something went wrong");
          }
        } catch (error) {
          toast.error("Something went wrong")
        }
      }
      else if (phoneRegex.test(values.email)) {
        const data2 = {
          phoneNumber: values.email,
          otp: values.otp
        }
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME}/validateRegisterOtp`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data2),
          });
          if (response && response.status && response.status === 200) {
            const data = await response.json();
            setLoading(false);
            setStep(3);
            toast.success(data.message);
          } else {
            setLoading(false)
            toast.error("Something went wrong")
          }
        } catch (error) {
          toast.error("Something went wrong")
        }
      }
    } else if (step == 3) {

      if (emailRegex.test(values.email)) {
        const data1 = {
          email: values.email,
          password: values.password,
        }
        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data1),
          });
          if (response && response.status && response.status === 201) {
            const data = await response.json();
            setLoading(false)
            toast.success("Registered successfully")
            if (data.success == true) {
              router.push("/login");
            }
          } else {
            setLoading(false)
            const data = await response.json();
            if (data?.message?.length > 1) {
              toast.error(data.message)
            } else {
              toast.error("Something went wrong")
            }
          }
        } catch (error) {
          toast.error("Something went wrong")
        }
      }
      else if (phoneRegex.test(values.email)) {
        const data2 = {
          mobile: values.email,
          password: values.password,
        }
        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data2),
          });
          if (response && response.status && response.status === 201) {
            const data = await response.json();
            setLoading(false)
            toast.success("Registered successfully")
            if (data.success == true) {
              router.push("/login");
            }
          } else {
            setLoading(false)
            const data = await response.json();
            if (data?.message?.length > 1) {
              toast.error(data.message)
            } else {
              toast.error("Something went wrong")
            }
          }
        } catch (error) {
          toast.error("Something went wrong")
        }
      }
    }
  };

  const handleGoogleSigin = () => {
    window.location.href = "https://shikshaml.com/backend/auth/google"
    // window.location.href = "http://localhost:3007/auth/google"
  }

  const resendOtp = async () => {
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d+$/;

    setTimer(120);
    if (emailRegex.test(emailPhone)) {
      const data = {
        email: emailPhone
      }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME}/generateRegisterOtp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response && response.status && response.status === 200) {
          const data = await response.json();
          setLoading(false);
          setStep(2);
          setEmailValue(values.email);
          toast.success(data.message)
        } else {
          setLoading(false);
        }
      } catch (error) {
      }
    } else if (phoneRegex.test(emailPhone)) {
      const data = {
        phoneNumber: emailPhone
      }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME}/generateRegisterOtp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response && response.status && response.status === 200) {
          const data = await response.json();
          setLoading(false);
          setStep(2);
          setEmailValue(values.email);
          toast.success(data.message)
        } else {
          setLoading(false);
        }
      } catch (error) {
      }
    }
  }
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <section className="lyt-section typ-authentication typ-newpass h-screen">
        <div className="container-fluid">
          <div className="row">
            {/* <div className="col-lg-6 col-md-6 col-12  p-0">
              <div className="login-left typ-light"> */}
                {/* <div className="banner-book">
                  <Image src={loginBanner} alt="book" className="img-fluid" />
                </div> */}
                {/* <BookImageCOmponent /> */}
              {/* </div>
            </div> */}
            <div className="col-lg-12 col-md-12 col-12 mob-height p-5 selection:">
              <div className="login-right">
                <Link href="/">
                  <Image src={logo} alt="logo" />
                </Link>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmitSignup}
                >
                  <Form className="bs-form !mb-0 p-5">
                    <div className="er_box">
                      <h2 className="title !text-2xl !mb-1">Registration Form</h2>
                      <h3 className="sub_title !text-base">
                        Get started by creating your new account
                      </h3>
                    </div>

                    {step === 1 && (
                      <>
                        <div className="field-box mb-2">
                          <label htmlFor="email" className="text-title">
                            Email or Phone Number
                          </label>
                          <Field
                            placeholder="Enter your email id"
                            type="text"
                            id="email"
                            name="email"
                            disabled={step !== 1} // Disable email field if not on step 1
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="error-msg"
                          />
                        </div>
                        {step === 1 && (
                          <div className="flex-content">
                            <button type="submit" disabled={loading} className="btn-submit">
                              {!loading ? 'Verify' : 'Submitting...'}
                            </button>
                          </div>
                        )}
                      </>
                    )}
                    {step === 2 && (
                      <>
                        <div className="field-box ">
                          <label htmlFor="email" className="text-title">
                            Email or Phone Number
                          </label>
                          <Field
                          className='bg-purple-200 border border-purple-200'
                            placeholder="Enter your email id"
                            type="text"
                            id="email"
                            name="email"
                            value={emailValue}
                            disabled={step !== 1} // Disable email field if not on step 1
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="error-msg mb-2"
                          />
                        </div>
                        <div className='flex flex-row justify-between'>

                          <p className='text-[#ffcc02]'>
                            Time Remaining: {formatTime(timer)}
                          </p>
                          <p
                            onClick={resendOtp}
                            className={`${timer == 0 ? "text-[#ffcc02] hover:cursor-pointer " : " hover:cursor-not-allowed text-gray-500"} `}>Resend OTP</p>
                        </div>
                        <div className="field-box mb-2">
                          <label htmlFor="otp" className="text-title">
                            Enter OTP
                          </label>
                          <Field
                            placeholder="Enter OTP"
                            type="text"
                            id="otp"
                            name="otp"
                          />
                          <ErrorMessage
                            name="otp"
                            component="div"
                            className="error-msg"
                          />
                        </div>
                        {step === 2 && (
                          <div className="flex-content">
                            <button type="submit" className="btn-submit">
                              {!loading ? 'Submit' : 'Submitting...'}
                            </button>
                          </div>
                        )}
                      </>
                    )}
                    {step === 3 && (
                      <>
                        <div className="field-box mb-2">
                          <label htmlFor="email" className="text-title">
                            Email or Phone Number
                          </label>
                          <Field
                            className='bg-purple-200 border border-purple-200'
                            placeholder="Enter your email id"
                            type="text"
                            id="email"
                            name="email"
                            value={emailValue}
                            disabled={step !== 1} // Disable email field if not on step 1
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="error-msg"
                          />
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

                        {step === 3 && (
                          <div className="flex-content">
                            <button type="submit" className="btn-submit">
                              {!loading ? 'Submit' : 'Submitting...'}
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </Form>
                </Formik>
                <div className="bs-auth h-[100px] ">
                  <div className="sepration-part !h-[20px] ">
                    <hr className="line " />
                    <p className="line-text !h-[10px]  ">or</p>
                  </div>
                  {/* <div className="flex justify-center items-center mt-0 mb-4">
                  <Image src={googleButton} alt="Sign in with google" quality={100} width={200} className="cursor-pointer" onClick={handleGoogleSigin} />
                  </div> */}

                  <Link
                    href="/login"
                    className="sign-up-btn "
                  >
                    Already have an account |{' '}
                    <span className="typ-theme">Login</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default SignUP;
