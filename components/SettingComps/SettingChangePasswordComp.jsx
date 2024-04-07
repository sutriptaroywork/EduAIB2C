import { toast } from "react-toastify";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/slices/settingSlice";

const SettingChangePasswordComp = () => {
  const dispatch = useDispatch();

  const initialValues = {
    currentPassword: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    password: Yup.string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const userData = {
      currentPassword: values.currentPassword,
      newPassword: values.password,
      confirmPassword: values.confirmPassword,
    };
    await dispatch(changePassword(userData))
      .then((resultAction) => {
        const data = resultAction.payload.data;
        toast.success(data.message);
        resetForm();
      })
      .catch((error) => {});
  };

  // Individual state variables for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (type) => {
    switch (type) {
      case "current":
        setShowCurrentPassword((prevShowPassword) => !prevShowPassword);
        break;
      case "new":
        setShowNewPassword((prevShowPassword) => !prevShowPassword);
        break;
      case "confirm":
        setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <section className="lyt-section typ-authentication typ-set-ch-pass">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12 mob-height p-0">
              <div className="login-right">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isValid }) => (
                    <Form className="bs-form ">
                      <div className="field-box input-fields ">
                        <label htmlFor="currentPassword" className="text-title">
                          Current Password
                        </label>
                        <Field
                          placeholder="Enter your current password"
                          type={showCurrentPassword ? "text" : "password"}
                          id="currentPassword"
                          name="currentPassword"
                        />
                        <button
                          type="button"
                          className="password-toggle !top-[46px]"
                          onClick={() => togglePasswordVisibility("current")}
                        >
                          {showCurrentPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                        <ErrorMessage
                          name="currentPassword"
                          component="div"
                          className="error-msg"
                        />
                      </div>

                      <div className="field-box">
                        <label htmlFor="password" className="text-title">
                          New password
                        </label>
                        <div className="password-input ">
                          <Field
                            className="w-[100%]"
                            placeholder="Enter your new password"
                            type={showNewPassword ? "text" : "password"}
                            id="password"
                            name="password"
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => togglePasswordVisibility("new")}
                          >
                            {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                          </button>
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="error-msg"
                        />
                      </div>

                      <div className="field-box">
                        <label htmlFor="confirmPassword" className="text-title">
                          Confirm password
                        </label>
                        <div className="password-input ">
                          <Field
                            className="w-[100%]"
                            placeholder="Enter your confirm password"
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => togglePasswordVisibility("confirm")}
                          >
                            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                          </button>
                        </div>
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="error-msg"
                        />
                      </div>

                      <div data-testid="update_btn" className="ch-btn-box">
                        <button
                          type="submit"
                          className={`btn-submit ${
                            !isValid ? "disabled:cursor-not-allowed" : ""
                          }`}
                          disabled={!isValid}
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SettingChangePasswordComp;
