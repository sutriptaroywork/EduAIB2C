import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import purplePpolygon from "../../styles/sass/images/landing-page/purple-polygon.png";
import orangPpolygon from "../../styles/sass/images/landing-page/orange-polygon.png";
import check from "../../styles/sass/images/landing-page/check.png";
import credit from "../../styles/sass/images/landing-page/credit.png";

const TokenPlan = ({ onSlideDataClick }) => {

  const tokenData = useSelector(state => state?.coin?.tokenPlans);

  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div
      className="back border-1 border-[#c2c2c2]  pb-2 rounded-xl"
      style={{
        background: "#ffcc02" /* fallback for old browsers */,
        background:
          "linear-gradient(to bottom, #ffcc02 1%, #E0D3FA 25%, #FFFFFF 100%)",
      }}
    >
      <div className="py-2">
        <h4 className="text-center text-[white] mt-2 mb-2 p-1">
          {" "}
          Suggested Plans
        </h4>
      </div>

      <div className="px-4 ml-1 mr-1">
        <Slider {...settings}>
          {tokenData?.map((slideData, key) => (
            <div key={key} className=" h-auto ">
              <div className=" bg-[white] border-1 border-purple-600 w-[95%] rounded-lg flex flex-col m-auto items-center h-[320px] 2xl:h-[350px]">
                <div
                  className={`w-[100%] h-[35%] flex flex-row `}
                  style={{
                    borderBottom:
                      key % 2 === 0 ? "1px solid red" : "1px solid green",
                  }}
                >
                  <div className="w-[75%] flex flex-col justify-center ml-3">
                    <p className="text-[13px] 2xl:text-[17px] font-semibold text-[#808080]">
                      {" "}
                      Top Up Amount
                    </p>
                    <p className="text-[17px] 2xl:text-[20px] font-bold ml-2">
                      <span className="font-sans">₹</span> {slideData.price}
                    </p>
                  </div>
                  <div className="w-[21%]">
                    <Image  src={key % 2 === 0 ? orangPpolygon : purplePpolygon} className="w-[60px]" />
                  </div>
                </div>

                <div className="w-[100%] h-[80%] px-2 mt-1 2xl:mt-4">
                  <p className="text-[13px] 2xl:text-[17px] font-semibold text-[#808080]">
                    What{`'`}s Included
                  </p>
                  <div className="flex flex-row mt-2">
                    <div>
                      <Image src={check} className="h-[15px] w-[14px] mt-1" />
                    </div>
                    <div className="flex flex-col ml-2">
                      <p className="text-[13px] 2xl:text-[17px] font-semibold">
                      {(slideData.price * 3000).toLocaleString()} shiksha Tokens
                      </p>
                    </div>
                  </div>
                  <div className="items-center flex justify-center">
                    <Image src={credit} className="h-[60px] w-[60px]" />
                  </div>
                  <div className="items-center flex justify-center mt-2">
                    <button
                      className="bg-[#ffcc02] rounded-2xl w-[80px] 2xl:w-[100px] py-1 2xl:py-3  text-white text-[14px] 2xl:text-[17px]"
                      onClick={() => onSlideDataClick(slideData)}
                    >
                      Top Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Add more slides as needed */}
        </Slider>
      </div>
    </div>
  );
};

export default TokenPlan;
