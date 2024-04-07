// coded by yaseen 
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
// import logo from "../../styles/sass/images/landing-page/logo.svg";
import logo from "../../styles/sass/images/landing-page/edudotai-2.png";
import search_icon from "../../styles/sass/images/landing-page/magnifying-glass.png";

const Header = ( { comingFromSubscribe }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);


  // navbar toggle in responsive
  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  useEffect(() => {
    // Update the viewport width when the component mounts and on window resize
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    // Initialize the viewport width
    setViewportWidth(window.innerWidth);

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className="bs-header">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid bootstrap-container">
            <Link className="navbar-brand" href="/">
              <Image src={logo} alt="logo" />
            </Link>
            {
                comingFromSubscribe ? <>
                  <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleNavbar}
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
              >
              <span className="navbar-toggler-icon"></span>
            </button>
                </>
                  : ""
                }
            
            <div
              className={`collapse navbar-collapse ${
                navbarOpen ? "show" : ""
              } visible`}
              id="navbarSupportedContent"
            >
              {
                comingFromSubscribe ?
                <>
               
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                  <ScrollLink
                    to="about"
                    spy={true}
                    smooth={false}
                    offset={viewportWidth <= 768 ? -200 : -70}
                    duration={0}
                    className="nav-link"
                    onClick={toggleNavbar}
                  >
                    About us
                  </ScrollLink>
                </li>
                <li className="nav-item">
                  <ScrollLink
                    to="feature"
                    spy={true}
                    smooth={false}
                    offset={viewportWidth <= 768 ? -200 : -70}
                    duration={0}
                    className="nav-link"
                    onClick={toggleNavbar}
                  >
                    Features
                  </ScrollLink>
                </li>
                <li className="nav-item">
                  <ScrollLink
                    to="contact-us"
                    spy={true}
                    smooth={false}
                    offset={viewportWidth <= 768 ? 200 : -70}
                    duration={0}
                    className="nav-link"
                    onClick={toggleNavbar}
                  >
                    Contact us
                  </ScrollLink>

                    
                </li> */}
              </ul>
              <div className="mob-align-btn">
                <Link href="/login" className="bs-btn btn typ-theme">
                  Login
                </Link>
              </div>
                </> : ""
              }
              
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;