import React from "react";

const CheckboxFilterComp = (props) => {
  // All props
  const {
    closeModal,
    menuData,
    setMenuModalData,
    filterSelected,
    setFilterSelected,
    filterLength
  } = props;

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
    <div className="col-md-0">
      {/* <h5 className="font-medium text-lg text-[#1F1F1F]">Filter by</h5> */}
      {/* to remove id and _v while mapping */}
      {menuData &&Object?.keys(menuData)?.map((menu, index) => {
        if (menu == "_id" || menu == "__v") {
          return <></>;
        }
        return (
          <div className="filter-cont" key={index}>
            {/* <h6 className="text-md mt-3 text-[#1F1F1F] capitalize">{menu}</h6> */}
            <div className="my-2">
              {/* SLice used as only 4 items should be displayed */}
              {/* {menuData[menu]?.slice(0, 4)?.map((sub_menu, ind) => {
                return (
                  <div key={ind} className="pl-6">
                    <label className="inline-flex my-1">
                      <input
                        type="checkbox"
                        className="h-5 w-5 accent-[#9362F3] border-gray-300 rounded"
                        value={sub_menu}
                        checked={checkStatus(menu, sub_menu)}
                        onChange={() => handleCheckboxChange(menu, sub_menu)}
                        disabled={filterLength == 1 && checkStatus(menu, sub_menu) ? true : false}
                      />
                      <span className="ml-2 text-[#000] text-[0.9rem] capitalize">
                        {sub_menu.toLowerCase()}
                      </span>
                    </label>
                  </div>
                );
              })}

              <button
                onClick={() => {
                  setMenuModalData({
                    menu: menu,
                    sub_menu: menuData[menu],
                  });
                  closeModal("open");
                }}
                className="text-[#1F1F1F]"
              >
                <span className="text-center">Show More</span>
              </button> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxFilterComp;
