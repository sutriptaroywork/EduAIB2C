import React, { useEffect, useState } from "react";
import CheckboxFilterComp from "./CheckBoxFilterComp";
import AdvanceSearchModal from "./AdvanceSearchModal";
import ContentCardComp from "./ContentCardComp";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdvSearchData } from "../../redux/slices/advSearchSlice";

const AdvanceSearchComponent = (props) => {
  const { menuData, filteredQuery,advData,loading } = props;
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);
  const [menuModalData, setMenuModalData] = useState(null);
  const [advSearchData, setAdvSearchData] = useState(null);
  const [filterSelected, setFilterSelected] = useState({});
  const [filterLength, setFilteredLength] = useState(0);

  useEffect(()=>{
    setAdvSearchData(advData)
  },[advData])


  useEffect(()=>{
    // if(!advData && !advSearchData && !loading && Object.keys(filteredQuery).length > 0){
    if(!advData && !advSearchData && !loading){
      const payload = {
        postData: {
          filter: filteredQuery,
        },
      };
      dispatch(fetchAdvSearchData(payload))
    }
    if(filteredQuery){
      Object.keys(filteredQuery).map((key) => {
        setFilterSelected({
          [key]: [filteredQuery[key]],
        });
      });
    }
  },[filteredQuery])


  useEffect(() => {
    let totalLength = 0;
    for (const key in filterSelected) {
      if (filterSelected.hasOwnProperty(key)) {
        const arrayLength = filterSelected[key].length;
        totalLength += arrayLength;
      }
    }
    setFilteredLength(totalLength);
    
  }, [filterSelected]);

  useEffect(() => {
    if (Object.keys(filterSelected).length > 0) {
      fetchFilteredData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSelected]);

  const closeModal = (status) => {
    if (status == "open") {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  };

  const fetchFilteredData = async (query) => {
    let data = { ...filterSelected };
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const array = data[key];
        if (array.length === 0) {
          delete data[key];
        }
      }
    }

    const postData = {
      filter: data,
    };
    const payload = {
      postData: postData,
      query: query,
    };
    try {
      dispatch(fetchAdvSearchData(payload));
    } catch (error) {
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* left section or filter section */}
          <CheckboxFilterComp
            closeModal={closeModal}
            menuData={menuData}
            setMenuModalData={setMenuModalData}
            filterSelected={filterSelected}
            setFilterSelected={setFilterSelected}
            filterLength={filterLength}
          />
          {/* Content or right section  with header */}
          <ContentCardComp
            advSearchData={advSearchData}
            fetchFilteredData={fetchFilteredData}
            filterSelected={filterSelected}
          />
        </div>
      </div>
      {/* modal when isModal state is true */}
      <AdvanceSearchModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        menuModalData={menuModalData}
        filterSelected={filterSelected}
        setFilterSelected={setFilterSelected}
        filterLength={filterLength}
      />
    </>
  );
};

export default AdvanceSearchComponent;
