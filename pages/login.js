import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import loginBanner from "../styles/sass/images/landing-page/banner_login.png";
// import google from "../styles/sass/images/landing-page/Google.svg";
import googleButton from "../public/images/icons/google-signin-button.png"
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/loginSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BookImageCOmponent from "../components/BookImageComps/BookImageCOmponent";
import logo from "../styles/sass/images/landing-page/edudotai-2.png";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const query = router?.query;


  useEffect(()=>{
    if(query && query.plainUser =="true"){
      toast.info("This email already exist")
      router.push("/login")
    }
  },[query])

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email or Phone Number is required")
      .test("is-email-or-phone", "Invalid Email or Phone Format", (value) => {
        const isEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
          value
        );
        const isPhone = /^[0-9]{10}$/.test(value);
        return isEmail || isPhone;
      }),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d+$/;
  
    const userData = {
      email: emailRegex.test(values.email) ? values.email : null,
      mobile: phoneRegex.test(values.email) ? values.email : null,
      password: values.password,
    };
    try {
      const resAction = await dispatch(loginUser(userData));
  
      if (resAction.payload && resAction.payload.data) {
        localStorage.setItem("userToken", resAction.payload.data.userToken);
        setCookie("isLoggedIn", "true");
        toast.success("Login successful");
        // const redirectPath = resAction.payload.data?.completed ? "/dashboard" : "/profile";
        const redirectPath = "/advance-search";
        setCookie("isComplete", resAction.payload.data?.completed ? "true" : "false");
        router.push(redirectPath);
      } else {
        setLoading(false);
        const errorMessage = resAction.payload.message || "Something went wrong";
        toast.error(errorMessage);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
    resetForm();
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleGoogleSigin = () => {
    // router.push("/backend/auth/google")
    window.location.href = "https://shikshaml.com/backend/auth/google"
    // window.location.href = "http://localhost:3007/auth/google"
  }

  return (
    <>
      <section className="lyt-section typ-authentication">
        <div className="container-fluid">
          <div className="row">
            {/* <div className="col-lg-6 col-md-6 col-12  p-0 ">
              <div className="login-left typ-light  "> */}
                {/* <div className="banner-book  border-1 border-red-500">
                  <Image src={loginBanner} alt="book" height={1000} className="img-fluid" />
                </div> */}
                {/* <BookImageCOmponent /> */}
              {/* </div>
            </div> */}
            <div className="col-lg-12 col-md-12 col-12 mob-height p-5">
              <div className="login-right">
                <Link href="/">
                  <Image src={logo} alt="logo" />
                </Link>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form className="bs-form p-5">
                    <div className="er_box">
                      <h2 className="title">Login Form</h2>
                      <h3 className="sub_title !text-base"> Get started by Login</h3>
                    </div>

                    <div className="field-box mb-2">
                      <label htmlFor="email" className="text-title">
                        Email or Phone Number
                      </label>
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

                    <div className="field-box">
                      <label htmlFor="password" className="text-title">
                        Password
                      </label>
                      <div className="password-input ">
                        <Field
                          className="w-[100%]"
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                      </div>

                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error-msg "
                      />
                    </div>

                    {/* <div className="flex-content mt-2">
                      <Link href="/otp" className="redirect-link typ-theme">
                        Login with OTP?
                      </Link>
                      <Link
                        href="/forgot-password"
                        className="redirect-link typ-theme"
                      >
                        Forgot Password?
                      </Link>
                    </div> */}
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
                  {/* <div className="sepration-part">
                    <hr className="line" />
                    <p className="line-text">or</p>
                  </div> */}
                  {/* <div className="google-btn cursor-pointer" onClick={handleGoogleSigin}>
                    <Image src={google} alt="google" />
                    <span className="btn-text">Sign in with Google</span>
                  </div> */}
                 {/* <div className="flex justify-center items-center mt-0 mb-4 " >
                  <Image src={googleButton} alt="Sign in with google" quality={100} width={200} className="cursor-pointer" onClick={handleGoogleSigin} />
                 </div> */}
                 {/* <Link href="/signup" className=" sign-up-btn">
                  Don’t have an Account |{" "}
                  <span className="typ-theme">Sign up</span>
                 </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <ToastContainer /> */}
      </section>
    </>
  );
};

export default Login;
