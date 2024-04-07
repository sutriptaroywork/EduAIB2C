import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import hourImages from "../public/boystudying.jpg";
import { useSelector,useDispatch } from 'react-redux';
import Skeleton from "react-loading-skeleton";
import { fetchWeeklyData } from "../redux/slices/dashboardSlice";

const WeeklyBarGraph = () => {
  const dispatch = useDispatch();
  const weeklyRData = useSelector((state) => state.dashboardSlice.weeklyhrSpent);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  const [initialHeights, setHeights] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hourImage, setHourImage] = useState(false);
  
  useEffect(() => {
    if(!weeklyRData.data){
      dispatch(fetchWeeklyData());
    }
    if(weeklyRData.data){
      const allValuesAreZero = Object.values(weeklyRData?.data?.data).every(value => value === '0.00' || value === "0");
          if (allValuesAreZero) {
            setHourImage(true);
          } else {
            setHourImage(false);
          }
          setWeeklyData(weeklyRData.data.data);
    }
  }, [weeklyRData]);

  useEffect(() => {
    if (weeklyData) {
      if (Object.keys(weeklyData).length > 0) {
        let arr = [0, 0, 0, 0, 0, 0, 0]
        Object.keys(weeklyData).map((key, index) => {
          const day = weeklyData[key];
          let hours = parseFloat(day) || 0;
          hours = hours * 10
          arr[index] = hours
        })
        setHeights(arr)
      } 
    }

  }, [weeklyData]);

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  if (weeklyRData.isLoading) {
    return (
      <div className='h-[250px] w-full'>
         <Skeleton height={250} />
      </div>
     
    );
  }

  return (
    <>
      {hourImage ?
        <div className="h h-[250px] w-full mt-0">
          <p className="text-sm 3xl:text-2xl text-center m-0">{'"'}It will be calculated once you start your </p>
          <p className="text-sm 3xl:text-2xl  text-center ">journey on shikshaML{'"'}</p>
          <div className="h-[200px] w-[200px] m-auto ">
            <Image
              src={hourImages}
              alt="logo"
              // height={200}
              // width={200}
            />
          </div>
        </div> : <div className="mod-weekgraph">

          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className="bar cursor-pointer"
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="bar-inner"
                style={{ height: `${initialHeights[index]}px` }}
              >
                {hoveredIndex === index && (
                  <Link
                    href="/your-analytics-page"
                    className="mod-tooltip"
                    style={{
                      background: "#efe8fd",
                      color: "#ffcc02",
                      opacity: "5",
                      padding: "5px 10px",
                      transition: "all 0.8s;",
                      fontSize: "12px",
                    }}
                  >
                    {initialHeights[index] / 10}hr
                  </Link>
                )}
              </div>
              <div className="day-label !text-[12px] 2xl:!text-[14px]">{day}</div>
            </div>
          ))}
        </div>}
    </>
  );
};

export default WeeklyBarGraph;
