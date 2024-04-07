import React, { useState } from "react";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";

const TokenYearDropdown = ({ onSelect }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2023);
  // Get the current year
  const currentYear = new Date().getFullYear();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const handleItemClick = (value) => {
    setSelectedMonth(value);
    onSelect(value, selectedYear); // Pass selected month and year to parent component
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
    onSelect(selectedMonth, value); // Pass selected month and year to parent component
  };

  const renderYearSliderItem = () => (
    <div style={{ padding: "10px", textAlign: "center", display: "flex" }}>
      <span
        style={{ cursor: "pointer", marginRight: "10px", color: "#ffcc02" }}
        onClick={() => handleYearChange(selectedYear - 1)}
      >
        &#x003C; {/* Unicode character for left arrow */}
      </span>
      <div className="text-[#ffcc02]">{selectedYear}</div>
      <span
        style={{ cursor: "pointer", marginLeft: "10px", color: "#ffcc02" }}
        onClick={() => {
          if (selectedYear < currentYear) {
            handleYearChange(selectedYear + 1);
          }
        }}
      >
        &#x003E; {/* Unicode character for right arrow */}
      </span>
    </div>
  );

  return (
    <div className="">
      <Dropdown
        title={
          selectedMonth ? `${selectedMonth} ${selectedYear}` : "Select Year"
        }
      >
        <Dropdown.Menu title="Month">
          {renderYearSliderItem()}
          {months.map((month) => (
            <Dropdown.Item key={month} onSelect={() => handleItemClick(month)}>
              {month}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default TokenYearDropdown;
