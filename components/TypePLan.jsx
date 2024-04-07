import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import purplePpolygon from "../styles/sass/images/landing-page/purple-polygon.png";
import orangPpolygon from "../styles/sass/images/landing-page/orange-polygon.png";
import greenPpolygen from "../styles/sass/images/landing-page/green.png";
import rupee from "../styles/sass/images/landing-page/rupee.svg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Pagination, Navigation } from "swiper/modules";

const TypePlan = () => {
  // two navigation button refrence for clicking to go previous or next
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  //Add a state that will force a re-render
  const [_, setInit] = useState();

  // content array
  const dataArray = [
    {
      typePLan: "monthly",
      image: greenPpolygen,
      title: "Freemium Plan",
      desc: "All the basics to try out.",
      price: "Free",
      prifix: "",
      suffix: "",
      secondTitle: "What's included",
      points: [
        "Unlimited assessments",
        "Unlimited summarized content",
        "Human like tutor",
        "Study planr",
        "Brainstation",
        "Market place",
        "50,000 shiksha Tokens",
      ],
    },
    {
      typePLan: "monthly",
      image: orangPpolygon,
      title: "Silver Plan",
      desc: "A perfect plan to explore.",
      price: "99",
      prifix: rupee,
      suffix: "/mo",
      secondTitle: "What's included",
      points: [
        "Unlimited assessments",
        "Unlimited summarized content",
        "Human like tutor",
        "Study planr",
        "Brainstation",
        "Market place",
        "1,00,000 shiksha Tokens",
      ],
    },
    {
      typePLan: "monthly",
      image: purplePpolygon,
      title: "Gold Plan",
      desc: "Premium plan with enhanced features",
      price: "199",
      prifix: rupee,
      suffix: "/mo",
      secondTitle: "What's included",
      points: [
        "Unlimited assessments",
        "Unlimited summarized content",
        "Human like tutor",
        "Study planr",
        "Brainstation",
        "Market place",
        "2,25,000 shiksha Tokens",
      ],
    },
    {
      typePLan: "monthly",
      image: orangPpolygon,
      title: "Platinum Plan",
      desc: "Ultimate plan for comprehensive benefits",
      price: "499",
      prifix: rupee,
      suffix: "/mo",
      secondTitle: "What's included",
      points: [
        "Unlimited assessments",
        "Unlimited summarized content",
        "Human like tutor",
        "Study planr",
        "Brainstation",
        "Market place",
        "6,00,000 shiksha Tokens",
      ],
    },
    {
      typePLan: "quarterly",
      image: orangPpolygon,
      title: "Silver Plan",
      desc: "Standard plan with essential features",
      price: "269",
      prifix: rupee,
      suffix: "/qtr",
      secondTitle: "What's included",
      points: [
        "Unlimited assessments",
        "Unlimited summarized content",
        "Human like tutor",
        "Study planr",
        "Brainstation",
        "Market place",
        "3,00,000 shiksha Tokens",
      ],
    },
    {
      typePLan: "quarterly",
      image: purplePpolygon,
      title: "Gold Plan",
      desc: "Premium plan with enhanced features",
      price: "529",
      prifix: rupee,
      suffix: "/qtr",
      secondTitle: "What's included",
      points: [
        "Unlimited assessments",
        "Unlimited summarized content",
        "Human like tutor",
        "Study planr",
        "Brainstation",
        "Market place",
        "6,75,000 shiksha Tokens",
      ],
    },
    {
      typePLan: "quarterly",
      image: orangPpolygon,
      title: "Platinum Plan",
      desc: "Ultimate plan for comprehensive benefits",
      price: "1,249",
      prifix: rupee,
      suffix: "/qtr",
      secondTitle: "What's included",
      points: [
        "Unlimited assessments",
        "Unlimited summarized content",
        "Human like tutor",
        "Study planr",
        "Brainstation",
        "Market place",
        "18,00,000 shiksha Tokens",
      ],
    },
    {
      typePLan: "yearly",
      image: purplePpolygon,
      title: "Silver Plan",
      desc: "Standard plan with essential features",
      price: "999",
      prifix: rupee,
      suffix: "/yr",
      secondTitle: "What's included",
      points: [
        "Unlimited assessments",
        "Unlimited summarized content",
        "Human like tutor",
        "Study planr",
        "Brainstation",
        "Market place",
        "1,20,000 shiksha Tokens",
      ],
    },
    {
      typePLan: "yearly",
      image: orangPpolygon,
      title: "Gold Plan",
      desc: "Premium plan with enhanced features",
      price: "1,999",
      prifix: rupee,
      suffix: "/yr",
      secondTitle: "What's included",
      points: [
        "Unlimited assessments",
        "Unlimited summarized content",
        "Human like tutor",
        "Study planr",
        "Brainstation",
        "Market place",
        "2,70,000 shiksha Tokens",
      ],
    },
    {
      typePLan: "yearly",
      image: purplePpolygon,
      title: "Platinum Plan",
      desc: "Ultimate plan for comprehensive benefits",
      price: "4,799",
      prifix: rupee,
      suffix: "/yr",
      secondTitle: "What's included",
      points: [
        "Unlimited assessments",
        "Unlimited summarized content",
        "Human like tutor",
        "Study planr",
        "Brainstation",
        "Market place",
        "72,00,000 shiksha Tokens",
      ],
    },
    {
      typePLan: "Token-Plans",
      image: orangPpolygon,
      title: "Top Up Amount",
      // desc: "Custom solution tailored to your needs",
      price: "10",
      prifix: rupee,
      suffix: "/yr",
      secondTitle: "What's included",
      points: ["10,000 shiksha Tokens"],
    },
    {
      typePLan: "Token-Plans",
      image: greenPpolygen,
      title: "Top Up Amount",
      // desc: "Premium plan with enhanced features",
      price: "19",
      prifix: rupee,
      suffix: "/yr",
      secondTitle: "What's included",
      points: ["20,000 shiksha Tokens"],
    },
    {
      typePLan: "Token-Plans",
      image: orangPpolygon,
      title: "Top Up Amount",
      // desc: "Custom solution tailored to your needs",
      price: "29",
      prifix: rupee,
      suffix: "/yr",
      secondTitle: "What's included",
      points: ["33,000 shiksha Tokens"],
    },
    {
      typePLan: "Token-Plans",
      image: greenPpolygen,
      title: "Top Up Amount",
      // desc: "Premium plan with enhanced features",
      price: "49",
      prifix: rupee,
      suffix: "/yr",
      secondTitle: "What's included",
      points: ["58,000 shiksha Tokens"],
    },
    {
      typePLan: "Token-Plans",
      image: orangPpolygon,
      title: "Top Up Amount",
      // desc: "Custom solution tailored to your needs",
      price: "99",
      prifix: rupee,
      suffix: "/yr",
      secondTitle: "What's included",
      points: ["1,20,000 shiksha Tokens"],
    },
  ];

  // const [filteredArray, setFilteredArray] = useState([]);

  const [isSub, setIsSub] = useState(true);
  const [activeTab, setActiveTab] = useState("monthly"); //monthly , yearly ,quaterly

  useEffect(() => {
    if (activeTab == "Subscription-plans") {
      setActiveTab("monthly");
      if (setActiveTab == "monthly") {
        filterArray(activeTab);
      }
    }
    // Initialize the filtered array with the 'monthly' type when the component mounts
  }, []);

  // const [filteredArray, setFilteredArray] = useState(
  //   dataArray.filter((item) => item.typePLan === "monthly")
  // );
  const filteredArray = isSub
    ? dataArray.filter((item) => item.typePLan === activeTab)
    : dataArray.filter((item) => item.typePLan === "Token-Plans");

  const filterArray = (type) => {
    const filtered = dataArray.filter((item) => item.typePLan === type);
    // setFilteredArray(filtered);
  };
  const tabClickHandler = (type) => {
    filterArray(type);
    setActiveTab(type);
  };

  return (
    <section
      className="lyt-section typ-choose-plan overflow-hidden"
      id="popupContainer"
    >
      <div className="container bg-light-purple">
        <h2 className="bs-heading typ-border">Choose your plan</h2>
        <p className="bs-para text-center">
          Start studying for free, then upgrade for additional features and
          limits
        </p>

        {/* 2nd toggle-tabs  */}
        {isSub == true && (
          <div className="flex justify-center filter-tab">
            <div className="bs-tabs">
              <div className="tab-buttons">
                <button
                  className={`tab-button ${
                    activeTab == "monthly" ? "active" : ""
                  }`}
                  onClick={() => tabClickHandler("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`tab-button ${
                    activeTab == "quarterly" ? "active" : ""
                  }`}
                  onClick={() => tabClickHandler("quarterly")}
                >
                  Quarterly
                </button>
                <button
                  className={`tab-button ${
                    activeTab == "yearly" ? "active" : ""
                  }`}
                  onClick={() => tabClickHandler("yearly")}
                >
                  Yearly
                </button>
              </div>
            </div>
          </div>
        )}

        {/* <div className="tabs">
          <button
            className={activeTab === "monthly" ? "active" : ""}
            onClick={() => tabClickHandler("monthly")}
          >
            Monthly
          </button>
          <button
            className={activeTab === "quarterly" ? "active" : ""}
            onClick={() => tabClickHandler("quarterly")}
          >
            Quarterly
          </button>
          <button
            className={activeTab === "yearly" ? "active" : ""}
            onClick={() => tabClickHandler("yearly")}
          >
            Yearly
          </button>
        </div> */}

        <button className="swiper-button-prev" ref={prevRef}></button>
        <button className="swiper-button-next" ref={nextRef}></button>

        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            360: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.4,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={() => setInit(true)}
          className="mySwiper bs-swiper typ-plan-swiper"
        >
          {filteredArray.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className={`bs-card typ-pricing  ${
                  item.title === "Introductory Plan" ? "active" : ""
                }`}
              >
                <div className="top-content">
                  <span className="title">{item.title}</span>
                  <span className="desc">{item.desc}</span>
                  <span className="price">
                    {item.prifix ? (
                      <span className="">
                        <Image src={item.prifix} alt={rupee} />
                      </span>
                    ) : (
                      ""
                    )}

                    {item.price}
                    <span className="txt-price-for">{item.suffix}</span>
                  </span>

                  <div className="polygon-vector">
                    <Image
                      src={item.image}
                      alt="purple_card_polygon"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="bottom-content">
                  <div className="text-part">
                    <span className="title">{item.secondTitle}</span>

                    {item.points.map((point, pointIndex) => (
                      <div className="txt-circle" key={pointIndex}>
                        <div className="circle">&#10003;</div>
                        <span className="text">{point}</span>
                      </div>
                    ))}
                  </div>
                  <Link className="btn-card btn" href="/login">
                    Subscribe
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TypePlan;
