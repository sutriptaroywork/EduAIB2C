import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "./Utils/Skeleton";

const WeekDatePicker = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [showTooltip, setShowTooltip] = useState(false);

  const getNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };

  const getPreviousWeek = () => {
    const previousWeek = new Date(currentWeek);
    previousWeek.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(previousWeek);
  };

  const getWeekDates = () => {
    const weekStart = new Date(currentWeek);
    weekStart.setDate(currentWeek.getDate() - currentWeek.getDay() + 1);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      weekDates.push(date);
    }

    return weekDates;
  };
  const currentDate = new Date();
  const days = ["M", "T", "W", "Th", "F", "S", "Su"];

  const weekDates = getWeekDates();
  const currentMonth = weekDates.some(
    (date) => date.getMonth() === currentDate.getMonth()
  )
    ? currentDate.toLocaleDateString("default", { month: "long" })
    : weekDates[0].toLocaleDateString("default", { month: "long" });
  const currentYear = weekDates[0].getFullYear();

  // Get the current date

  return (
    <div
      className="mod-date-picker week-date-picker position-relative"
      onMouseEnter={() => setShowTooltip(true)} // Show tooltip on mouse enter
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="header">
        <button onClick={getPreviousWeek}>&lt; </button>
        <h2 className="month-year">
          {currentMonth} {currentYear}
        </h2>
        <button onClick={getNextWeek}> &gt;</button>
      </div>
      {<Skeleton  height={200}/> && (
        <table className="week-table">
          <thead>
            <tr>
              {weekDates.map((date, index) => (
                <th
                  className={`th-width ${
                    date.toDateString() === currentDate.toDateString()
                      ? "active"
                      : ""
                  }`}
                  key={index}
                >
                  <span>{days[index]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {weekDates.map((date, index) => (
                <td
                  className={`th-width ${
                    date.toDateString() === currentDate.toDateString()
                      ? "active"
                      : ""
                  }`}
                  key={index}
                >
                  <span>{date.getDate()}</span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
      <div className="pt-3 ms-3">
        <Image src={`/calendar-arrow.png`} width={30} height={30} alt={``} />
      </div>
      {/* {showTooltip && (
        <Link
          href="#"
          className="mod-tooltip  "
          style={{ opacity: "1", top: "150px", right: "0%", left: " 50%" }}
        >
          Click to View Calendar
        </Link>
      )} */}
    </div>
  );
};

export default WeekDatePicker;
