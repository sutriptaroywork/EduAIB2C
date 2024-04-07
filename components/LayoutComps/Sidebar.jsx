import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "/styles/sass/images/landing-page/edudotai-2.png";
import dash_btn_icon from "/styles/sass/images/landing-page/btn-dash.svg";
import ai_brain from "/styles/sass/images/landing-page/ai-learning-logo.png";
import studyPlaner from "/styles/sass/images/landing-page/studyPlan.svg";
import brainStation from "/styles/sass/images/landing-page/brainStation.svg";
import marketPlace from "/styles/sass/images/landing-page/marketPlace.svg";
import analytics from "/styles/sass/images/landing-page/analytics.svg";
import setting from "/styles/sass/images/landing-page/settings-icon.png";
import logout from "/styles/sass/images/landing-page/logout-icon.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import {
  toggleSidebar,
  handleActiveTab,
  trueAiLearning,
  falseAiLearning,
} from "../../redux/slices/layoutSlice";
import { summaryData } from "../../redux/slices/summarySlice";
import UpgradePlan from "../../components/UpgradePlan";
import { ClipLoader } from "react-spinners";

const SideBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const currentPath = router?.pathname;

  const sideBarStatus = useSelector((state) => state.layout.sideBarStatus);
  const summData = useSelector(summaryData);
  const aiLearningStatus = useSelector(
    (state) => state.layout.aiLearningStatus
  );
  const isActive = useSelector((state) => state.layout.isActive);
  const ailearningPaths = ["/summary", "/quiz", "/shikshaAi"];

  const [isPopupVisible, setPopupVisible] = useState(false); //This is for the popup window
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (ailearningPaths.includes(router.pathname)) {
      if (aiLearningStatus === false) {
        dispatch(trueAiLearning());
      }

      if (!sideBarStatus) {
        dispatch(toggleSidebar());
      }
      const payload = {
        isActive: "ai-learning",
      };
      dispatch(handleActiveTab(payload));
    } else if (router.pathname == "/advance-search" && sideBarStatus) {
      dispatch(toggleSidebar());
      if (aiLearningStatus === true) {
        dispatch(falseAiLearning());
      }
      const payload = {
        isActive: "",
      };
      dispatch(handleActiveTab(payload));
      // setIsAiOpen(false);
    } else {
      if (!sideBarStatus) {
        dispatch(toggleSidebar());
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  const handleDashboard = () => {
    if (aiLearningStatus) {
      dispatch(falseAiLearning());
      const payload = {
        isActive: "dashboard",
      };
      dispatch(handleActiveTab(payload));
    }
  };

  const toggleAi = () => {
    const payload = {
      isActive: "ai-learning",
    };
    dispatch(handleActiveTab(payload));
    if (!aiLearningStatus) {
      dispatch(trueAiLearning());
    }
    if (!sideBarStatus) {
      dispatch(toggleSidebar());
    }
    router.push("/summary");
  };

  const toggleSidebarFunc = () => {
    if (sideBarStatus) {
      dispatch(falseAiLearning());
    } else {
      if (ailearningPaths.includes(currentPath)) dispatch(trueAiLearning());
    }
    dispatch(toggleSidebar());
  };

  const toggleSetting = () => {
    const payload = {
      isActive: "settings",
    };
    dispatch(handleActiveTab(payload));
    if (aiLearningStatus === true) {
      dispatch(falseAiLearning());
    }
  };

  const showToggleButtons = false;

  const handleSignout = async () => {
    localStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    const response = {
      status: 200,
      message: "Logout successful",
    };
    if (response.status === 200) {
      window.location.href = "/login"; // Corrected line
    }
    return response;
  };

  const openPopup = () => {
    setPopupVisible(true);
  };
  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className={`bs-sidebar h-[100%] ${sideBarStatus ? "" : "collapsed"}`}>
      <div className="sidebar">
        <div className="top-content">
          <Link
            className="sidebar-logo"
            href="/advance-search"
            onClick={() => {
              handleDashboard();
            }}
          >
            <Image
              src={sideBarStatus ? logo : "/edudotai-icon-3.png"}
              width={sideBarStatus ? "" : 150}
              height={sideBarStatus ? "" : 150}
              alt="logo"
              className="img-fluid"
              setting
            />
          </Link>

          {/* <Link
            className=" dash_btn no-underline"
            href="/dashboard"
            onClick={() => {
              handleDashboard();
            }}
          >
            <Image src={dash_btn_icon} alt="logo" className="btn-icon" />

            <span className="title">Dashboard</span>
          </Link> */}

          <ul className="sidebar_links">
            <li className="main-menu">
              <div
                className={`sidebar-link mb-0  ${
                  isActive == "ai-learning" ? "active" : ""
                }`}
                // onClick={toggleAi}
              >
                <Image
                  src={ai_brain}
                  alt="logo"
                  className="img-fluid btn-icon typ-links"
                />

                <span
                  className={`title animate__animated animate__fadeIn animate__delay-2s ${
                    sideBarStatus ? "" : "hide"
                  }`}
                >
                  AI Learning
                </span>
              </div>

              {/* <ul className={`sub-menu  ${aiLearningStatus ? "open" : ""}`}>
                <li>
                  <Link
                    href="/summary"
                    className={`no-underline option my-2 ${
                      currentPath == "/summary" && "active"
                    } `}
                  >
                    Summary
                  </Link>
                  <div
                      className={`no-underline option my-2`}
                    >
                      Summary
                    </div>
                </li>

                {!summData?.assigned_code ? (
                  <li className="!list-none">
                    <div
                      data-tooltip-id="qna-tooltip"
                      data-tooltip-content="Q&A will enable once you select a study topic "
                      className={`no-underline option my-2`}
                    >
                      Q&A
                      <Tooltip
                        id="qna-tooltip"
                        noArrow
                        style={{
                          backgroundColor: "#ffcc02",
                          zIndex: "2,147,483,647",
                          padding: "8px 12px",
                          borderRadius: "10px",
                          fontSize: "8px",
                        }}
                        place="top"
                      />
                    </div>
                  </li>
                ) : (
                  <li>
                    <Link
                      href="/quiz"
                      className={`no-underline option my-2 ${
                        currentPath == "/quiz" && "active"
                      } `}
                    >
                      Q&A
                    </Link>
                  </li>
                )}

                {!summData?.assigned_code ? (
                  <li>
                    <div
                      className={`no-underline option my-2`}
                    >
                      AI Chatbot
                    </div>
                  </li>
                ) : (
                  <li>
                    <li>
                      <div
                        className={`no-underline option my-2`}
                      >
                        AI Chatbot
                      </div>
                    </li>
                    <Link
                      href="/shikshaAi"
                      className={`no-underline option my-2 ${
                        currentPath == "/shikshaAi" && "active"
                      } `}
                    >
                      shiksha AI
                    </Link>
                  </li>
                )}
              </ul> */}
            </li>

            {/* <li className="main-menu">
              <div
                className={`sidebar-link mb-0  ${
                  isActive == "study-planner" ? "active" : ""
                }`}
              >
                <Image
                  src={studyPlaner}
                  alt="logo"
                  className="img-fluid btn-icon typ-links"
                />
                <span className={`title   ${sideBarStatus ? "" : "hide"}`}>
                  Study Planr
                </span>
              </div>
            </li>

            <li className="sidebar-link">
              <Image
                src={brainStation}
                alt="logo"
                className="img-fluid btn-icon typ-links"
              />
              <span className={`title  ${sideBarStatus ? "show" : "hide"}`}>
                BrainStation
              </span>
            </li>

            <li className="sidebar-link">
              <Image
                src={marketPlace}
                alt="logo"
                className="img-fluid btn-icon typ-links"
              />

              <span className={`title  ${sideBarStatus ? "show" : "hide"}`}>
                Marketplace
              </span>
            </li>
            <li className="sidebar-link">
              <Image
                src={analytics}
                alt="logo"
                className="img-fluid btn-icon typ-links"
              />

              <span className={`title  ${sideBarStatus ? "show" : "hide"}`}>
                Analytics
              </span>
            </li> */}
            <li className="main-menu">
              <Link
                href="/setting"
                className="no-underline"
                onClick={toggleSetting}
              >
                <div
                  className={`sidebar-link mb-0  ${
                    currentPath == "/setting" ? "active" : ""
                  }`}
                >
                  <Image
                    src={setting}
                    alt="logo"
                    className="img-fluid btn-icon typ-links"
                  />

                  <span
                    className={`title show ${sideBarStatus ? "show" : "hide"}`}
                  >
                    Settings
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          {/* <div
            className="upgrade_btn"
            id="openPopupButton"
            onClick={() => openPopup()} 
          >
            Upgrade
          </div> */}

          <div
            className="sidebar-link"
            onClick={() => {
              handleSignout();
            }}
          >
            {" "}
            <Image
              src={logout}
              alt="ai_brain"
              className="img-fluid btn-icon typ-links"
            />
            <span className={`title ${sideBarStatus ? "" : "hide"}`}>
              {!isLoading ? (
                "Sign out"
              ) : (
                <ClipLoader color="#ffffff" size={18} speedMultiplier={1} />
              )}
            </span>
          </div>
        </div>

        <div
          className={
            currentPath == "/advance-search" ? "collapsViewArrow" : "collapsViewArrow"
          }
        >
          <div onClick={toggleSidebarFunc} className="toggle-button">
            <Image
              src={`${sideBarStatus ? "/left-arrow.png" : "/right-arrow.png"}`}
              alt=""
              width={28}
              height={28}
            ></Image>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .bs-sidebar .sidebar {
            // position : "relative"

            width: ${sideBarStatus ? "220px" : "100px"};

            transition: width 0.3s;
          }

          .bs-sidebar .collapsViewArrow {
            position: absolute;

            top: 130px;

            right: ${sideBarStatus ? "-10px" : "-10px"};

            transition: all 0.3s;

            display: none;
          }

          .bs-sidebar:hover .collapsViewArrow {
            transition: all 0.3s;

            display: block;
          }
        `}
      </style>

      {isPopupVisible && (
        <div className="">
          <div
            id="popupContainer"
            className="popup-container h-[90vh] z-[1000] fixed top-[30px] left-[50%] transform -translate-x-1/2 overflow-x-hidden "
          >
            <div className="popup">
              <div
                className="close flex justify-end absolute z-10 top-[10px] right-[25px] text-[30px] cursor-pointer"
                id="closePopupButton"
                onClick={() => closePopup()}
              >
                &times;
              </div>
              <UpgradePlan/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;