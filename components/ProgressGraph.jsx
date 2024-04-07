import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { fetchProgressData } from "../redux/slices/dashboardSlice";
import Skeleton from "react-loading-skeleton";

const ProgressGraph = () => {
  const dispatch = useDispatch();
  const [percentage, setPercentage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const progressData = useSelector((state) => state.dashboardSlice.progressChart);

  useEffect(() => {
    if (!progressData.data) {
      dispatch(fetchProgressData());
    }
    if (progressData.data) {
      const resultString = progressData.data.data.toString().split(".")[0];
      setProgress(resultString);
    }
  }, [progressData.data]);

  useEffect(() => {
    // Simulate an increase in percentage with animation
    const interval = setInterval(() => {
      if (percentage < progress) {
        setPercentage((prevPercentage) => prevPercentage + 1);
      }
    }, 30);

    return () => {
      clearInterval(interval);
    };
  }, [percentage, progress]);

  const radius = 90; 
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = (circumference * (100 - percentage)) / 100;

  if (progressData.isLoading) {
    return (
      <div className="circular-progress-graph">
        <Skeleton height={220}/>
      </div>
    );
  }
  return (
    <div className="mod-progress">
      <div
        className="circular-progress-graph"
        onMouseEnter={() => setShowTooltip(true)} // Show tooltip on mouse enter
        onMouseLeave={() => setShowTooltip(false)} // Hide tooltip on mouse leave
      >
        <div className="shadowEffect">
          <svg
            width={2 * radius}
            height={2 * radius}
            className="start-like-clock"
          >
            <circle
              className="progress-background"
              cx={radius}
              cy={radius}
              r={radius - 10}
              fill="none"
              strokeWidth="20"
              stroke="#f60"
            />
            <circle
              className="progress-fill"
              cx={radius}
              cy={radius}
              r={radius - 10}
              fill="none"
              strokeWidth="20"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="#9400d3"
              style={{
                boxShadow: "4px 4px 20px 0px rgba(238, 238, 238, 0.50)",
              }}
            />
          </svg>
          <text x={radius} y={radius} className="progress-text">
            {progress}%
          </text>
        </div>

        {/* {showTooltip && (
          <Link
            href="/your-analytics-page"
            className="mod-tooltip"
            style={{ opacity: "1", transition: "all 0.8s;" }}
          >
            Click to view Analytics
          </Link>
        )} */}
      </div>
    </div>
  );
};

export default ProgressGraph;
