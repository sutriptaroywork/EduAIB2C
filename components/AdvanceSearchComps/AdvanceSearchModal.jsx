import Image from "next/image";
import React, { useEffect, useState } from "react";

const AdvanceSearchModal = (props) => {
  const {
    isModalOpen,
    closeModal,
    menuModalData,
    filterSelected,
    setFilterSelected,
    filterLength,
  } = props;

  const [displayMenu, setDisplayMenu] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (menuModalData?.sub_menu) {
      setDisplayMenu(menuModalData?.sub_menu);
    }
  }, [menuModalData, menuModalData?.sub_menu]);

  useEffect(() => {
    const handleBackgroundClick = (e) => {
      if (e.target.classList.contains("modal-background")) {
        closeModal("close");
      }
    };

    if (isModalOpen) {
      document.addEventListener("click", handleBackgroundClick);
    } else {
      document.removeEventListener("click", handleBackgroundClick);
    }

    return () => {
      document.removeEventListener("click", handleBackgroundClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

// Handle Checkox runned when user clicks on checkbox
  const handleCheckboxChange = (menu, sub_menu) => {
    let temp_filter = { ...filterSelected };
    if (!temp_filter.hasOwnProperty(menu)) {
      temp_filter[menu] = [];
      temp_filter[menu].push(sub_menu);
      setFilterSelected(temp_filter);
    } else if (temp_filter[menu].includes(sub_menu)) {
      let tempData = temp_filter[menu].filter((item) => item !== sub_menu);
      temp_filter[menu] = [...tempData];
      setFilterSelected(temp_filter);
    } else {
      temp_filter[menu].push(sub_menu);
      setFilterSelected(temp_filter);
    }
  };

//   Checkbox should be disable or not based on length of filter
  const checkStatus = (menu, sub_menu) => {
    if (filterSelected.hasOwnProperty(menu)) {
      if (filterSelected[menu].includes(sub_menu)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed z-[999]   modal-background h-[calc(100vh)] top-0 left-0 right-0 bottom-0  flex justify-center items-center  bg-black bg-opacity-50">
          <div className="bg-white capitalize rounded-lg mx-[8%]  h-auto min-h-[60vh] w-[60%]  relative flex flex-col justify-between">
          <div className="cont-top">
            <div className=" flex justify-end pt-2 pr-2">
              <button
                className="cursor-pointer focus:outline-none bg-[#FF6200] rounded-full p-1"
                onClick={(e) => {
                  closeModal("close");
                }}
              >
                <svg
                  className="w-5 h-5  hover:scale-125"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="px-2">
              <h2 className="text-[#1F1F1F] pl-6 text-md ">
                {menuModalData?.menu}
              </h2>
              <h5 className="text-[#1F1F1F] pl-6 text-[14px] my-3">
                Select Options
              </h5>
              <div className="w-full flex justify-center items-center">
                <div className="flex border border-[#929599] w-[90%] mx-2 my-2 space-x-2 px-2 py-1 rounded-md  ">
                  <input
                    placeholder={`Search for ${menuModalData?.menu}`}
                    type="text"
                    className="flex-1 pl-2 placeholder:text-sm border-none outline-none"
                    value={searchQuery}
                    onChange={(e) => {
                      if ((e.target.value == "")) {
                        setSearchQuery(e.target.value);
                        setDisplayMenu(menuModalData?.sub_menu);
                      } else {
                        setSearchQuery(e.target.value);
                        const filteredData = displayMenu.filter((item) =>
                          item.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                        setDisplayMenu(filteredData);
                      }
                    }}
                  />
                  <div className="bg-[#ffcc02] p-2 rounded-md">
                    <Image
                      src={"/images/icons/search.svg"}
                      height={15}
                      width={15}
                      alt="icon"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid mt-1 grid-cols-3 gap-x-2 w-[90%] ml-[6%] grid-rows-[40px] h-auto max-h-[40vh] 2xl:max-h-[52vh] overflow-auto overflow-x-hidden scrollbarClass ">
              {displayMenu?.map((sub_menu, ind) => (
                <div
                  key={ind}
                  className="flex justify-start h-[38px]"
                >
                  <label className="inline-flex">
                    <input
                      type="checkbox"
                      className="h-5 w-5  accent-[#ffcc02] border-gray-300 rounded !bg-white "
                      value={sub_menu}
                      checked={checkStatus(menuModalData?.menu, sub_menu)}
                      onChange={() =>
                        handleCheckboxChange(menuModalData?.menu, sub_menu)
                      }
                      disabled={
                        filterLength == 1 &&
                        checkStatus(menuModalData?.menu, sub_menu)
                          ? true
                          : false
                      }
                    />
                    <span className="ml-2 text-[#000] text-sm 2xl:text-[16px] capitalize">{sub_menu}</span>
                  </label>
                </div>
              ))}
            </div>
            </div>
            <div className="flex item-center pl-8 space-x-6 mt-2 py-5">
              <button
                className="bs-btn typ-theme-reverse !h-[40px]  2xl:!h-[45px] text-sm 2xl:text-lg !rounded-[6px]"
                onClick={() => closeModal("close")}
              >
                Apply
              </button>
              <button
                className="bs-btn typ-theme !h-[40px] !w-auto px-6  2xl:!h-[45px] !text-sm !2xl:text-md !rounded-[6px]"
                onClick={() => {
                  let temp = { ...filterSelected };
                  temp[menuModalData?.menu] = [];
                  setFilterSelected(temp);
                }}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvanceSearchModal;
