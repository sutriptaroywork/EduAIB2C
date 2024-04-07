import React, { useState, useEffect } from "react";
import TopUp from "../components/TokenManager/TopUp";
import TokenUsage from "../components/TokenManager/TokenUsage";
import OrderHistory from "../components/TokenManager/OrderHistory";
import { useDispatch, useSelector } from "react-redux";
import { toggleActiveTab } from "../redux/slices/tokenSlice";
import {  tokenPlans, totalToken } from "../redux/slices/coinSlice";

const SettingComponent = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.token.activeTab);

  const handleTabClick = (tab) => {
    dispatch(toggleActiveTab(tab));
  };
  
  useEffect(() => {
    dispatch(tokenPlans());
    dispatch(totalToken());
  }, [dispatch]);

  const tabs = [
    { label: "Top Up Tokens", value: "topup" },
    { label: "Token Usage", value: "usage" },
    { label: "Order History", value: "order" },
  ];

  return (
    <section className="">
      <div className="bs-tabs token">
        <div className="text-[1rem] font-semibold pb-2 ml-2 text-[#ffcc02] font-poppins 2xl:text-[1.5rem]">
          Token Manager
        </div>

        <div className="tab-buttons">
          {tabs.map(({ label, value }) => (
            <button
              key={value}
              className={`tab-button !text-sm !2xl:text-xl p-[10px] ${
                activeTab === value ? "active" : ""
              }`}
              onClick={() => handleTabClick(value)}
            >
              {label}
            </button>
          ))}
        </div>

        {["topup", "usage", "order"].map((tab) => (
          <div key={tab} className={`tab ${activeTab === tab ? "active" : ""}`}>
            {tab === "topup" ? (
              <TopUp />
            ) : tab === "usage" ? (
              <TokenUsage />
            ) : (
              <OrderHistory />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SettingComponent;
