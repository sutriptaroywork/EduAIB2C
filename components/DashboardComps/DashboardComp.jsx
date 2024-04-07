import React, { useState, useEffect } from "react";
import Image from "next/image";
import WeeklyBarGraph from "../WeeklyBarChart";
import ProgressGraph from "../ProgressGraph";
import "react-datepicker/dist/react-datepicker.css";
import TableList from "../TableList";
import WeekDatePicker from "../DatePickerComp";
import Greeting from "../Greeting";
import StickyNotes from "../StickyNotes";
import { useDispatch, useSelector } from "react-redux";
import { searchData } from "../../redux/slices/layoutSlice";
import { useRouter } from "next/router";
import { updateSummaryData } from "../../redux/slices/summarySlice";
import { useWindowWidth } from "@wojtekmaj/react-hooks";
import SkeletonLoader from "../Utils/Skeleton";
import { capitalizeSentences } from "../Utils/sentence";

const Dashboard = () => {

  const searchResult = useSelector(searchData);
  const router = useRouter();
  const dispatch = useDispatch();
  const windowWidth = useWindowWidth();
  const length = windowWidth > 1440 ? 5 : 4;


  const handleRedirect = (item) => {
    dispatch(updateSummaryData(item));
    router.push(`/summary?code=${item?.assigned_code}`)
  };


  return (
    <>
      <div className="box body-part container-fluid ">
        <div className="row">
          <div className="col-xl-7  col-12">
            <div className="row">
              <div className="col-lg-12 lg:mb-0 md:mb-7" id="thoughtsOfDay">
                <Greeting  />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 sub-column">
                {" "}
                <div className="mod-shadow-card typ-graph">
                  <h2 className="sml-title mb-1">Hours Spent on shikshaML</h2>
                  <div className="graph-box">
                    <WeeklyBarGraph />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 sub-column">
                {" "}
                <div className="mod-shadow-card typ-progress">
                  <h2 className="sml-title">Overall Performance in Q&A</h2>
                  <div className="progress-box">
                    <ProgressGraph  />
                  </div>
                </div>
              </div>
            </div>
            {searchResult?.recentlyViewed?.length > 0 && (
              <div className="row append-this">
                <div className="col-lg-12 " id="continueLearing">
                  <div className="mod-shadow-card">
                    <h2 className="sml-title text-start">
                      Continue Learning Where You Left....
                    </h2>
                    {<SkeletonLoader height={100} /> && (
                      <div className="card-box">
                        {searchResult?.recentlyViewed
                          ?.slice(0, length)
                          .map((data) => (
                            <>
                              <div
                                className="img-box cursor-pointer"
                                onClick={() => handleRedirect(data)}
                              >
                                <div className="relative h-[90px] w-[105px]">
                                  <Image
                                    src={
                                      data.type == "video"
                                        ? "/images/vidThum.png"
                                        : "/pdf-image.png"
                                    }
                                    style={{ objectFit: "contain" }}
                                    alt=""
                                    fill
                                  />
                                </div>
                                <p className="title !text-xs w-[105px] !text-center">
                                  {capitalizeSentences(data.title)}
                                </p>
                              </div>
                            </>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-xl-5  col-12 append-here">
            <div className="row ">
              <div className="col-lg-12" id="weekCalendar">
                <div className="mod-shadow-card pb-2">
                  <WeekDatePicker />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="mod-shadow-card p-0">
                  <TableList />
                </div>
              </div>
              <div className="col-lg-12 md:mb-7" id="stickyNote">
                <StickyNotes />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 2xl:fixed 2xl:bottom-0 2xl:right-0">
          {/* <Image src={"/Lady.png"} alt="icon" height={170} width={250} /> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
