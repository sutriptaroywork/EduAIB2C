import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRef } from "react";
import rupee from "../../styles/sass/images/landing-page/rupee.svg";
import purplePpolygon from "../../styles/sass/images/landing-page/purple-polygon.png";
import Link from "next/link";
import { useRouter } from 'next/router';
import orangPpolygon from "../../styles/sass/images/landing-page/orange-polygon.png";

const dataArray = {
  typePLan: "monthly",
  image: orangPpolygon,
  title: "Basic Plan",
  desc: "Basic features at no cost to you",
  price: "30 days free trial",
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
    "10 Credits",
  ],
};

const SettingSubscriptionComp = () => {
  const router = useRouter();
  return (
    <>
      {/* code for  Active Card */}
      <div className="container-fluid ps-0 mt-10">
        <div className="row">
          <div className="col-lg-5">
            {" "}
            <div
              style={{ maxWidth: "320px" }}
              className={`bs-card typ-pricing`}
            >
              <div className="top-content">
                <span className="title">{dataArray.title}</span>
                <span className="desc">{dataArray.desc}</span>
                <span className="price">
                  <span className="price">
                    {dataArray.prifix ? (
                      <span className="">
                        <Image src={rupee} height={25} width={25} alt={rupee} />
                      </span>
                    ) : (
                      ""
                    )}
                    {dataArray.price}
                    <span className="txt-price-for">{dataArray.suffix}</span>
                  </span>
                </span>
                <div className="polygon-vector">
                  <Image
                    src={dataArray.image}
                    alt="purple_card_polygon"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="bottom-content">
                <div className="text-part">
                  <span className="title">{dataArray.secondTitle}</span>

                  {dataArray.points.map((point, pointIndex) => (
                    <div className="txt-circle" key={pointIndex}>
                      <div className="circle">&#10003;</div>
                      <span className="text">{point}</span>
                    </div>
                  ))}
                </div>
                <button className="btn-card btn" onClick={() => router.push("/coming-soon")}>
                  Active
                </button>
              </div>
            </div>
          </div>
          {/* code for small card */}
          <div className="col-lg-5 d-flex align-items-center">
            <div className="card-detail bs-subs">
              <div className="card-status">Active</div>
              <div className="card-plan">
                <span className="card-detail">Plan</span> : Silver
              </div>
              <div className="card-start-date">
                <span className="card-detail">Start Date </span>: 27 September
                2023
              </div>
              <div className="card-end-date">
                <span className="card-detail">End Date </span>: 25 October 2023
              </div>
              <div className="card-duration">
                <span className="card-detail">Duration </span>: 30 Days
              </div>
              <div className="card-payment">
                <span className="card-detail">Payment Method </span>: NA
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingSubscriptionComp;
