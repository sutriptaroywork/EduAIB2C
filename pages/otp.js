// coded by yaseen 
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import loginBanner from "../styles/sass/images/landing-page/banner_login.png";
import google from "../styles/sass/images/landing-page/Google.svg";
import Link from 'next/link'
import ClipLoader from "react-spinners/ClipLoader";
import Image from "next/image";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";
import BookImageCOmponent from "../components/BookImageComps/BookImageCOmponent";

const LoginOtp = () => {
  const [loading,setLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [hideOtp, setHideOtp] = useState(true);
  const [mobileNUmber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userTokened = localStorage.getItem("userToken");
    if (userTokened) {
      setUserToken(userTokened)
    }
  }, [])


  const initialValues = {
    email: "",
    otp: "",
  };

  const validationSchema = Yup.object().shape({
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

  const handleEmailChange = (e, formik) => {
    const { value } = e.target;
    formik.handleChange(e);
    setMobileNumber(value);
  };

  const handleOtpChange = (e, formik) => {
    const { value } = e.target;
    formik.handleChange(e);
    setOtp(value);
  }


  const handleSubmit = async (values) => {
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d+$/;
    if (emailRegex.test(values.email)) {
      if (values.otp == "") {
        try {
          const intialValue = {
            email: values.email
          }
          const apiUrl = `${process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME}/generateotp`;
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(intialValue),
          });
          if (response && response.status && response.status === 200) {
            const data = await response.json();
            toast.success(data.message);
            setHideOtp(false);
            setLoading(false);
          } else {
            const data = await response.json();
            setHideOtp(true);
            setOtp("");
            toast.warn(data.message)
          }
          setLoading(false);
        }
        catch (error) {
        }


      } else {
        // router.push("/");
        const intialValue = {
          email: values.email,
          otp: otp
        }
        setHideOtp(false);
        const apiUrl = `${process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME}/loginwithotp`;
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(intialValue),
        }
        );

        if (response && response.status && response.status === 200) {
          const data = await response.json();
          localStorage.setItem("userToken", data.userToken);
          setCookie("isLoggedIn", "true");
          toast.success("Login successful");

          if (data?.completed) {
            setCookie("isComplete", "true");
            router.push("/dashboard");
          } else {
            setCookie("isComplete", "false");
            router.push("/profile");
          }
        } else if (response.status === 400) {
          const data = await response.json();
          toast.warn(data.message);

        } else if (response.status === 404) {
          const data = await response.json();
          setHideOtp(true);
          setOtp("");
          toast.warn(data.message);
        }
        else {
          const data = await response.json();
          setHideOtp(true);
          setOtp("");
          toast.warn(data.message); 
        }
        setLoading(false);
      }
    }

    else if (phoneRegex.test(values.email)) {
      if (values.otp == "") {
        try {
          const intialValue = {
            phoneNumber: values.email
          }
          const apiUrl = `${process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME}/generateotp`;
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(intialValue),
          });
          if (response && response.status && response.status === 200) {
            const data = await response.json();
            toast.success(data.message);
            setHideOtp(false);
            setLoading(false);
          } else {
            const data = await response.json();
            setHideOtp(true);
            setOtp("");
            toast.warn(data.message)
          }
          setLoading(false);
        }
        catch (error) {
        }


      } else {
        const intialValue = {
          phoneNumber: values.email,
          otp: otp
        }
        setHideOtp(false);
        const apiUrl = `${process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME}/loginwithotp`;
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(intialValue),
        }
        );

        if (response && response.status && response.status === 200) {
          const data = await response.json();
          localStorage.setItem("userToken", data.userToken);
          setCookie("isLoggedIn", "true");
          toast.success("Login successful");

          if (data?.completed) {
            setCookie("isComplete", "true");
            router.push("/dashboard");
          } else {
            setCookie("isComplete", "false");
            router.push("/profile");
          }
        } else if (response.status === 400) {
          const data = await response.json();
          toast.warn(data.message);

        } else if (response.status === 404) {
          const data = await response.json();
          setHideOtp(true);
          setOtp("");
          toast.warn(data.message);
        }
        else {
          const data = await response.json();
          setHideOtp(true);
          setOtp("");
          toast.warn(data.message); // record not founds
        }
        setLoading(false);
      }
    }

  }

  const resendOtp = async () => {
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d+$/;
    let requestPayload = {};
    if (emailRegex.test(mobileNUmber)) {
        requestPayload = { email: mobileNUmber };
    } else if (phoneRegex.test(mobileNUmber)) {
        requestPayload = { phoneNumber: mobileNUmber };
    }
    setHideOtp(false);
    const apiUrl = `${process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME}/generateotp`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    }
    );
    if (response.ok) {
      const data = await response.json();
      toast.success("OTP sent to your registered contact details");

      setLoading(false);
    } else {
      const data = await response.json();
      setHideOtp(true);
      setOtp("");
      toast.warn(data.message);
      // router.reload();
    }
    setLoading(false);
  }

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
                <BookImageCOmponent />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 mob-height p-0">
              <div className="login-right">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {(formik) => (

                    <Form className="bs-form">
                      <div className="er_box ">
                        <h2 className="title">Login</h2>
                        <h3 className="sub_title">Get started by Login</h3>
                      </div>

                      <div className="field-box">
                        <label htmlFor="email" className="text-title">
                          Email or Phone Number
                        </label>
                        <Field
                          type="text"
                          placeholder="Enter your email id or phone number"
                          name="email"
                          id="email"
                          onChange={(e) => handleEmailChange(e, formik)}

                        />
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="error-msg"
                        />
                      </div>

                      <div className={`field-box ${hideOtp ? "!hidden" : ""} `}>
                        <label htmlFor="otp" className="text-title">
                          OTP
                        </label>
                        <Field
                          type="text"
                          placeholder="Enter your OTP"
                          name="otp"
                          id="otp"
                          onChange={(e) => handleOtpChange(e, formik)}

                        />
                        <ErrorMessage
                          name="otp"
                          component="span"
                          className="error-msg"
                        />
                      </div>
                      <div className="flex-content">
                        <Link
                          href="/login"
                          className="redirect-link typ-theme"
                        >
                          Login with password?
                        </Link>
                        <button
                          type="button"
                          disabled={loading}
                          onClick={resendOtp}
                          className={`redirect-link typ-theme hover:cursor-pointer ${hideOtp ? "!hidden" : ""}`}>
                          Resend OTP
                        </button>
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
                  )}
                </Formik>
                <div className="bs-auth">
                  <div className="sepration-part">
                    <hr className="line" />
                    <p className="line-text">or</p>
                  </div>
                  <a href="#" className="google-btn">
                    <Image src={google} alt="google" />
                    <span className="btn-text">Sign in with Google</span>
                  </a>
                  <Link href="/signup" className=" sign-up-btn">
                    Don’t have an account |{" "}
                    <span className="typ-theme">Sign Up</span>
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

export default LoginOtp;
