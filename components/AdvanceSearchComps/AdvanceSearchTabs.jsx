import React, { useState } from "react";

const AdvanceSearchTabs = () => {
  const [activeTab, setActiveTab] = useState("shikshaML");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex justify-center filter-tab">
      {/* Tab Buttons */}
      {/* <div className="bs-tabs">
        <div className="tab-buttons !max-w-none" handleTabClick={handleTabClick}>
          <button
            className={`tab-button ${activeTab === "shikshaML" ? "active" : ""}`}
            onClick={() => handleTabClick("shikshaML")}
          >
            shikshaML
          </button>
          <button
            className={`tab-button ${activeTab === "My School" ? "active" : ""}`}
            onClick={() => handleTabClick("My School")}
          >
            My School
          </button>
          <button
            className={`tab-button ${activeTab === "My Coaching" ? "active" : ""}`}
            onClick={() => handleTabClick("My Coaching")}
          >
            My Coaching
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default AdvanceSearchTabs;
