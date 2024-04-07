import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import stoken from "../../public/images/stoken.png";
import Image from "next/image";
import TokenPlan from "./TokenPlan";
import tokenGif from "../../public/images/tokengif.gif";
import cross from "../../public/images/cross.png";
import { ClipLoader } from "react-spinners";
import check from "../../styles/sass/images/landing-page/check.png";
import credit from "../../styles/sass/images/landing-page/credit.png";
import { checkTokenCoupan } from "../../redux/slices/coinSlice";
import { toast } from "react-toastify";

const TopUp = () => {
  const [rechargeAmount, setRechargeAmount] = useState(0);
  const [coupanCode, setCoupanCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const publisherCode = useSelector(
    (state) => state?.profileData?.publisher_code
  );
  const [isLoading, setIsLoading] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [selectedSlideData, setSelectedSlideData] = useState(null);
  const tokenData = useSelector(state => state?.coin)

  const  [activatePayment,setActivatepayment] = useState(false)
  const [redirectLink,setRedirectLink] =useState("")



  const handleSlideDataClick = (slideData) => {
    if (selectedSlideData !== null) {
      clearTokenPlan();
      setSelectedSlideData(slideData);
      setRechargeAmount(slideData?.price);

      return;
    }
    setSelectedSlideData(slideData);
    setRechargeAmount(slideData?.price);
  };

  const [isValidCoupan, setIsValidCoupan] = useState({
    value: "",
    status: false,
    coupanData: {},
  });
  const [coupanAmount, setCoupanAmount] = useState(0);

  useEffect(() => {
    const localToken = localStorage.getItem("accessToken");

    setToken(localToken);
  }, []);

  const handleInputChange = (e) => {
    setCheckout(false);
    const inputValue = e.target.value;
    
    if (/^\d*\.?\d*$/.test(inputValue)) { // Check if input is a valid positive number
      setRechargeAmount(inputValue); // Update state with the input value
      setErrorMessage(""); // Clear error message if input is valid
    } else {
      setErrorMessage("Please enter a valid amount."); // Set error message for invalid input
    }
  };

  const handleInputCoupanCode = (e) => {
    setCoupanCode(e.target.value);
  };

  const clearInput = () => {
    setCheckout(false);
    setRechargeAmount(0);
  };

  const clearCoupanCode = () => {
    setCheckout(false);
    setCoupanCode("");
    setIsValidCoupan({
      value: "",
      status: false,
    });
    setCoupanAmount(0);
  };

  const handleApplyCoupon = async () => {
    if (rechargeAmount <= 0) {
      setErrorMessage("Please enter a valid Amount."); // Set error message for invalid input
      return;
    }
    setIsLoading(true);
    const data = {
      code: coupanCode,
      publisherCode: publisherCode,
    };

    dispatch(checkTokenCoupan(data)).then((res) => {

      if (res?.error) {
        toast.error(res?.payload?.message);
        setIsValidCoupan({
          value: coupanCode,
          status: false,
        });
        setCoupanAmount(0);
      } else {
        setCheckout(true);
        setIsValidCoupan({
          value: coupanCode,
          status: true,
          // coupanData: res.data,
        });
        if (rechargeAmount >= res?.payload?.data?.data?.minAmount) {
          const percentageDiscount = rechargeAmount * (res?.payload?.data?.data?.discount / 100);
          // Calculate the maximum discount allowed
          const maxDiscount = Math.min(rechargeAmount, 500);
          const coupanAmount = Math.min(percentageDiscount, maxDiscount);
          setCoupanAmount(coupanAmount); // Set the coupon amount
          toast.success(res.message);
        } else {
          toast.warn(`Minimum amount should be ${res?.payload?.data?.data?.minAmount}`);
          setCoupanAmount(0);
        }
      }

    }).catch((error) =>{

    })

  
  };

  const handleProceed = () => {
    if (coupanCode !== "") {
      handleApplyCoupon();
    }
    setCheckout(true);
  };

  const clearTokenPlan = () => {
    setSelectedSlideData(null);
    setRechargeAmount(0);
    setCoupanCode("");
    setIsValidCoupan({
      value: "",
      status: false,
      coupanData: {},
    });
    setCheckout(false);
  };

  return (
    <div className="flex  text-black ">
      <div className="h-full w-[40%] items-center justify-center">
        {selectedSlideData == null && (
          <div>
            <p className="">Enter Amount Below :</p>
            <div className="bg-purple-200 w-full flex flex-row rounded-md my-2 items-center relative justify-center">
              <p className="text-black items-center flex justify-center ml-2 font-bold text-[12px] 2xl:text-[20px] font-sans absolute left-0">
                ₹
              </p>
              <input
                type="text"
                className="!appearance-none placeholder:text-black placeholder:text-[14px] placeholder:font-light w-full text-[14px] 2xl:text-[20px]  px-[20px] py-2 rounded-lg bg-purple-200 text-black font-semibold border border-purple-600 focus:outline-none pr-8"
                value={rechargeAmount} 
                onChange={handleInputChange}
                placeholder="Enter Amount here"
              />
              <button
                className="text-black absolute right-2"
                onClick={clearInput}
              >
                X
              </button>
            </div>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}{" "}
            {/* Display error message if it exists */}
            <div className="flex flex-row justify-between item-center border-b-2 border-gray-300  py-2 2xl:py-3">
              <div className="text-[15px]">Tokens Earned : </div>
              <div className="flex flex-row items-center justify-center">
                <Image src={stoken} height={35} width={35} alt="icon" onClick={()=>setActivatepayment(!activatePayment)} />
                <div className="font-bold text-[14px] 2xl:text-[20px]">
                  {(rechargeAmount * 3000).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedSlideData !== null && (
          <div
            className="relative  flex flex-col  px-3 rounded-lg w-[300px]"
            style={{ boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div
              className="h-[27px] w-[27px] bg-[#FF6200] rounded-full  flex items-center justify-center absolute  right-[20px] top-[10px] hover:cursor-pointer "
              onClick={clearTokenPlan}
            >
              <Image src={cross} height={15} width={15} alt="icon" />
            </div>

            <div className="border-b border-slate-400 mt-6">
              <p className="tex text-[20px] font-semibold mb-0 uppercase">
                {selectedSlideData?.planName}
              </p>
              <p className="text-[16px] mt-0">A perfect plan to explore.</p>
              <p className="mt-1 text-[24px]">
                {" "}
                <span className="font-sans">₹</span>{selectedSlideData?.price?.toLocaleString()}{" "}
              </p>
            </div>
            <div className="w-auto my-3">
              <p className="font-semibold">What{" '"}s included</p>
              <div className="flex flex-row mt-1 ">
                <Image
                  src={check}
                  className="h-[15px] w-[15px] 2xl:h-[20px] 2xl:w-[20px]"
                  alt="icon"
                />
                <p className="ml-2 font-semibold">
                  {(selectedSlideData?.price * 3000).toLocaleString()} Tokens{" "}
                </p>
              </div>

              <div className="flex justify-center items-center">
                <Image
                  src={credit}
                  className="h-[80px] w-[80px] 2xl:h-[100px] 2xl:w-[100px]"
                  alt="icon"
                />
              </div>
            </div>
          </div>
        )}
        {activatePayment &&<>
        <p className="mt-3 mb-1 "> Payment redirect</p>
        <div className="flex flex-row justify-between items-centers">
          <div className="bg-purple-200 w-[75%] flex flex-row rounded-md items-center relative">
            <input
              type="text"
              className=" placeholder:text-black placeholder:text-[14px] w-[90%] outline-none border-none  placeholder:font-light px-2 h-[45px] rounded-lg bg-purple-200 text-black font-bold focus:outline-none pr-8"
              value={redirectLink}
              onChange={(e)=>setRedirectLink(e.target.value)}
              placeholder="Enter redirect payment url here"
            />
            <button
              className={`text-black absolute right-2`}
              onClick={()=>setRedirectLink("")}
            >
              X
            </button>
          </div>
          {/* apply button */}
          <button
            className="bg-[#ffcc02] w-[23%] h-[45px] border-1 border-[#ffcc02] text-white px-3 rounded-md"
            onClick={()=>{window.location.href=redirectLink}}
            disabled={redirectLink == "" ? true : false}
          >
            {tokenData?.isLoading ? <ClipLoader size={20} color="#fff" /> : "Redirect"}
          </button>
        </div>
        </>}
        <p className="mt-3 mb-1 "> Have a Coupon?</p>

        <div className="flex flex-row justify-between items-centers">
          <div className="bg-purple-200 w-[75%] flex flex-row rounded-md items-center relative">
            <input
              type="text"
              className=" placeholder:text-black placeholder:text-[14px] w-[90%] outline-none border-none  placeholder:font-light px-2 h-[45px] rounded-lg bg-purple-200 text-black font-bold focus:outline-none pr-8"
              value={coupanCode}
              onChange={handleInputCoupanCode}
              placeholder="Enter Coupon Code here"
            />
            <button
              className={`text-black absolute right-2`}
              onClick={clearCoupanCode}
            >
              X
            </button>
          </div>
          {/* apply button */}
          <button
            className="bg-[#ffcc02] w-[20%] h-[45px] border-1 border-[#ffcc02] text-white px-3 rounded-md"
            onClick={handleApplyCoupon}
            disabled={coupanCode == "" ? true : false}
          >
            {tokenData?.isLoading ? <ClipLoader size={20} color="#fff" /> : "Apply"}
          </button>
        </div>
        <p className="text-red-400">
          {isValidCoupan.value == "" || isValidCoupan.status == true
            ? ""
            : "You have entered an invalid Coupon code"}
        </p>

        {/* proceed button */}
        {checkout == false && (
          <div
            className={`   mt-[30px] 2xl:mt-[50px] flex justify-center items-center`}
          >
            <button
              className={`${rechargeAmount > 0 ? "" : "disabled:cursor-not-allowed"
                }  bg-[#FF6200] w-[130px] 2xl:w-[150px] h-[45px] text-white text-[16px] rounded-lg`}
              onClick={handleProceed}
              disabled={
                rechargeAmount > 0 || selectedSlideData !== null ? false : true
              }
            >
              Proceed
            </button>
          </div>
        )}

        {/* checkout box */}
        {checkout && rechargeAmount > 0 && (
          <div>
            <div className="mt-3 2xl:mt-5 ">
              <p className="font-medium text-[14px] 2xl:text-[18px] mb-3 2xl:mb-4">
                Top Up Summary
              </p>
              <div className="flex flex-row justify-between mb-1 mt-2">
                <p>Recharge Amount </p>
                <p className="text-[16px] "><span className="font-sans">₹</span> {rechargeAmount}</p>
              </div>
              <div className="flex flex-row justify-between mb-2 mt-1">
                <p>Tokens Earned </p>
                <div className="flex flex-row items-center">
                  <Image src={stoken} height={30} width={30} alt="icon"/>
                  <p className="text-[16px]">
                   {rechargeAmount * 3000}
                  </p>
                </div>
              </div>
            { coupanAmount > 0 && <div className="flex flex-row justify-between mb-2 mt-2 ">
                <p>Coupon Code Discount</p>
                <p className="text-[16px] text-red-600">
                  {isValidCoupan.status
                    ? `- ₹ ${coupanAmount.toFixed(2)}`
                    : "- ₹ 0"}{" "}
                </p>
              </div>}
              <div className="flex flex-row justify-between items-center mb-2 mt-3 pt-2  border-t-2 border-gray-400">
                <p className="font-medium text-md">Payable Amount</p>
                <p className="text-[16px] font-bold">
                  {" "}
                  <span className="font-sans">₹</span>{" "}
                  {isValidCoupan.status == true
                    ? rechargeAmount - coupanAmount
                    : rechargeAmount}
                </p>
              </div>
            </div>

            <div className="mt-[30px] 2xl:mt-[50px] flex justify-center items-center">
              <button
                className="bg-[#FF6200] w-[130px] 2xl:w-[150px] h-[40px] text-white text-[16px] rounded-lg"
              // onClick={handlePayment}
              >
                Check Out
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="h-full mt-4 xl:mt-0 w-[60%] pl-[100px]">
        <div className="border-1 border-gray-300 rounded-2xl">
          <TokenPlan onSlideDataClick={handleSlideDataClick} />
        </div>
        <div className="flex justify-center items-center">
          <Image src={tokenGif} height={900} width={300} alt="icon" />
        </div>
      </div>
    </div>
  );
};

export default TopUp;
