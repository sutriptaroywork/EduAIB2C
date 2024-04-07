import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSearchDataRedux,
} from "../../redux/slices/layoutSlice";
import customDebounce from "../Utils/customDebounce";
import { useRouter } from "next/router";
import { fetchChatBotDataRedux, fetchChatBotSuggestionDataRedux, fetchPdfSummaryRedux, updateSummaryData } from "../../redux/slices/summarySlice";
import TimerHeader from "../Utils/timerHeader";
import Link from "next/link";
import { exploreDataObj } from "../ConstantData";
import Tokens from "../Tokens";
import { fetchAdvSearchData } from "../../redux/slices/advSearchSlice";
import Skeleton from "../Utils/Skeleton";
import { fetchUserData } from "../../redux/slices/userDataSlice";
import SkeletonLoader from "../Utils/Skeleton";
import { capitalizeSentences } from "../Utils/sentence";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const currentPath = router?.pathname

  const sideBarStatus = useSelector((state)=>state.layout.sideBarStatus);
  const pfData = useSelector((state) => state.userData.data);
  const searchData = useSelector((state)=>state.layout.searchData)
  const loading  = useSelector((state)=>state.layout.isLoading)
  const userDataLoading = useSelector((state)=>state.userData.isLoading)

  const searchInputRef = useRef(null);
  const noteListRef = useRef(null);
  const exploreButtonRef = useRef(null);
  const searchListRef = useRef(null);

  const [isloading, setisLoading] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNoteListOpen, setIsNoteListOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [query, setQuery] = useState("");
  const summData = useSelector((state)=>state?.summary?.summaryData);

 

  useEffect(() => {
    if(!pfData){
    dispatch(fetchUserData());
    }
    if(!searchData){
      dispatch(updateSearchDataRedux())
    }
  }, [pfData,searchData])


  const debounceDelay = 400;

  const debouncedSearch = customDebounce((query) => {
    fetchSearchResults(query);
  }, debounceDelay);

  const fetchSearchResults = async (query) => {
    const payload = {
      query:query
    }
    dispatch(updateSearchDataRedux(payload))
  };

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleBellIconClick = () => {
    setIsNoteListOpen(!isNoteListOpen);
  };

  const handleExploreClick = () => {
    setIsExploreOpen(!isExploreOpen);
  };

  const handleSummaryRedirect = (data) => {
    setQuery("");
    dispatch(updateSummaryData(data));
    const payload = {
      assignedCode: data.assigned_code,
    };
    dispatch(fetchChatBotDataRedux(payload));
    dispatch(fetchPdfSummaryRedux(payload)).then((res)=>{
      dispatch(updateSearchDataRedux())
    });
    dispatch(fetchChatBotSuggestionDataRedux(payload));
   
    setIsSearchOpen(false);
    // router.push("/summary");
    router.push(`/summary?code=${data.assigned_code}`)
  };


  const handleOutsideClick = (e) => {
    if (noteListRef.current && !noteListRef.current.contains(e.target)) {
      setIsNoteListOpen(false);
    }
    if (
      exploreButtonRef.current &&
      !exploreButtonRef.current.contains(e.target)
    ) {
      setIsExploreOpen(false);
    }
    if (
      searchInputRef.current &&
      !searchInputRef.current.contains(e.target) &&
      searchListRef.current &&
      !searchListRef.current.contains(e.target)
    ) {
      setIsSearchOpen(false);
    }
  };

  const handleNoteListClick = (e) => {
    e.stopPropagation();
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


  const handleMarkAllReadClick = () => {
    const updatedNotes = notes.map((note) => ({
      ...note,
      visited: true,
    }));
    setNotes(updatedNotes);
  };


  const handleSubClick = (menu, sub_menu) => {
    const payload = {
      postData: {
        filter: { [menu]: [sub_menu] },
      },
    };
    dispatch(fetchAdvSearchData(payload));
    router.push({ pathname: "/advance-search", query: { [menu]: [sub_menu] } });
  };



  const checkJeevan = ["VK Global","New Age","UNIQUE"]
  const checkUnique = ["VK Global","New Age","Jeevandeep Edumedia"]


  return (
    <header
      className={`bs-header-dash container-fluid ${
        !sideBarStatus && "main-layout-header-cls"
      }`}
    >
      <div className="row d-flex justify-between aligns-center header">
        <div className="col-xl-5 col-lg-6 col-md-5 left-side">
          {currentPath !== "/shikshaAi" ? (
            <>
              {/* <div
                className="btn-explore"
                ref={exploreButtonRef}
                onClick={handleExploreClick}
              >
                Explore
                <div className="down-arrow-img">
                  <Image
                    src={"/down-arrow.svg"}
                    width={15}
                    height={15}
                    alt="down-arrow"
                    className="img-fluid down-arrow"
                  />
                </div>
                {isExploreOpen && (
                  <nav className="goals_list">
                    <ul>
                      <li className="dropdown hover:text-[white] active:text-[white]">
                        <div className="dropdown-content hover:text-[white] active:text-[white]">
                          {Object.keys(exploreDataObj)?.map((menu, index) => {
                            if (menu == "_id" || menu == "__v") {
                              return <></>;
                            }
                            return (
                              <div
                                className="sub-dropdown capitalize hover:text-[white] active:text-[white] "
                                key={index}
                              >
                                <span
                                  href="#"
                                  className="hover:text-[white] active:text-[white]"
                                >
                                  {menu}
                                </span>
                                <div className="sub-dropdown-content max-h-[400px] scrollbarClass  overflow-x-hidden overflow-y-auto">
                                  <p className="goals">{menu}</p>
                                  {exploreDataObj[menu]?.map(
                                    (sub_menu, ind) => {
                                      return (
                                        <a
                                          href="#"
                                          key={ind}
                                          onClick={() =>
                                            handleSubClick(menu, sub_menu)
                                          }
                                        >
                                          {sub_menu}
                                        </a>
                                      );
                                    }
                                  )}
                                  {pfData?.publisher_name &&
                                    pfData?.publisher_name.length > 0 && (
                                      <>
                                       
                                        <a
                                          href="#"
                                        
                                          onClick={() =>
                                            handleSubClick(menu,  pfData?.publisher_name)
                                          }
                                        >
                                          {pfData?.publisher_name}
                                        </a>
                                      </>
                                    )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
              <div className="col-lg-8 col-md-8">
                <div className="search_box">
                  <div className="magnifier-img">
                    <Image
                      src={"/magnifier.svg"}
                      width={32}
                      height={32}
                      alt="magnifier"
                      className="img-fluid search-icon"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="What do you want to learn?"
                    className="search_input"
                    onClick={handleSearchClick}
                    ref={searchInputRef}
                    value={query}
                    onChange={handleInputChange}
                  />
                  {isSearchOpen && (
                    <div className="search-list" ref={searchListRef}>
                      {loading ? (
                        <>
                          <SkeletonLoader type={"search-loader"} />
                        </>
                      ) : searchData?.length && query.length ? (
                        <>
                          <ul>
                            {searchData?.map((item, index) => (
                              <li
                                key={index}
                                onClick={() => {
                                  handleSummaryRedirect(item);
                                }}
                              >
                                <Image
                                  src={"/magnifier.svg"}
                                  width={40}
                                  height={40}
                                  alt={item.title}
                                  className="img-fluid"
                                />
                                <p className="">
                                  {capitalizeSentences(item.title)}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : searchData?.length == 0 && query.length ? (
                        <>
                          <span className="title"> No result found !</span>
                        </>
                      ) : (
                        <>
                          {searchData?.recentlyViewed?.length > 0 && (
                            <div className="recent-view ">
                              <p className="title">Recently viewed</p>
                              <ul>
                                {searchData?.recentlyViewed?.map(
                                  (item, index) => (
                                    <li
                                      key={index}
                                      onClick={() => {
                                        handleSummaryRedirect(item);
                                      }}
                                    >
                                      <Image
                                        src={"/magnifier.svg"}
                                        width={40}
                                        height={40}
                                        alt={item.title}
                                        className="img-fluid"
                                      />
                                      <p className="">
                                        {capitalizeSentences(item.title)}
                                      </p>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                          <div className="populer-view">
                            <p className="title">Popular right now</p>
                            <ul>
                              {searchData?.popularNow?.map((item, index) => (
                                <li
                                  key={index}
                                  onClick={() => {
                                    handleSummaryRedirect(item);
                                  }}
                                >
                                  <Image
                                    src={"/magnifier.svg"}
                                    width={40}
                                    height={40}
                                    alt={item.title}
                                    className="img-fluid"
                                  />
                                  <p className="">
                                    {capitalizeSentences(item.title)}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div> */}
            </>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() => {
                if (summData?.assigned_code) {
                  router.push(`/summary?code=${summData?.assigned_code}`);
                } else {
                  router.push("/summary");
                }
              }}
            >
              <Image
                src={`/images/icons/back-arrow-icon.png`}
                width={20}
                height={20}
                alt="notification"
                className="img-fluid notification"
              />
            </div>
          )}
        </div>

        <div className="col-xl-7 col-lg-6 col-md-7 right-side">
          {/* <div>
            <Tokens />
          </div>
          <div
            className="bell-icon cursor-pointer"
            onClick={handleBellIconClick}
          >
            <Image
              src={`/bell.svg`}
              width={21}
              height={21}
              alt="notification"
            />
            {isNoteListOpen && (
              <div
                className="note-list"
                ref={noteListRef}
                onClick={handleNoteListClick}
              >
                <div className="note-header">
                  <p className="title">Notifications</p>
                  <div className="desc" onClick={handleMarkAllReadClick}>
                    <p className="markAll">Mark all as read</p>
                    <div className="checkedAll">&#10003;</div>
                  </div>
                </div>
                <div className="note-body">
                  <ul>
                    <li
                      className={"typ-list-none visited"}
                      // onClick={() => handleNoteClick(index)}
                    >
                      <p className="note flex justify-center items-center">
                        No Notification Here
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div> */}
          <Link href={"/setting"} className="profile-part no-underline">
            <div className="profile-image ">
              {!userDataLoading ? (
                <Image
                  src={
                    pfData?.image
                      ? `${process.env.NEXT_PUBLIC_BUCKET_URL}/${pfData?.image}`
                      : `/userIcon.jpeg`
                  }
                  width={60}
                  height={60}
                  alt="profile pic"
                  className="img-fluid border  !h-[60px] w-[60px] rounded-xl border-[#cbcbcb] shadow-sm"
                />
              ) : (
                <Skeleton height={60} width={60} />
              )}
            </div>
            {/* <div className="profile-content">
              {userDataLoading ? (
                <>
                  <Skeleton width={150} height={20} />{" "}
                </>
              ) : (
                <>
                  <span className="truncate-text text-ellipsis text-left text-md 2xl:text-lg capitalize text-[14px] font-semibold text-black">
                    {pfData?.fullname}
                  </span>
                  <TimerHeader />
                </>
              )}
            </div> */}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
