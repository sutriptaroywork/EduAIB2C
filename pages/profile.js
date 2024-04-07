import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import loginBanner from "../styles/sass/images/landing-page/login-banner.png";
import Select from "react-select";
import Modal from "react-modal";
import Image from "next/image";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import CreatableSelect from "react-select/creatable";
import stateCityData from "../jsonFile/StateCity";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import Skeleton from "react-loading-skeleton";
import { updateUserDataRedux } from "../redux/slices/userDataSlice";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectCount, setselectCount] = useState(0);
  const [parentInfo, setParentInfo] = useState(false);
  const [subject, setSubjects] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [image, setImage] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [states, setStates] = useState([]);
  const [citiess, setCities] = useState([]);
  const [stateName, setStateName] = useState();
  const [institutes, setInstitutes] = useState();

  const [other, isOther] = useState(false);
  const [others, isOthers] = useState(false);
  const [grade, setGrade] = useState("");
  const [board, setBoard] = useState("");

  const [citiesss, setCitiess] = useState({});
  const [selectedCity, setSelectedCity] = useState(""); // Add selectedCity state
  const [awsImg, setAwsImg] = useState(null);
  const [imageLoad, setImageLoad] = useState(false);
  const [profData, setProfData] = useState(null);

  const [parentNo, setParentNo] = useState('');

  useEffect(() => {
    const gToken = getCookie("gToken");
    const userTokened = localStorage.getItem("userToken");
    if (gToken?.length > 0) {
      setUserToken(gToken);
      localStorage.setItem("userToken", gToken);
      deleteCookie("gToken");
      router.push("/profile");
    } else if (userTokened) {
      setUserToken(userTokened);
    } else {
    }
  }, []);

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
    setStates(statessssss);
  }, []);

  const Submits3img = async (event, selectedFile) => {
    event.preventDefault();
    setImageLoad(true);
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
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setImageLoad(false);
      setAwsImg(data.url.key);
    } catch (error) {
      setImageLoad(false);
    }
  };

  const handleStateChangeCity = (selectedOption) => {
    if (stateName !== selectedOption.label) {
      // If the stateName is not equal to selectedOption.label, clear the selected city
      setSelectedCity("");
    }

    // If they are the same, update the cities with new values
    const selectedCityValues = Object.entries(citiesss)
      .filter(([key, value]) => key === selectedOption.label)
      .map(([key, value]) => value);

    const csssss = selectedCityValues[0].map((cityname) => {
      return { value: cityname, label: cityname };
    });

    setCities(csssss);

    // Update the stateName
    setStateName(selectedOption.label);
  };

  const handleStateChange = (inputValueAsString) => {
    const inputValue = String(inputValueAsString);

    if (typeof inputValue !== "string") {
      // Handle the case where inputValue is not a string (optional)
      return;
    }
    if (inputValue == "") {
      const statessssss = Object.keys(stateCityData).map((state) => ({
        value: state,
        label: state,
      }));
      setStates(statessssss);
    } else {
      // Filter the states based on the input value
      const filteredStates = states.filter((state) =>
        state.label.toLowerCase().startsWith(inputValue.toLowerCase())
      );

      // Map the filtered states to the format expected by react-select
      const statesForAutocomplete = filteredStates.map((state) => ({
        value: state.value,
        label: state.label,
      }));

      setStates(statesForAutocomplete);
    }
  };

  const handleCityChangeValue = (inputValueAsString) => {
    const inputValue = String(inputValueAsString);

    if (typeof inputValue !== "string") {
      // Handle the case where inputValue is not a string (optional)
      return;
    }
    if (inputValue == "") {
      const selectedCityValues = Object.entries(citiesss)
        .filter(([key, value]) => key === stateName)
        .map(([key, value]) => value);

      const csssss = selectedCityValues[0]?.map((cityname) => {
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

  const handleCityChange = async (name) => {
    const cityName = name.value;
    if (name) {
      const userToken = localStorage.getItem("userToken");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME}/dashboard/institute?state=${stateName}&city=${cityName}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const transformedCities = data?.institutes.map((city) => ({
          value: city.institute,
          label: city.institute,
        }));
        setInstitutes(transformedCities);
      } catch (error) { }
    }
  };

  const initialValues = {
    fullName: "",
    parentName: "",
    parentEmail: "",
    parentNo: "",
    selectedGender: "",
    selectedGrade: "",
    selectedBoard: "",
    selectInstitute: "",
    selectCity: "",
    pincode: "",
    selectState: "",
    selectedDate: "",
    connectWith: "",
    connectWithCode: "",
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

    pincode: Yup.string()
      .required("This field is required")
      .matches(/^\d{6}$/, "Invalid Pin code"),
    selectedGender: Yup.object().required("This field is required"),
    selectedGrade: Yup.object().required("This field is required"),
    selectedBoard: Yup.object().required("this field is required"),
    selectInstitute: Yup.object().required("This field is required"),
    selectCity: Yup.object().required("This field is required"),
    selectState: Yup.object().required("This field is required"),
    // selectedDate: Yup.object().required("birthdate is required"),
    selectedDate: Yup.date().required("This field is required"),
  });

  const topicsData = [
    { title: "Artificial Intelligence", imageSrc: "/images/subjects/Ai.jpg" },
    { title: "Arts and Creativity", imageSrc: "/images/subjects/Arts.jpg" },
    {
      title: "Business Administration",
      imageSrc: "/images/subjects/business.jpg",
    },
    {
      title: "Chemical Engineering",
      imageSrc: "/images/subjects/chemichal.jpg",
    },
    { title: "Civil Engineering", imageSrc: "/images/subjects/civil.jpg" },
    {
      title: "Cooking & Culinary Arts",
      imageSrc: "/images/subjects/cooking.jpg",
    },
    { title: "Economics", imageSrc: "/images/subjects/economics.jpg" },
    {
      title: "Education and Pedagogy",
      imageSrc: "/images/subjects/education.jpg",
    },
    {
      title: "Electrical Engineering",
      imageSrc: "/images/subjects/electrical.jpg",
    },
    {
      title: "Entrepreneurship",
      imageSrc: "/images/subjects/entrepreneurship.jpg",
    },
    { title: "Fashion and Design", imageSrc: "/images/subjects/fashion.jpg" },
    { title: "Finance & Accounting", imageSrc: "/images/subjects/finance.jpg" },

    { title: "Gaming", imageSrc: "/images/subjects/gaming.jpg" },
    { title: "Gardening", imageSrc: "/images/subjects/gardening.jpg" },
    { title: "Geography", imageSrc: "/images/subjects/geography.jpg" },
    { title: "History", imageSrc: "/images/subjects/history.jpg" },
    { title: "Language", imageSrc: "/images/subjects/language.jpg" },
    { title: "Law and Criminal Justice", imageSrc: "/images/subjects/law.jpg" },
    { title: "Literature", imageSrc: "/images/subjects/literature.jpg" },
    { title: "Marketing", imageSrc: "/images/subjects/marketing.jpg" },
    { title: "Mathematics", imageSrc: "/images/subjects/mathematics.jpg" },
    {
      title: "Mechanical Engineering",
      imageSrc: "/images/subjects/mechanichal.jpg",
    },
    { title: "Medicine", imageSrc: "/images/subjects/medicine.jpg" },
    { title: "Music", imageSrc: "/images/subjects/music.jpg" },

    { title: "Nutrition", imageSrc: "/images/subjects/nutrition.jpg" },
    {
      title: "Philanthropy and Social Activism",
      imageSrc: "/images/subjects/philanthropy.jpg",
    },
    { title: "Philosophy", imageSrc: "/images/subjects/philosophy.jpg" },
    {
      title: "Philosophy and Ethics",
      imageSrc: "/images/subjects/philosophy_ethics.jpg",
    },
    { title: "Photography", imageSrc: "/images/subjects/photography.jpg" },
    {
      title: "Political Science",
      imageSrc: "/images/subjects/political_science.jpg",
    },
    { title: "Psychology", imageSrc: "/images/subjects/psychology.jpg" },
    { title: "Religion", imageSrc: "/images/subjects/religion.jpg" },
    { title: "Renewable Energy", imageSrc: "/images/subjects/renewable.jpg" },
    { title: "Robotics", imageSrc: "/images/subjects/robotics.jpg" },
    { title: "Science", imageSrc: "/images/subjects/science.jpg" },
    { title: "Space and Exploration", imageSrc: "/images/subjects/space.jpg" },

    { title: "Sports", imageSrc: "/images/subjects/sports.jpg" },
    { title: "Technology", imageSrc: "/images/subjects/technology.jpg" },
    { title: "Travel & Tourism", imageSrc: "/images/subjects/travel.jpg" },
  ];

  const [topicCheckboxes, setTopicCheckboxes] = useState(
    Array(topicsData.length).fill(false)
  );

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  // ---------------------------------------------
  const genders = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
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

  const handleSubmit = (values) => {
    const data = {
      fullname: values.fullName,
      image: awsImg ? awsImg : "",
      dob: formattedDataFunc(values.selectedDate),
      parentName: values.parentName,
      parentEmail: values.parentEmail,
      parentNo: values.parentNo,
      gender: values.selectedGender.value,
      grade: values.selectedGrade.value,
      otherGrade: values.selectedGrade.value == "Other" ? grade : "",
      educationBoard: values.selectedBoard.value,
      otherBoard: values.selectedGrade.value == "Others" ? board : "",
      school: values.selectInstitute.value,
      city: values.selectCity.value,
      pincode: values.pincode,
      state: values.selectState.value,
      referralCode: values.referralCode ? values.referralCode : "",
      codeUsed: values.connectWith.length
        ? {
          school: {
            code:
              values.connectWith == "school" ? values.connectWithCode : "",
          },
          coachings:values?.connectWith == "coaching" && values?.connectWithCode?.length ? [
            {
              code:
                values.connectWith == "coaching"
                  ? values.connectWithCode
                  : "",
            },
          ]:[],
        }
        : {
          school: {
            code: "",
          },
          coachings: [],
        },
    };
    setProfData(data);
    openModal();
  };

  // handle profile latest
  const submitProfileData = async () => {
    let temp = { ...profData };
    (temp.areaOfInterest = subject), (temp.completed = true), setProfData(temp);
    const payload = { ...temp };
    dispatch(updateUserDataRedux(payload)).then((resAction) => {
      if (resAction.payload) {
        if (!resAction?.payload?.success && !resAction.payload.data) {
          toast.error(resAction?.payload?.error);
          setIsOpen(false);
        } else {
          setCookie("isComplete", "true");
          toast.success(resAction.payload.data.message);
          router.push("/dashboard");
        }
      }
    });
  };

  const formattedDataFunc = (dob) => {
    const today = dob ? new Date(dob) : new Date(profileData.dob);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  // check age is below or above 18
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

  const renderYearContent = (year) => {
    const tooltipText = `Tooltip for year: ${year}`;
    return <span title={tooltipText}>{year}</span>;
  };

  // for click on Modal and handel checked checkboxes and counts shouldnt above 6
  const handleTopicClick = (index) => {
    const updatedCheckboxes = [...topicCheckboxes];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    const trueValues = updatedCheckboxes.filter((value) => value === true);
    const trueCount = trueValues.length;

    setselectCount(trueCount);
    setTopicCheckboxes(updatedCheckboxes);
    const selectedTopic = topicsData[index].title;
    if (subject.includes(selectedTopic)) {
      setSubjects((prevSubjects) =>
        prevSubjects.filter((subjectItem) => subjectItem !== selectedTopic)
      );
    } else {
      setSubjects((prevSubjects) => [...prevSubjects, selectedTopic]);
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#ffcc02" : "white", // Set your theme color here
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        // color: 'white', // Change the hover text color here
        borderBottom: "1px solid #D9D9D9",
        background: "rgba(217, 217, 217, 0.45)",
        color: "black",
      },
    }),

    // You can add more custom styles for other elements like control, singleValue, etc. as needed
  };

  const hiddenFileInput = useRef(null);

  const handleAddImage = (event) => {
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
        toast.warn("Please select a JPG, JPEG, or PNG image.");
      }
    }
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <section className="lyt-section typ-authentication typ-profile">
        <ToastContainer />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5 col-md-5 col-12  p-0">
              <div className="login-left">
                <div className="typ-big-img">
                  <Image
                    src={loginBanner}
                    alt="book"
                    className="img-fluid ban-img"
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-7 col-md-12 col-12 mob-height p-0">
              <div className="login-right  max-h-[100vh]">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  className=""
                >
                  {({ values, setFieldValue, handleChange }) => (
                    <Form className="bs-form typ-profile overflow-y-scroll mt-3">
                      <div className="profile-box">
                        <div className="profile-heading">
                          <h2 className="title">My Profile</h2>
                          <p className="desc">
                            Get started by creating your Profile
                          </p>
                        </div>
                        <div className="img-box">
                          {!imageLoad ? (
                            <div>
                              <Image
                                id="profileImg"
                                src={
                                  awsImg
                                    ? `${process.env.NEXT_PUBLIC_BUCKET_URL}/${awsImg}`
                                    : `/userIcon.jpeg`
                                }
                                alt="profile.png"
                                width={60}
                                height={60}
                                className=" h-[60px] w-[60px]  rounded-xl shadow-sm"
                              />
                            </div>
                          ) : (
                            <div>
                              <Skeleton
                                height={60}
                                width={60}
                                className="rounded-sm"
                              />
                            </div>
                          )}

                          <input
                            type="file"
                            id="profilePicInput"
                            name="image"
                            ref={hiddenFileInput}
                            onChange={handleAddImage}
                            accept="image/jpeg, image/png"
                            style={{ display: "none" }}
                          />

                          <button
                            type="button"
                            onClick={handleClick}
                            className="disabled"
                          >
                            <Image
                              src={`/edit-icon.png`}
                              alt="edit-icon"
                              width={16}
                              height={16}
                              className="editIcon"
                            />
                          </button>
                        </div>
                      </div>

                      {/* Full name */}

                      <div className="input-fields">
                        <div className="field-box min-h-[85px]">
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
                            className="error-msg !bottom-[4px]"
                          />
                        </div>

                        {/* DOB */}

                        <div className="field-box min-h-[85px] bs-calender">
                          <label htmlFor="selectedDate" className="text-title">
                            Date of birth<sup>*</sup>
                          </label>
                          <Field className="!w-[255px]" name="selectedDate">
                            {({ field }) => (
                              <DatePicker
                                className="bs-calender !w-[255px] "
                                selected={field.value}
                                onChange={(date) => {
                                  setFieldValue("selectedDate", date);
                                  isUnder18YearsAgo(date);
                                }}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                scrollableYearDropdown
                                scrollableMonthDropdown
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
                            className="error-msg !bottom-[4px]"
                          />
                        </div>

                        {parentInfo ? (
                          <>
                            <div className="field-box min-h-[85px]">
                              <label
                                htmlFor="parentName"
                                className="text-title"
                              >
                                Parent name<sup>{" *"}</sup>
                              </label>
                              <Field
                                className="!w-[255px]"
                                placeholder="Enter full name"
                                type="text"
                                id="parentName"
                                name="parentName"
                              />
                              <ErrorMessage
                                name="parentName"
                                component="div"
                                className="error-msg !bottom-[4px]"
                              />
                            </div>
                            <div className="field-box min-h-[85px]">
                              <label
                                htmlFor="parentEmail"
                                className="text-title"
                              >
                                Parent email id<sup>{" *"}</sup>
                              </label>
                              <Field
                                className="!w-[255px]"
                                placeholder="Enter parent email id"
                                type="text"
                                id="parentEmail"
                                name="parentEmail"
                              />
                              <ErrorMessage
                                name="parentEmail"
                                component="div"
                                className="error-msg !bottom-[4px]"
                              />
                            </div>
                            <div className="field-box min-h-[85px]">
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
                                className="error-msg !bottom-[4px]"
                              />
                            </div>
                          </>
                        ) : (
                          ""
                        )}

                        {/* Gender */}

                        <div className="field-box min-h-[85px]">
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
                            className="error-msg !bottom-[4px]"
                          />
                        </div>

                        {/* Grade/class */}

                        <div className="field-box min-h-[85px] ">
                          <label htmlFor="grade" className="text-title">
                            Grade/Class<sup>{" *"}</sup>
                          </label>
                          <Field
                            className="!w-[255px]"
                            as={Select}
                            id="selectedGrade"
                            name="selectedGrade"
                            options={grades}
                            placeholder="Select your grade"
                            isSearchable={true}
                            styles={customStyles}
                            // menuIsOpen={true}
                            onChange={(selectedOption) => {
                              if (selectedOption.value === "Other") {
                                isOther(true);
                              } else {
                                isOther(false);
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
                            className="error-msg !bottom-[4px]"
                          />
                        </div>

                        {/* Other grade */}

                        {other && (
                          <div className={`field-box min-h-[85px] `}>
                            <label htmlFor="sss" className="text-title">
                              Others/Aspirants<sup>{" *"}</sup>
                            </label>
                            <Field
                              type="text"
                              className="!w-[255px]"
                              id="sss"
                              name="sss"
                              placeholder="Enter your Feild"
                              isSearchable={true}
                              onChange={(event) => {
                                setGrade(event.target.value);
                              }}
                            />
                            <ErrorMessage
                              name="selectedGrade"
                              component="div"
                              className="error-msg !bottom-[4px]"
                            />
                          </div>
                        )}

                        {/* Eduction Board */}

                        <div className="field-box min-h-[85px] ">
                          <label htmlFor="board" className="text-title">
                            Education Board<sup>{" *"}</sup>
                          </label>
                          <Field
                            className="!w-[255px]"
                            as={Select}
                            id="selectedBoard"
                            name="selectedBoard"
                            options={boards}
                            placeholder="Enter your education board"
                            isSearchable={true}
                            styles={customStyles}
                            // menuIsOpen={true}
                            onChange={(selectedOption) => {
                              if (selectedOption.value === "Others") {
                                isOthers(true);
                              } else {
                                isOthers(false);
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
                            className="error-msg !bottom-[4px]"
                          />
                        </div>

                        {/* Others Eduction Board */}

                        {others && (
                          <div className={`field-box min-h-[85px] `}>
                            <label htmlFor="sss" className="text-title">
                              Others<sup>{" *"}</sup>
                            </label>
                            <Field
                              type="text"
                              className="!w-[255px]"
                              // as={Select}
                              id="sss"
                              name="sss"
                              placeholder="Enter your Feild"
                              isSearchable={true}
                              onChange={(event) => {
                                setBoard(event.target.value);
                              }}
                            />
                            <ErrorMessage
                              name="selectedBoard"
                              component="div"
                              className="error-msg !bottom-[4px]"
                            />
                          </div>
                        )}

                        {/* State */}

                        <div className="field-box min-h-[85px]">
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
                              // Additional logic if needed
                            }}
                          />
                          <ErrorMessage
                            name="selectState"
                            component="div"
                            className="error-msg !bottom-[4px]"
                          />
                        </div>

                        {/* City */}

                        <div className="field-box min-h-[85px] ">
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
                            noOptionsMessage={() => "Please select state first"}
                          />
                          <ErrorMessage
                            name="selectCity"
                            component="div"
                            className="error-msg !bottom-[4px]"
                          />
                        </div>

                        {/* School/Institute */}

                        <div className="field-box min-h-[85px]">
                          <label htmlFor="insititute" className="text-title">
                            School/Institute<sup>{" *"}</sup>
                          </label>
                          <Field
                            className="!w-[255px]"
                            as={CreatableSelect}
                            id="selectInstitute"
                            name="selectInstitute"
                            options={institutes}
                            placeholder="Enter your Institute Name"
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
                            noOptionsMessage={() => "Please select city first"}
                          />
                          <ErrorMessage
                            name="selectInstitute"
                            component="div"
                            className="error-msg !bottom-[4px]"
                          />
                        </div>

                        {/* Pin code */}

                        <div className="field-box min-h-[85px]">
                          <label htmlFor="pincode" className="text-title">
                            Pin code<sup>{" *"}</sup>
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
                            className="error-msg !bottom-[4px]"
                          />
                        </div>

                        {/* Referral code*/}

                        <div className="field-box min-h-[85px]">
                          <label htmlFor="referralCode" className="text-title">
                            Referral code
                          </label>
                          <Field
                            className="!w-[255px]"
                            placeholder="Enter referral code"
                            type="text"
                            id="referralCode"
                            name="referralCode"
                          />
                          <ErrorMessage
                            name="referralCode"
                            component="div"
                            className="error-msg !bottom-[4px]"
                          />
                        </div>

                        {/* Radio buttons for 'Connect with' */}
                        <div className="field-box min-h-[85px]">
                          <label className="text-title">Connect with</label>
                          <div className="flex items-center space-x-4 h-[40%]">
                            <label className="inline-flex items-center">
                              <Field
                                type="radio"
                                name="connectWith"
                                value="school"
                                className="form-radio h-5 w-5 text-blue-600 mt-[0.9rem]"
                              />
                              <span className="ml-2">School</span>
                            </label>
                            <label className="inline-flex items-center">
                              <Field
                                type="radio"
                                name="connectWith"
                                value="coaching"
                                className="form-radio h-5 w-5 text-blue-600 mt-[0.9rem]"
                              />
                              <span className="ml-2">Coaching</span>
                            </label>
                          </div>
                        </div>

                        {values.connectWith && (
                          <div className="field-box min-h-[85px]">
                            <label
                              htmlFor="connectWithCode"
                              className="text-title"
                            >{`${values.connectWith.charAt(0).toUpperCase() +
                              values.connectWith.slice(1)
                              } Code`}</label>
                            <Field
                              className="!w-[255px]"
                              placeholder="Enter code"
                              type="text"
                              id="connectWithCode"
                              name="connectWithCode"
                            />
                            <ErrorMessage
                              name="connectWithCode"
                              component="div"
                              className="error-msg !bottom-[4px]"
                            />
                          </div>
                        )}

                        {/* Submit button */}
                      </div>

                      <button
                        type="submit"
                        className="bs-form btn-submit mt-15 p-[10px]"
                      >
                        Submit
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category model */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="bs-modal"
      >
        <div className="inner-container">
          <div className="header-part">
            <h2 className="title">What Are Your Interest</h2>
          </div>

          <div
            className="topics"
            style={{ maxHeight: "350px", overflowY: "auto" }}
          >
            {topicsData.map((topic, index) => (
              <div
                className="topic cursor-pointer"
                key={index}
                onClick={() => handleTopicClick(index)}
              >
                <Image
                  src={topic.imageSrc}
                  alt={topic.imageSrc}
                  width={110}
                  height={110}
                  className="img-fluid"
                />
                <label className="circular-checkbox">
                  <div className="csm-checkbox">
                    <input
                      type="checkbox"
                      checked={topicCheckboxes[index]}
                    // onChange={() => handleTopicClick(index)}
                    />
                    <span className="checkmark"></span>
                  </div>
                </label>
                <span className="title">{topic.title}</span>
              </div>
            ))}
          </div>
          <div className="footer-part">
            <span>Choose a Minimum of 6 Interests</span>
            <div
              htmlFor="subjects-Count"
              className="flex justify-center items-center"
            >
              <div>Selected: {selectCount}</div>
              <button
                type="submit"
                className="bs-btn typ-theme-reverse me-2 disabled:cursor-not-allowed disabled:opacity-50"
                // onClick={handleProfileData}
                onClick={submitProfileData}
                disabled={selectCount > 5 ? false : true}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};
export default Profile;
