import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import stoken from "../public/images/stoken.png";
import pocket from "../public/pocket.png";
import usage from "../public/usage.png";
import billing from "../public/billing.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleActiveTab } from "../redux/slices/tokenSlice";
import { useRouter } from "next/router";
import { falseAiLearning } from "../redux/slices/layoutSlice";

const Tokens = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const router = useRouter();

  const userTokenBalance =  useSelector(state => state?.userData?.data?.tokenBalance)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleRedirect = (type) => {
    dispatch(toggleActiveTab(type));
    setIsDropdownOpen(false);
    router.push("/token-manager");
  };

  const handleTokenRedirect =()=>{
    router.push("/token-manager")
      dispatch(falseAiLearning())
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center text-[12px] text-[#425166] font-semibold mr-2">
        <Image src={stoken} width={38} height={38} alt="token-icon" />
        <div className="text-[11px] 2xl:text-[15px] " >Token Available: {userTokenBalance ? userTokenBalance.toLocaleString() : 0 }</div>
      </div>
      <div className="relative">
        <div
          className="flex justify-center items-center text-[12px] text-[#425166] font-semibold mr-2"
          onClick={handleToggleDropdown}
        >
          <Image src={pocket} width={33} height={33} alt="icon" quality={100} />
          <div className="cursor-pointer text-[11px] 2xl:text-[15px]">Token Manager</div>
        </div>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-[40px] right-[20px] bg-white border-1 border-[#ffcc02] p-3 w-[270px] shadow-rounded-lg flex justify-center items-center rounded-lg"
          >
            <OptionButton image={stoken} label="Top up Token" onClick={() => handleRedirect("topup")} />
            <OptionButton image={usage} label="Token Usage" onClick={() => handleRedirect("usage")} />
            <OptionButton image={billing} label="Order History" onClick={() => handleRedirect("order")} />
          </div>
        )}
      </div>
    </div>
  );
};

const OptionButton = ({ image, label, onClick }) => (
  <div className="cursor-pointer bg-[#F6F3FC] p-1 text-[#ffcc02] mr-1 text-[12px] text-center flex flex-col justify-center items-center border-1 border-[#ffcc02] rounded-lg" onClick={onClick}>
    <Image src={image} width={45} height={45} alt="icon" />
    <span>{label}</span>
  </div>
);

export default Tokens;
