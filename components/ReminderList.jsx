import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const ReminderList = ({ data }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [displayData, setDisplayData] = useState(data);

  useEffect(() => {
    setDisplayData(data);
  }, [data]);

  return (
    <div className="mod-list typ-todo">
      <div
        className="table-container"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div
          className="list-header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h2 className="title">Reminders</h2>
          <div>
            {/* <Image
              src={`/filter-icon.svg`}
              alt={``}
              width={20}
              height={20}
              className="vector-filter"
              onClick={() => setShowTypeFilter(!showTypeFilter)}
              ref={filterIconRef}
            /> */}
          </div>
          {showTooltip && (
            <Link
              href="#"
              className="mod-tooltip"
              style={{ opacity: "1", top: "20px", left: "50%" }}
            >
              Click to View
            </Link>
          )}
        </div>

        <div className="p-2">
          <span className="p-2">No Reminder</span>
        </div>
        <div>
          {/* When data supposed to show */}

          {/* {displayData.map((item, index) => (
            <div key={index} className="data-list">
              <span className="t-data num one">1</span>
              <span className="t-data fix-width two capitalize text-[12px] 2xl:text-[14px]">No Task</span>
              <span className="t-data list-date three text-[12px] 2xl:text-[14px] !min-w-[120px]">No Task</span>
              <span className={`t-data status ${item.status !== 'complete' ? 'todo' : 'done'} four`}>
                {item.status == "complete"? "Done":item.status}
              </span>
            </div>
          ))} */}
        </div>
      </div>
      {/* {showTypeFilter && (
        <div className="type-fiter" ref={filterListRef}>
          <p onClick={() => handleFilterClick("done")} className="done">
            Done
          </p>
          <p onClick={() => handleFilterClick("todo")} className="todo">
            To Do
          </p>
          <p onClick={() => handleFilterClick("default")} className="default">
            Default
          </p>
        </div>
      )} */}
    </div>
  );
};

export default ReminderList;
