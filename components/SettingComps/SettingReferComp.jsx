// coded by sandeep
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import faceBook from "/styles/sass/images/landing-page/facebook.svg";
import twiter from "/styles/sass/images/landing-page/twitter.svg";
import whatsApp from "/styles/sass/images/landing-page/whatsapp.svg";
import linkedIn from "/styles/sass/images/landing-page/linkedin.svg";
import instagram from "/styles/sass/images/landing-page/instagram.svg";
import { toast } from "react-toastify";
import ClipboardJS from "clipboard";
import { useDispatch, useSelector } from "react-redux";
import { fetchReferalCreditData } from "../../redux/slices/settingSlice";

const SettingReferComp = () => {
  const dispatch = useDispatch();
  const clientCode = useSelector(
    (state) =>
      state?.settingSlice?.referralCreditData?.data?.userCredits?.myReferralCode
  );
  const credits = useSelector(
    (state) => state?.settingSlice?.referralCreditData?.data?.totalCredits
  );


  useEffect(() => {
    dispatch(fetchReferalCreditData());
  }, []);
  const [isPopupVisible, setPopupVisible] = useState(false); //This is for the popup window
  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const generateWhatsAppLink = () => {
    const clientCode = "WGBxlj"; // Replace with your actual referral code

    const message = `I’m inviting you to use ShikshaML. Discover a smarter, more enjoyable way to learn with the help of human-like AI powered assistants. Here’s my code (${clientCode}).\n\n http://${process.env.NEXT_APP_HOST}/signup?refcode=${clientCode}`;

    // Encode the message
    const encodedMessage = encodeURIComponent(message);

    // Create the WhatsApp link without a specific phone number
    return `https://wa.me/?text=${encodedMessage}`;
  };

  const whatsappLink = generateWhatsAppLink();

  const handleCopyClick = () => {
    const clipboard = new ClipboardJS(".copy-button");

    clipboard.on("success", () => {
      toast.success("Copied successfully.");
    });

    setTimeout(() => {
      clipboard.destroy();
    }, 500);
  };

  return (
    <>
      {/* this is the code for the main earn and refer */}
      <div className="bs-earn container-fluid p-0">
        <div className="row">
          <div className="col-lg-12">
            <div id="pentagon">
              <div className="refer-banner">
                <h2 data-testid="refer_title" className="refer-title">
                  shikshaML Referral Program
                </h2>
                <Image
                  data-testId="reffer_img"
                  src={`/reffer.svg`}
                  alt="refer"
                  width={60}
                  height={60}
                  className="img-fluid refer-img"
                />
              </div>
              <Image
                data-Testid="chips_img"
                src={`/chips.svg`}
                alt="chips"
                width={100}
                height={100}
                className="img-fluid chips-img"
              />
            </div>
            <Image
              data-Testid="background_img"
              src={`/triangle.svg`}
              alt="triangle"
              width={100}
              height={100}
              className="img-fluid"
            />
          </div>

          <div
            className="row ms-0"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <div className="col-lg-7">
              <div className="earn-hero">
                <h2 data-testid="earn_title" className="earn-title">
                  Let&apos;s Learn and Earn together!
                </h2>
                <div className="earn-sub-title">
                  <ul className="earn-list">
                    <li className="earn-item">
                      When you tell your friends about{" "}
                      <span className="theme">shikshaML,</span> you&apos;ll get
                      25 credits for each friend who joins.
                    </li>
                    <li className="earn-item">
                      And here&apos;s the exciting part: if your friends
                      upgrades to a paid subscription, you&apos;ll not only get
                      credits but also receive 10% of their first month&apos;s
                      subscription fee as a referral reward.
                    </li>
                  </ul>
                </div>

                {/* here is the code for the popup window */}
                <button id="openPopupButton" onClick={() => openPopup()}>
                  My Reward
                </button>
                {isPopupVisible && (
                  <div id="popupContainer" className="popup-container">
                    <div className="popup">
                      <span
                        className="close"
                        id="closePopupButton"
                        onClick={() => closePopup()}
                      >
                        &times;
                      </span>
                      <h2>Total Referral credit earned:</h2>
                      <h2 className="credits">{credits} Credits</h2>
                      <Image
                        data-testId="coin_img"
                        src={`/coin.png`}
                        alt="coin"
                        width={70}
                        height={70}
                        className="coin"
                      />
                    </div>
                  </div>
                )}
                {isPopupVisible && (
                  <div id="blurBackground" className="blur-background"></div>
                )}
              </div>
            </div>
            <div className="col-lg-5">
              <div className="gift-img">
                <Image
                  data-testId="gift_img"
                  src={`/gift.svg`}
                  alt="triangle"
                  width={100}
                  height={100}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="line"></div>
          </div>

          {/* this is for the client ID or link */}
          <div className="link-section">
            <div className="link-content">
              <h2 className="link-title">Get an affiliate link</h2>
              <p className="link-sub-title">
                Send a personalized code to your friends. If they open an
                account, you&apos;ll automatically earn referral benefits.
              </p>
              <div className="client-id d-flex">
                <div className="client-field">
                  <h4 className="client-title">Your client code</h4>
                  <div className="field-box">
                    <input
                      className="p-auto !text-[#000]"
                      type="text"
                      id="field"
                      value={clientCode}
                      readOnly={true}
                      style={{ textAlign: "center", color: "#000 !important" }}
                    />
                    <button
                      data-clipboard-text={clientCode}
                      onClick={handleCopyClick}
                      className="client-button copy-button"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="client-field">
                  <h4 className="client-title social-title">Share on</h4>
                  <div className="media-icons">
                    <a
                      href="https://www.facebook.com/profile.php?id=61550958963463"
                      target="_blank"
                      rel="noreferrer"
                      noreferrer
                    >
                      <div className="img-width">
                        <Image
                          src={faceBook}
                          alt="facebook"
                          className="img-fluid"
                        />
                      </div>
                    </a>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      noreferrer
                    >
                      <div className="img-width">
                        <Image
                          src={whatsApp}
                          alt="whatsApp"
                          className="img-fluid"
                        />
                      </div>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/shikshaml/"
                      target="_blank"
                      rel="noreferrer"
                      noreferrer
                    >
                      <div className="img-width">
                        <Image
                          src={linkedIn}
                          alt="linkedIn"
                          className="img-fluid"
                        />
                      </div>
                    </a>
                    <a
                      href="https://www.instagram.com/shikshaml_official/"
                      target="_blank"
                      rel="noreferrer"
                      noreferrer
                    >
                      <div className="img-width">
                        <Image
                          src={instagram}
                          alt="instagram"
                          className="img-fluid"
                        />
                      </div>
                    </a>
                    <a
                      href="https://twitter.com/Shiksha_ML"
                      target="_blank"
                      rel="noreferrer"
                      noreferrer
                    >
                      <div className="img-width">
                        <Image
                          src={twiter}
                          alt="twiter"
                          className="img-fluid"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingReferComp;
