import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const TodoList = ({ data }) => {
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [filter, setFilter] = useState("default");
  const filterIconRef = useRef(null);
  const filterListRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [displayData, setDisplayData] = useState(data);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // document.addEventListener('click', closeLists);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (filter === "default") {
      setDisplayData(data);
    } else if (filter === "todo") {
      const filtered = data.filter((item) => item.status === "To Do");
      setDisplayData([...filtered]);
    } else if (filter === "done") {
      const filtered = data.filter((item) => item.status === "Done");
      setDisplayData([...filtered]);
    } else {
      setDisplayData(data);
    }
  }, [filter,data]);

  const handleClickOutside = (event) => {

    if (
      showTypeFilter &&
      filterIconRef.current &&
      !filterIconRef.current.contains(event.target)
    ) {
      setShowTypeFilter(false);
    }
    if (
      filterListRef.current &&
      !filterListRef.current.contains(event.target)
    ) {
      setShowTypeFilter(false);
    }
  };

  const handleFilterClick = (selectedFilter) => {
    setFilter(selectedFilter);
    setShowTypeFilter(false); // Close the filter list after selecting a filter option
  };

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
          <h2 className="title">To Do List</h2>
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
          {/* {showTooltip && (
            <Link
              href="#"
              className="mod-tooltip"
              style={{ opacity: "1", top: "20px", left: "50%" }}
            >
              Click to View
            </Link>
          )} */}
        </div>
        <div>
          <div className="heading-list">
            <span className="t-heading one"> </span>
            <span className="t-heading fix-width two">Task</span>
            <span className="t-heading t-date three">Date</span>
            <span className="t-heading four">Status</span>
          </div>

          <div className=" heading-list cursor-not-allowed" disabled>
          <span className="t-heading one"> 1</span>
            <span className="t-heading fix-width two">No task</span>
            <span className="t-heading t-date three">--</span>
            <span className="t-heading four">--</span>
          </div>

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

export default TodoList;
