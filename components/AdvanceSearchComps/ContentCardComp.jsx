import React, { useEffect, useState } from "react";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import customDebounce from "../Utils/customDebounce";
import { capitalizeSentences } from "../Utils/sentence"
import {
  fetchChatBotDataRedux,
  fetchChatBotSuggestionDataRedux,
  fetchPdfSummaryRedux,
  updateSummaryData,
} from "../../redux/slices/summarySlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import AdvanceSearchTabs from "./AdvanceSearchTabs";
import SkeletonLoader from "../Utils/Skeleton";
import { toggleViewType } from "../../redux/slices/advSearchSlice";

const ContentCardComp = (props) => {
  // Props
  const { advSearchData, fetchFilteredData, filterSelected } = props;
  const itemsPerPage = 9; // Number of items per page

  const dispatch = useDispatch();
  const router = useRouter();

  const userData = useSelector((state) => state.userData.data);
  const loading = useSelector((state) => state.advanceSearch.isLoading);
  const isGridView = useSelector((state) => state.advanceSearch.isGridView);

  // USESTATE
  // const [isGridView, setIsGridView] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [cardData, setCardData] = useState(advSearchData);
  const [videoData, setVideoData] = useState([]);
  const [pdfData, setPdfData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [contentType, setContentType] = useState("all");
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("shikshaML");

  const pageCount = Math.ceil(cardData?.length / itemsPerPage);

  // USEEFFECTs
  useEffect(() => {
    if (advSearchData) {
      const temp = [...advSearchData];
      temp.sort((a, b) => a.title.localeCompare(b.title));
      setAllData([...temp]);
      let sortedVideo = temp.filter((data) => data.type === "video");
      setVideoData(sortedVideo);
      let sortedPdf = temp.filter((data) => data.type != "video");
      setPdfData(sortedPdf);
    }
  }, [advSearchData]);
  useEffect(() => {
    setPageNumber(0);
  }, [filterSelected]);

  useEffect(() => {
    if (advSearchData) {
      if (contentType == "all") {
        setCardData(allData);
      } else if (contentType == "video") {
        setCardData(videoData);
      } else {
        setCardData(pdfData);
      }
    }
    setPageNumber(0);
  }, [contentType, videoData, pdfData, advSearchData, activeTab]);
  //   All Functions

  const handlePageClick = (selected) => {
    setPageNumber(selected.selected);
  };

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  const debounceDelay = 1000;

  const debouncedSearch = customDebounce((query) => {
    fetchFilteredData(query);
  }, debounceDelay);

  const displayedCards =
    cardData &&
    cardData.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

  // PreviousButton JSX
  const PreviousButton = () => {
    return (
      <button className="p-2 border-2  border-[#ffcc02] rounded-sm ml-2">
        <Image
          src={`/next.svg`}
          height={15}
          width={15}
          className="rotate-180"
          alt="next arrow icon"
        />
      </button>
    );
  };

  // Next button jsx component
  const NextButton = () => {
    return (
      <button className="p-2 border-2  border-[#ffcc02] rounded-sm ml-2">
        <Image
          src={`/next.svg`}
          height={15}
          width={15}
          className=""
          alt="next icon"
        />
      </button>
    );
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleRedirect = (data) => {
    dispatch(updateSummaryData(data));
    const payload = {
      assignedCode: data.assigned_code,
    };
    dispatch(fetchChatBotDataRedux(payload));
    dispatch(fetchPdfSummaryRedux(payload));
    dispatch(fetchChatBotSuggestionDataRedux(payload));
    // router.push("/summary");
    router.push(`/summary?code=${data.assigned_code}`)
  };

  return (
    // Cards list

    <div className="col-lg-12 card-content">
      <div className="flex justify-between items-center">
        <h2 className="text-[18px] m-0">
          {contentType == "all"
            ? advSearchData?.length
            : contentType == "video"
              ? videoData.length
              : pdfData.length}{" "}
          Results
        </h2>

        <div className="flex items-center justify-end">

          {userData?.codeUsed && Object.keys(userData?.codeUsed).length > 0 && <>
            {(userData?.codeUsed?.school?.code ||
              userData?.codeUsed?.coachings[0]?.code?.length) && <div className="mr-4">
                <div className="flex justify-center filter-tab">
                  {/* Tab Buttons */}
                  {/* <div className="bs-tabs">
                    <div
                      className="tab-buttons !max-w-none"
                      handleTabClick={handleTabClick}
                    >
                      <button
                        className={`tab-button ${activeTab === "shikshaML" ? "active" : ""
                          }`}
                        onClick={() => handleTabClick("shikshaML")}
                      >
                        shikshaML
                      </button>
                      {userData?.codeUsed?.school.code && (
                        <button
                          className={`tab-button ${activeTab === "school" ? "active" : ""
                            }`}
                          onClick={() => handleTabClick("school")}
                        >
                          My School
                        </button>
                      )}
                      {userData?.codeUsed?.coachings && userData.codeUsed.coachings.length > 0 && userData.codeUsed.coachings[0].code.length > 0 && (
                        <button
                          className={`tab-button ${activeTab === "coaching" ? "active" : ""
                            }`}
                          onClick={() => handleTabClick("coaching")}
                        >
                          My Coaching
                        </button>
                      )}
                    </div>
                  </div> */}
                </div>
              </div>}
          </>}
          {/* <DropdownButton
            id="dropdown-basic-button"
            title={
              contentType === "all"
                ? "All"
                : contentType === "video"
                  ? "Video"
                  : "PDF"
            }
            variant=""
          >
            <Dropdown.Item onClick={() => setContentType("all")}>
              All
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setContentType("video")}>
              Video
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setContentType("pdf")}>
              PDF
            </Dropdown.Item>
          </DropdownButton> */}
          <input
            type="text"
            placeholder="search"
            className="border-2 rounded-[8px] p-[5px] w-[175px] h-[30px] ml-4"
            value={query}
            onChange={handleInputChange}
          />
          <button className="ml-4" onClick={() => dispatch(toggleViewType())}>
            <Image src={`/grid.svg`} width={25} height={25} alt="grid icon" />
          </button>
        </div>
      </div>
      {loading ? (
        <>
          {isGridView ? (
            <SkeletonLoader type="advance-search-grid" />
          ) : (
            <div className="container-fluid flex flex-col space-y-3 mt-3">
              <SkeletonLoader type="advance-search-list" />
            </div>
          )}
        </>
      ) : (
        <>
          {displayedCards && displayedCards.length ? (
            <>
              {isGridView ? (
                <div className="container-fluid grid grid-cols-3 gap-1">
                  {displayedCards?.map((card, index) => {
                    // Extract grade, subject, and publisher values from the card.categories array
                    const { grade, subject, publisher } =
                      card.categories.reduce((acc, item) => {
                        if (item.category === "grades") {
                          acc.grade = item.subcategories;
                        } else if (item.category === "subject") {
                          acc.subject = item.subcategories;
                        } else if (item.category === "publisher") {
                          acc.publisher = item.subcategories;
                        }
                        return acc;
                      }, {});

                    // Generate a random rating between 0 and 5 (including decimals)
                    const randomRating = (Math.random() * 5).toFixed(1);

                    // Generate a random number between 100 and 20000
                    const randomValue = Math.floor(
                      Math.random() * (20000 - 100 + 1) + 100
                    );

                    return (
                      <div
                        className="card p-2 mx-1 2xl:mx-2 mt-5 cursor-pointer !border-1 !border-[#9326f3]"
                        key={card._id}
                        onClick={() => handleRedirect(card)}
                      >
                        <div className="bg-[#ffeda5] relative ">
                          <div className=" h-[200px] 2xl:h-[250px]">
                            {/* <div className="h-[200px] 2xl:h-[250px]  flex m-auto relative  w-fit"> */}
                            <Image
                              // src={
                              //   card?.book_cover
                              //     ? `${process.env.NEXT_PUBLIC_BUCKET_URL}/${card?.pdf_cover}`
                              //     : `${process.env.NEXT_PUBLIC_B2B_BUCKET_URL}/images/pdf1.png`
                              // }
                              src={
                                `${process.env.NEXT_PUBLIC_B2B_BUCKET_URL}/images/pdf1.png`
                              }
                              // src={card?.bookCover ? card?.bookCover : (card.type === "video" ? `/card-img.png` : pdf1)}
                              // className={`rounded-[8px] h-full ${card?.book_cover ? "w-[50%]" : ""}  flex m-auto relative `}
                              className={`rounded-[8px] h-full flex m-auto relative `}
                              width={500}
                              height={200}
                              alt="card image"
                            />
                            {/* </div> */}
                            <div className="absolute bottom-1 left-[27%]">

                              <Image
                                // src={
                                //   card?.pdf_cover
                                //     ? `${process.env.NEXT_PUBLIC_BUCKET_URL}/${card?.book_cover}`
                                //     : `${process.env.NEXT_PUBLIC_B2B_BUCKET_URL}/images/pdf2.png`
                                // }
                                src={
                                  `${process.env.NEXT_PUBLIC_B2B_BUCKET_URL}/images/pdf2.png`
                                }
                                // src={card.type == "video" ? `/card-img.png` : pdf2}
                                // src={card?.firstPage ? card?.firstPage : (card.type === "video" ? `/card-img.png` : pdf2)}
                                className="rounded-[8px] w-[70px] h-[80px] 2xl:w-[80px] 2xl:h-[100px] "
                                width={70}
                                height={20}
                                alt="card image"
                              />
                            </div>

                          </div>
                        </div>
                        <div className="card-body">
                          <h6 className="title mt-3 text-[0.9rem] text-[#ffcc02] font-semibold ">
                            {capitalizeSentences(card?.title)}
                          </h6>
                          <h6 className="grade mt-3 text-[0.9rem]">
                            Grade : {grade}
                          </h6>
                          <h6 className="subject mt-3 text-[0.9rem]">
                            Subject: {capitalizeSentences(subject)}
                          </h6>
                          <h6 className="publication mt-3 text-[0.9rem] ">
                            Publication name:{" "}
                            <span className="text-[#ffcc02] font-semibold">
                              {publisher}
                            </span>
                          </h6>
                          <div className="flex mt-3">
                            <h6 className="rating flex text-[0.9rem]">
                              <Image
                                src={`/star.svg`}
                                width={20}
                                height={20}
                                alt="star"
                              />
                              {randomRating}
                            </h6>
                            <h6 className="review text-[0.9rem]">
                              (<span>{randomValue}</span>)
                            </h6>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="container-fluid flex flex-col space-y-3 mt-3">
                  {displayedCards.map((card) => {
                    // Extract grade, subject, and publisher values from the card.categories array
                    const { grade, subject, publisher } =
                      card.categories.reduce((acc, item) => {
                        if (item.category === "grades") {
                          acc.grade = item.subcategories;
                        } else if (item.category === "subject") {
                          acc.subject = item.subcategories;
                        } else if (item.category === "publisher") {
                          acc.publisher = item.subcategories;
                        }
                        return acc;
                      }, {});

                    // Generate a random rating between 0 and 5 (including decimals)
                    const randomRating = (Math.random() * 5).toFixed(1);

                    // Generate a random number between 100 and 20000
                    const randomValue = Math.floor(
                      Math.random() * (20000 - 100 + 1) + 100
                    );
                    return (
                      <div
                        className="space-x-4 cursor-pointer border-b-2 p-2 !flex flex-row"
                        key={card._id}
                        onClick={() => handleRedirect(card)}
                      >
                        <div className="bg-[#efe8fd] relative">
                          <div className="!h-[200px] w-[290px]">
                            <Image
                              src={
                                card?.book_cover
                                  ? `${process.env.NEXT_PUBLIC_BUCKET_URL}/${card?.pdf_cover}`
                                  : `${process.env.NEXT_PUBLIC_B2B_BUCKET_URL}/images/pdf1.png`
                              }
                              // src={`${process.env.NEXT_PUBLIC_B2B_BUCKET_URL}/images/pdf1.png`}
                              // src={card?.bookCover ? card?.bookCover : (card.type === "video" ? `/card-img.png` : pdf1)}
                              className={`rounded-[8px] !h-full ${card?.book_cover ? "w-[50%]" : ""}  flex m-auto `}
                              width={250}
                              height={200}
                              alt="card image"
                            />
                            <div className="absolute bottom-1 left-[28%]">
                              <Image
                                src={
                                  card?.pdf_cover
                                    ? `${process.env.NEXT_PUBLIC_BUCKET_URL}/${card?.book_cover}`
                                    : `${process.env.NEXT_PUBLIC_B2B_BUCKET_URL}/images/pdf2.png`
                                }
                                // src={card.type == "video" ? `/card-img.png` : pdf2}
                                // src={`${process.env.NEXT_PUBLIC_B2B_BUCKET_URL}/images/pdf2.png`}
                                // src={card?.firstPage ? card?.firstPage : (card.type === "video" ? `/card-img.png` : pdf2)}
                                className="rounded-[8px] w-[60px] h-[80px] 2xl:w-[70px] 2xl:h-[90px] "
                                width={70}
                                height={20}
                                alt="card image"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="card-body text mt-3">
                          <h6 className="title mb-0 text-[0.9rem] text-[#ffcc02]">
                            {capitalizeSentences(card.title)}
                          </h6>
                          <h6 className="grade mb-0 text-[0.9rem]">
                            Grade: {grade}{" "}
                          </h6>
                          <h6 className="subject text-[0.9rem]">
                            Subject: {subject}
                          </h6>

                          <div className="flex">
                            <h6 className="rating flex">
                              <Image
                                src={`/star.svg`}
                                width={20}
                                height={20}
                                alt="star"
                              />
                              {randomRating}
                            </h6>
                            <h6 className="review text-[0.9rem] pl-2 text-gray-500">
                              (<span>{randomValue}</span>)
                            </h6>
                          </div>
                          <h6 className="publication text-[0.9rem]">
                            Publication name:
                            <span className="text-[#ffcc02] font-semibold">
                              {publisher}
                            </span>
                          </h6>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="text-md font-medium flex justify-center items-center w-full h-[70vh]">
                <div className="text-center">
                  <Image
                    src="/images/empty-email.svg"
                    height={400}
                    width={400}
                    alt="No content image"
                  />
                  <p className="mb-0">No Content Found!</p>
                  <p className="mt-0">
                    Please choose another topic from filters{" "}
                  </p>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* Pagination */}
      {cardData?.length > itemsPerPage && (
        <div className="pagination-styling flex !justify-center items-center ">
          {/* <PaginationComp /> */}
          <ReactPaginate
            previousLabel={<PreviousButton />}
            nextLabel={<NextButton />}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={4}
            onPageChange={handlePageClick}
            containerClassName={""}
            subContainerClassName={""}
            activeClassName={"active"}
            pageLinkClassName={""}
            forcePage={pageNumber}
          />
        </div>
      )}
    </div>
  );
};

export default ContentCardComp;