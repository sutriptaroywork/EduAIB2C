import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { State } from "country-state-city";
import CreatableSelect from "react-select/creatable";
import stateCityData from "../../jsonFile/StateCity";
import {
  fetchInstituteData,
  postProfileData,
} from "../../redux/slices/settingSlice";
import { fetchUserData } from "../../redux/slices/userDataSlice";
import ChipInput from "../ChipInput";

const SettingProfileComp = () => {
  const pfData = useSelector((state) => state.userData.data);
  const [chips, setChips] = useState([]);
  const [awsImg, setAwsImg] = useState(null);

  useEffect(() => {
    if (!pfData) {
      dispatch(fetchUserData());
    }
  }, [pfData]);

  const handleAddChip = (chip) => {
    if (chips.length < 3 && chip.length > 0) {
      setChips([...chips, chip]);
    }
  };
  const handleDeleteChip = (chipIndex) => {
    const updatedChips = chips.filter((_, index) => index !== chipIndex);
    setChips(updatedChips);
  };

  const institues = useSelector((state) => state.settingSlice);
  const [isOther, setIsOther] = useState(false);
  const [othersBoard, setOtherBoard] = useState(false); //for education board
  const [grade, setGrade] = useState(pfData?.otherGrade);
  const [board, setboard] = useState(pfData?.otherBoard);
  const [dateS, setDateS] = useState(null);

  let stateValue =
    pfData?.state?.length > 0
      ? State.getStatesOfCountry("IN").filter(
        (state) => state?.name == pfData?.state
      )
      : null;
  const [parentInfo, setParentInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [citiess, setCities] = useState([]);
  const [stateName, setStateName] = useState();
  const [institutes, setInstitutes] = useState();
  const dispatch = useDispatch();
  const [selectedCity, setSelectedCity] = useState({
    value: pfData?.city,
    label: pfData?.city,
  }); // Add selectedCity state
  const [citiesss, setCitiess] = useState({});

  const genders = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const grades = [
    { value: "5th", label: "5th" },
    { value: "6th", label: "6th" },
    { value: "7th", label: "7th" },
    { value: "8th", label: "8th" },
    { value: "9th", label: "9th" },
    { value: "10th", label: "10th" },
    { value: "11th", label: "11th" },
    { value: "12th", label: "12th" },
    { value: "1st year", label: "1st year" },
    { value: "2nd year", label: "2nd year" },
    { value: "3rd year", label: "3rd year" },
    { value: "4th year", label: "4th year" },
    { value: "Working adult", label: "Working adult" },
    { value: "Other", label: "Other" },
  ];

  const boards = [
    { value: "MSB", label: "MSB" },
    { value: "CBSE", label: "CBSE" },
    { value: "ICSE", label: "ICSE" },
    { value: "IGCSE", label: "IGCSE" },
    { value: "IB", label: "IB" },
    { value: "CIE", label: "CIE" },
    { value: "ISC", label: "ISC" },
    { value: "NIOS", label: "NIOS" },
    { value: "CISCE", label: "CISCE" },
    { value: "BSEAP", label: "BSEAP" },
    { value: "APSBSE", label: "APSBSE" },
    { value: "AHSEC", label: "AHSEC" },
    { value: "BSEB", label: "BSEB" },
    { value: "CGBSE", label: "CGBSE" },
    { value: "GBSHSE", label: "GBSHSE" },
    { value: "GSEB", label: "GSEB" },
    { value: "HBSE", label: "HBSE" },
    { value: "HPBOSE", label: "HPBOSE" },
    { value: "JAC", label: "JAC" },
    { value: "JKBOSE", label: "JKBOSE" },
    { value: "KSEB", label: "KSEB" },
    { value: "MPBSE", label: "MPBSE" },
    { value: "MSBSHSE", label: "MSBSHSE" },
    { value: "COHSEM", label: "COHSEM" },
    { value: "MBOSE", label: "MBOSE" },
    { value: "MBSE", label: "MBSE" },
    { value: "NBSE", label: "NBSE" },
    { value: "BSE Odisha", label: "BSE Odisha" },
    { value: "PSEB", label: "PSEB" },
    { value: "RBSE", label: "RBSE" },
    { value: "SBSE", label: "SBSE" },
    { value: "TNBSE", label: "TNBSE" },
    { value: "BSE Telangana", label: "BSE Telangana" },
    { value: "TBSE", label: "TBSE" },
    { value: "UPMSP Or UPMSEB", label: "UPMSP Or UPMSEB" },
    { value: "UBSE", label: "UBSE" },
    { value: "WBBSE", label: "WBBSE" },
    { value: "Others", label: "Others" },
  ];

  const checkStringInGrades = (targetString) => {
    for (let i = 0; i < grades.length; i++) {
      if (grades[i].value === targetString) {
        return true;
      }
    }
    return false;
  };

  const result = checkStringInGrades(pfData?.grade);

  const formattedDataFunc = (dob) => {
    const today = new Date(dob);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const userProfileData = {
    fullName: pfData?.fullname ? pfData?.fullname : "",
    dob: formattedDataFunc(pfData?.dob),
    parentName: pfData?.parentName ? pfData?.parentName : "",
    parentEmail: pfData?.parentEmail ? pfData?.parentEmail : "",
    parentNo: pfData?.parentNo ? pfData?.parentNo : "",
    gender: { value: pfData?.gender, label: pfData?.gender },
    pincode: pfData?.pincode ? pfData?.pincode : "",
    grade: { value: pfData?.grade, label: pfData?.grade },
    otherGrade: pfData?.otherGrade ? pfData?.otherGrade : "",
    board: { value: pfData?.educationBoard, label: pfData?.educationBoard },
    otherBoard: pfData?.otherBoard ? pfData?.otherBoard : "",
    school: { value: pfData?.school, label: pfData?.school },
    city: { value: pfData?.city, label: pfData?.city },
    state: { value: pfData?.state, label: pfData?.state },
    referralCode:
      pfData?.referralCode == "undefined" || !pfData?.referralCode
        ? ""
        : pfData?.referralCode,
    schoolCode: pfData?.codeUsed?.school?.code
      ? pfData?.codeUsed?.school?.code
      : "",
  };

  useEffect(() => {
    if (
      pfData &&
      pfData.codeUsed &&
      pfData.codeUsed.coachings &&
      pfData?.codeUsed?.coachings[0]?.code?.length
    ) {
      const codes = pfData.codeUsed.coachings.map((coaching) => coaching.code);
      setChips(codes);
    }
    if (pfData?.dob) {
      setDateS(new Date(pfData.dob));
    }
    if (pfData?.educationBoard == "Others") {
      setOtherBoard(true);
    }
    if (pfData?.grade == "Other") {
      setIsOther(true);
      setboard(pfData?.otherBoard);
    }
  }, [pfData]);

  const initialValues = {
    fullName: userProfileData.fullName,
    parentName: userProfileData.parentName,
    parentEmail: userProfileData.parentEmail,
    parentNo: userProfileData.parentNo,
    selectedGender: userProfileData.gender,
    selectedGrade: userProfileData.grade,
    otherGrade: userProfileData.otherGrade,
    selectedBoard: userProfileData.board,
    otherBoard: userProfileData.otherBoard,
    selectInstitute: userProfileData.school,
    selectCity: userProfileData.city,
    selectState: userProfileData.state,
    selectedDate: new Date(userProfileData.dob),
    referralCode: userProfileData.referralCode,
    pincode: userProfileData.pincode,
    schoolCode: userProfileData.schoolCode,
  };

  useEffect(() => {
    const statessssss = Object.keys(stateCityData).map((state) => ({
      value: state,
      label: state,
    }));

    const citiesByState = {};
    Object.keys(stateCityData).forEach((statesjson) => {
      const cities = Object.keys(stateCityData[statesjson]);
      citiesByState[statesjson] = cities;
    });
    setCitiess(citiesByState);

    const selectedCityValues = Object.entries(citiesByState)
      .filter(([key, value]) => key === pfData?.state)
      .map(([key, value]) => value);

    const csssss = selectedCityValues[0]?.map((cityname) => {
      return { value: cityname, label: cityname };
    });
    setCities(csssss);
    setStateName(pfData?.state);

    setSelectedCity({ value: pfData?.city, label: pfData?.city });
    setStates(statessssss);
  }, [pfData?.city, pfData?.state]);

  useEffect(() => {
    dispatch(fetchInstituteData({ state: pfData?.state, city: pfData?.city }));
    const nested = institues.instituteData;
    const transformedCities = nested?.data?.institutes.map((city) => ({
      value: city.institute,
      label: city.institute,
    }));
    setInstitutes(transformedCities);
  }, [pfData?.city, pfData?.state]);

  const handleStateChangeCity = (selectedOption) => {
    if (stateName !== selectedOption.label) {
      setSelectedCity("");
    }
    const selectedCityValues = Object.entries(citiesss)
      .filter(([key, value]) => key === selectedOption.label)
      .map(([key, value]) => value);

    const csssss = selectedCityValues[0].map((cityname) => {
      return { value: cityname, label: cityname };
    });
    setCities(csssss);
    setStateName(selectedOption.label);
  };

  const handleStateChange = (inputValueAsString) => {
    const inputValue = String(inputValueAsString);

    if (typeof inputValue !== "string") {
      return;
    }
    if (inputValue == "") {
      const statessssss = Object.keys(stateCityData).map((state) => ({
        value: state,
        label: state,
      }));
      setStates(statessssss);
    } else {
      const filteredStates = states.filter((state) =>
        state.label.toLowerCase().startsWith(inputValue.toLowerCase())
      );

      const statesForAutocomplete = filteredStates.map((state) => ({
        value: state.value,
        label: state.label,
      }));
      setStates(statesForAutocomplete);
    }
  };

  const handleCityChange = async (name) => {
    const cityName = name.value;
    dispatch(fetchInstituteData({ state: stateName, city: cityName }))
    .then((response) => {
      const nested = response?.payload;
      const transformedCities = nested?.data?.institutes.map((city) => ({
        value: city.institute,
        label: city.institute,
      }));
      setInstitutes(transformedCities);
    })
    .catch((error) => {
      console.error('Error fetching institute data:', error);
    });
  };

  const handleCityChangeValue = (inputValueAsString) => {
    const inputValue = String(inputValueAsString);

    if (typeof inputValue !== "string") {
      return;
    }
    if (inputValue == "") {
      const selectedCityValues = Object.entries(citiesss)
        .filter(([key, value]) => key === stateName)
        .map(([key, value]) => value);

      const csssss = selectedCityValues[0].map((cityname) => {
        return { value: cityname, label: cityname };
      });

      setCities(csssss);
    } else {
      const filterCities = citiess.filter((city) =>
        city.label.toLowerCase().startsWith(inputValue.toLowerCase())
      );

      const statesForAutocomplete = filterCities.map((state) => ({
        value: state.value,
        label: state.label,
      }));

      setCities(statesForAutocomplete);
    }
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("This field is required"),
    parentName: parentInfo && Yup.string().required("This field is required"),
    parentEmail:
      parentInfo &&
      Yup.string()
        .required("This field is required")
        .matches(
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          "Invalid Email Format"
        ),
    ...(parentInfo && {
      parentNo: Yup.string()
        .required("This field is required")
        .matches(/^[0-9]{10}$/, "Invalid Number Format"),
    }),
    selectedGender: Yup.object().required("This field is required"),
    selectedGrade: Yup.object().required("This field is required"),
    selectedBoard: Yup.object().required("This field is required"),
    selectInstitute: Yup.object().required("This field is required"),

    selectCity: Yup.object().required("This field is required"),
    selectState: Yup.object().required("This field is required"),
    selectedDate: Yup.date().required("This field is required"),
  });

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (
        selectedFile.type == "image/jpeg" ||
        selectedFile.type == "image/jpg" ||
        selectedFile.type == "image/png"
      ) {
        if (selectedFile.size <= 2 * 1024 * 1024) {
          Submits3img(event, selectedFile);
        } else {
          toast.warn("Please select an image file smaller than 2MB.");
          event.target.value = null;
        }
      } else {
        toast.warn("Please select a JPG or PNG Image");
      }
    }
  };

  const Submits3img = async (event, selectedFile) => {
    setLoading(true);
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/s3/uploadProfile", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        setLoading(false);
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setAwsImg(data.url.key);
      setLoading(false);
    } catch (error) { }
  };

  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleSubmit = async (values, { resetForm }) => {
    const desiredCode = chips.map((item) => ({ code: item }));
    try {
      const jsonData = {
        fullname: values.fullName,
        image: awsImg ? awsImg : pfData.image,
        dob: formattedDataFunc(values.selectedDate),
        parentName: values.parentName,
        parentEmail: values.parentEmail,
        parentNo: values.parentNo,
        gender: values.selectedGender.value,
        grade: values.selectedGrade.value,
        otherGrade: values.selectedGrade.value == "Other" ? grade : "",
        educationBoard: values.selectedBoard.value,
        otherBoard: values.selectedBoard.value == "Others" ? board : "",
        school: values.selectInstitute.value,
        state: values.selectState.label,
        city: values.selectCity.value,
        pincode: values.pincode,
        referralCode: values?.referralCode,
        codeUsed: {
          school: { code: values.schoolCode },
          coachings: desiredCode,
        },
      };
      await dispatch(postProfileData(jsonData))
        .then((res) => {
          if (res?.payload?.data?.success) {
            toast.success("Profile updated successfully");
            setLoading(false);
            dispatch(fetchUserData());
          } else {
            toast.error("Something went wrong");
            setLoading(false);
          }
        })
        .catch((error) => { });
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  function isUnder18YearsAgo(givenDate) {
    const currentDate = new Date();
    const timeDiff = currentDate - givenDate;
    const yearsDiff = timeDiff / (1000 * 60 * 60 * 24 * 365.25);
    if (yearsDiff < 18) {
      setParentInfo(true);
    } else {
      setParentInfo(false);
    }
  }

  useEffect(() => {
    const givenDate = new Date(pfData?.dob);
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    if (givenDate < eighteenYearsAgo) {
      setParentInfo(false);
    } else {
      setParentInfo(true);
    }

  }, [])

  const renderYearContent = (year) => {
    const tooltipText = `Tooltip for year: ${year}`;
    return <span title={tooltipText}>{year}</span>;
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#ffcc02" : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        borderBottom: "1px solid #D9D9D9",
        background: "rgba(217, 217, 217, 0.45)",
        color: "black",
      },
    }),
  };
  return (
    <>
      <section className="lyt-section typ-authentication typ-profile">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 mt-4 mb-5 border-b-2 border-[#c2c2c2] pb-10">
              <div className="profile-image">
                <h2 className="profile-title text-base text-[#979797] mt-[20px]">
                  Your Profile Picture
                </h2>
                <div className="profile flex items-end justify-start">
                  <Image
                    data-TestId="profile_img"
                    src={
                      awsImg || pfData?.image
                        ? `${process.env.NEXT_PUBLIC_BUCKET_URL}/${
                            awsImg ? awsImg : pfData.image
                          }`
                        : "/userIcon.jpeg"
                    }
                    height={85}
                    width={90}
                    alt="profile-image"
                    className={`profile-img h-[90px] w-[90px] rounded-xl shadow-sm1`}
                  />

                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    id="profilePicInput"
                    accept="image/jpeg, image/png"
                    style={{ display: "none" }}
                  />
                  <button
                    onClick={handleClick}
                    className="disabled profile-button flex h-[35px] min-w-[80px] border-1 items-center justify-center px-2 py-2 ml-5 space-x-1 rounded-lg font-medium bg-white text-[#ffcc02] border-[#ffcc02]"
                  >
                    {loading ? (
                      <ClipLoader color="black" size={18} speedMultiplier={1} />
                    ) : (
                      <>
                        <Image
                          data-TestId="pen_logo_img"
                          src={`/pen.png`}
                          alt="edit"
                          width={15}
                          height={15}
                          className="phone ml-1"
                        />
                        <span className="pr-4">Edit</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-7 col-12 mob-height p-03">
              <div className="login-right profile-setting">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, setFieldValue, handleChange }) => (
                    <Form className="bs-form typ-profile">
                      <div className="input-fields">
                        <div className="field-box">
                          <label htmlFor="fullName" className="text-title">
                            Full name<sup>{" *"}</sup>
                          </label>
                          <Field
                            className="!w-[255px]"
                            placeholder="Enter your full name"
                            type="text"
                            id="fullName"
                            name="fullName"
                          />
                          <ErrorMessage
                            name="fullName"
                            component="div"
                            className="error-msg"
                          />
                        </div>
                        <div className="field-box bs-calender">
                          <label htmlFor="selectedDate" className="text-title">
                            Date of birth<sup>*</sup>
                          </label>
                          <Field className="!w-[255px]" name="selectedDate">
                            {({ dob }) => (
                              <DatePicker
                                className="bs-calender !w-[255px]"
                                selected={dateS}
                                onChange={(date) => {
                                  setDateS(new Date(date));
                                  setFieldValue("selectedDate", date);
                                  isUnder18YearsAgo(date);
                                }}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                scrollableMonthYearDropdown
                                scrollableYearDropdown
                                renderYearContent={renderYearContent}
                                maxDate={new Date()} // To prevent future dates
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select Date of Birth"
                                yearDropdownItemNumber={100}
                              />
                            )}
                          </Field>

                          <ErrorMessage
                            name="selectedDate"
                            component="span"
                            className="error-msg"
                          />
                        </div>
                        {parentInfo ? (
                          <>
                            <div className="field-box">
                              <label
                                htmlFor="parentName"
                                className="text-title"
                              >
                                Parent name<sup>{" *"}</sup>
                              </label>
                              <Field
                                className="!w-[255px]"
                                placeholder="Enter your full name"
                                type="text"
                                id="parentName"
                                name="parentName"
                              />
                              <ErrorMessage
                                name="parentName"
                                component="div"
                                className="error-msg"
                              />
                            </div>

                            <div className="field-box">
                              <label
                                htmlFor="parentEmail"
                                className="text-title"
                              >
                                Parent email id<sup>{" *"}</sup>
                              </label>
                              <Field
                                className="!w-[255px]"
                                placeholder="Enter your parent email id"
                                type="text"
                                id="parentEmail"
                                name="parentEmail"
                              />
                              <ErrorMessage
                                name="parentEmail"
                                component="div"
                                className="error-msg"
                              />
                            </div>

                            <div className="field-box">
                              <label htmlFor="parentNo" className="text-title">
                                Parent mobile no<sup>{" *"}</sup>
                              </label>
                              <Field
                                className="!w-[255px]"
                                placeholder="Enter parent mobile no"
                                type="text"
                                id="parentNo"
                                name="parentNo"
                                value={values.parentNo}
                                onChange={(e) => {
                                  const inputVal = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                                  setFieldValue('parentNo', inputVal.slice(0, 10)); // Set field value to first 10 characters
                                }}
                              />
                              <ErrorMessage
                                name="parentNo"
                                component="div"
                                className="error-msg"
                              />
                            </div>
                          </>
                        ) : (
                          ""
                        )}

                        <div className="field-box">
                          <label htmlFor="gender" className="text-title">
                            Gender<sup>{" *"}</sup>
                          </label>
                          <Field
                            className="!w-[255px]"
                            as={Select}
                            id="selectedGender"
                            name="selectedGender"
                            options={genders}
                            placeholder="Select your gender"
                            isSearchable={true}
                            styles={customStyles}
                            onChange={(selectedOption) => {
                              setFieldValue("selectedGender", {
                                value: selectedOption.value,
                                label: selectedOption.label,
                              });
                            }}
                          />
                          <ErrorMessage
                            name="selectedGender"
                            component="div"
                            className="error-msg"
                          />
                        </div>

                        <div className="field-box">
                          <label htmlFor="grade" className="text-title">
                            Grade/Class<sup>{" *"}</sup>
                          </label>
                          <Field
                            className="!w-[255px]"
                            as={Select}
                            id="selectedGrade"
                            name="selectedGrade"
                            options={grades}
                            placeholder="Enter your Field"
                            isSearchable={true}
                            styles={customStyles}
                            // menuIsOpen={true}
                            onChange={(selectedOption) => {
                              if (selectedOption.value == "Other") {
                                setIsOther(true);
                              } else {
                                setIsOther(false);
                              }
                              setFieldValue("selectedGrade", {
                                value: selectedOption.value,
                                label: selectedOption.label,
                              });
                            }}
                          />
                          <ErrorMessage
                            name="selectedGrade"
                            component="div"
                            className="error-msg"
                          />
                        </div>

                        {isOther && (
                          <div className={`field-box `}>
                            <label htmlFor="sss" className="text-title">
                              Others/Aspirants<sup>{" *"}</sup>
                            </label>
                            <Field
                              type="text"
                              className="!w-[255px]"
                              id="otherGrade"
                              name="otherGrade"
                              placeholder="Enter your Field"
                              value={grade} // Initialize value with pfData?.grade
                              onChange={(event) => {
                                setGrade(event.target.value);
                              }}
                            />
                            <ErrorMessage
                              name="selectedGrade"
                              component="div"
                              className="error-msg"
                            />
                          </div>
                        )}

                        {/* Education Boards */}

                        <div className="field-box">
                          <label htmlFor="board" className="text-title">
                            Education Board<sup>{" *"}</sup>
                          </label>
                          <Field
                            className="!w-[255px]"
                            as={Select}
                            id="selectedBoard"
                            name="selectedBoard"
                            options={boards}
                            placeholder="Enter your Field"
                            isSearchable={true}
                            styles={customStyles}
                            onChange={(selectedOption) => {
                              if (selectedOption.value == "Others") {
                                setOtherBoard(true);
                              } else {
                                setOtherBoard(false);
                              }
                              setFieldValue("selectedBoard", {
                                value: selectedOption.value,
                                label: selectedOption.label,
                              });
                            }}
                          />
                          <ErrorMessage
                            name="selectedBoard"
                            component="div"
                            className="error-msg"
                          />
                        </div>

                        {othersBoard && (
                          <div className={`field-box`}>
                            <label htmlFor="sss" className="text-title">
                              Others<sup>{" *"}</sup>
                            </label>
                            <Field
                              type="text"
                              className="!w-[255px]"
                              id="otherBoard"
                              name="otherBoard"
                              placeholder="Enter your Field"
                              value={board} // Initialize value with pfData?.grade
                              onChange={(event) => {
                                setboard(event.target.value);
                              }}
                            />
                            <ErrorMessage
                              name="selectedBoard"
                              component="div"
                              className="error-msg"
                            />
                          </div>
                        )}

                        {/* States */}

                        <div className="field-box">
                          <label htmlFor="state" className="text-title">
                            State<sup>{" *"}</sup>
                          </label>
                          <Field
                            className="!w-[255px]"
                            as={Select}
                            id="selectState"
                            name="selectState"
                            options={states}
                            placeholder="Select your state"
                            isSearchable={true}
                            styles={customStyles}
                            onChange={(selectedOption) => {
                              handleStateChangeCity(selectedOption),
                                setFieldValue("selectState", {
                                  value: selectedOption.value,
                                  label: selectedOption.label,
                                });
                            }}
                            onInputChange={(inputValue) => {
                              handleStateChange(inputValue);
                              setFieldValue("selectInstitute", "");
                              setFieldValue("selectCity", "");
                              // Additional logic if needed
                            }}
                          />
                          <ErrorMessage
                            name="selectState"
                            component="div"
                            className="error-msg"
                          />
                        </div>

                        {/* City */}

                        <div className="field-box ">
                          <label htmlFor="city" className="text-title">
                            City<sup>{" *"}</sup>
                          </label>

                          <Field
                            className="!w-[255px]"
                            as={Select}
                            id="selectCity"
                            name="selectCity"
                            options={citiess}
                            placeholder="Select your city"
                            isSearchable={true}
                            styles={customStyles}
                            value={selectedCity}
                            onInputChange={(inputValue) => {
                              // handleStateChange(inputValue);
                              handleCityChangeValue(inputValue);
                              setFieldValue("selectInstitute", "");
                              // Additional logic if needed
                            }}
                            onChange={(selectedOption) => {
                              handleCityChange(selectedOption),
                                setSelectedCity(selectedOption);
                              setFieldValue("selectCity", {
                                value: selectedOption.value,
                                label: selectedOption.label,
                              });
                            }}
                          />
                          <ErrorMessage
                            name="selectCity"
                            component="div"
                            className="error-msg"
                          />
                        </div>

                        {/* School/Institute */}

                        <div className="field-box">
                          <label htmlFor="insititute" className="text-title">
                            School/Institute<sup>{" *"}</sup>
                          </label>

                          <Field
                            className="!w-[255px]"
                            as={CreatableSelect}
                            id="selectInstitute"
                            name="selectInstitute"
                            options={institutes}
                            placeholder="Select your institute"
                            isSearchable={true}
                            styles={customStyles}
                            onChange={(selectedOption) => {
                              setFieldValue("selectInstitute", {
                                value: selectedOption
                                  ? selectedOption.value
                                  : "",
                                label: selectedOption
                                  ? selectedOption.label
                                  : "",
                              });
                            }}
                          />
                          <ErrorMessage
                            name="selectInstitute"
                            component="div"
                            className="error-msg"
                          />
                        </div>

                        {/* Pin code */}

                        <div className="field-box">
                          <label htmlFor="pincode" className="text-title">
                            Pin code
                          </label>
                          <Field
                            className="!w-[255px]"
                            placeholder="Enter your pin code"
                            type="text"
                            id="pincode"
                            name="pincode"
                          />
                          <ErrorMessage
                            name="pincode"
                            component="div"
                            className="error-msg"
                          />
                        </div>

                        {/* Referral Code */}

                        <div className="field-box">
                          <label htmlFor="referralCode" className="text-title">
                            Referral code
                          </label>
                          <Field
                            placeholder="Enter referral code"
                            type="text"
                            id="referralCode"
                            name="referralCode"
                            className="disabled:cursor-not-allowed !w-[255px]"
                            disabled={
                              pfData?.referralCode == "undefined" ||
                                !pfData?.referralCode
                                ? false
                                : true
                            }
                          />
                          <ErrorMessage
                            name="referralCode"
                            component="div"
                            className="error-msg"
                          />
                        </div>

                        <div className="field-box">
                          <label htmlFor="schoolCode" className="text-title">
                            School code
                          </label>
                          <Field
                            placeholder="Enter school code"
                            type="text"
                            id="schoolCode"
                            name="schoolCode"
                            className="!w-[255px]"
                          // disabled={pfData?.codeUsed?.school?.code}
                          />
                          <ErrorMessage
                            name="schoolCode"
                            component="div"
                            className="error-msg"
                          />
                        </div>
                        <div className="field-box">
                          <label
                            htmlFor="coachingCode"
                            className="text-title"
                          >
                            Coaching code
                          </label>

                          <ChipInput
                            chips={chips}
                            onAddChip={handleAddChip}
                            onDeleteChip={handleDeleteChip}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className={`bs-form btn-submit mt-35 `}
                      >
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default SettingProfileComp;
