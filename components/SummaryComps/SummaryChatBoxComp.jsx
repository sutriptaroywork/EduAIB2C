// Summary Chat box is coded by durgesh
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import TypingEffect from "../Utils/TypingEffect";
import { PulseLoader } from "react-spinners";
import { useRef } from "react";
import { useWindowWidth } from "@wojtekmaj/react-hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import MarkdownRenderComp from "../MarkDownRenderComp";
import { useDispatch, useSelector } from "react-redux";
import youtube from "../../public/images/youtube.svg";
import google from "../../public/images/google.svg";
import Photo from "../../public/images/Photo.svg";
import ReactPlayer from "react-player";
import { FaTimes } from "react-icons/fa";
import { resetChatLoading } from "../../redux/slices/summarySlice";

// Summary Chat bot main component
const SummaryChatBoxComp = (props) => {
  // Content added is 0,1,2 0:no content 1:video 2: pdf

  // all props
  const {
    contentAdded,
    chatSuggestionData,
    searchQuery,
    setSearchQuery,
    handleSubmitChatbot,
    assignedCode,
    timeoutId,
    setTimeoutId

  } = props;

  const dispatch = useDispatch()

  const chatbotData = useSelector((state) => state.summary.chatbotData);
  const isChatLoading = useSelector((state)=>state.summary.isLoadingChatbot)
  const isChatLoadingRef = useRef(isChatLoading);

  

  useEffect(() => {
    isChatLoadingRef.current = isChatLoading;
  }, [isChatLoading]);

  // USESTATES
  const [displayChatBotData, setDisplayChatBotData] = useState([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [renderSuggestion, setRenderSuggestion] = useState(null);
  const [typingEnded, setTypingEnded] = useState(true);
  const windowWidth = useWindowWidth(); // 1440
  const [blurTimeout, setBlurTimeout] = useState(null);
  const [showTypeEffect, setShowTypeEffect] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
 
  const userData = useSelector((state) => state?.userData?.data);

  // REFS
  const scrollRef = useRef(null);
  // Create a ref for the search input element
  const inputRef = useRef(null);

  const router = useRouter();
  const loaderWidth = windowWidth > 1440 ? 15 : 10;
  const recommendWidth =  windowWidth > 1440 ? 35 : 30;

  // USEFFECTS
  useEffect(() => {
    if (chatSuggestionData?.content) {
      const firstThreeElements = chatSuggestionData?.content.slice(0, 3);
      setRenderSuggestion(firstThreeElements);
    }
    if (chatSuggestionData?.content && !displayChatBotData.length) {
      setTypingEnded(false);
    }
  }, [
    chatSuggestionData,
    chatSuggestionData?.content,
    displayChatBotData.length,
  ]);

  useEffect(() => {
    let chatHistory = chatbotData;
    if (chatHistory && chatHistory.length) {
      setDisplayChatBotData(chatHistory);
    } else {
      setDisplayChatBotData([]);
    }
  }, [chatbotData]);

  useEffect(() => {
    let intervalID;
    if (typingEnded) {
      intervalID = setInterval(() => {
        scrollToElement();
      }, 1000);
    } else {
      scrollToBottom();
    }
    return () => {
      clearInterval(intervalID);
    };
  }, [typingEnded]);

  useEffect(() => {
    // Function to change the message after 2 seconds
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 1000);

    // Cleanup function to cancel the timeout if the component unmounts
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // to scroll bottom

  const scrollToElement = () => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const scrollToBottom = () => {
    const chatContainer = document.getElementById("chatContainer");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  const handleInputBlur = () => {
    // Use a delay to close the chat suggestions
    const timeout = setTimeout(() => {
      setIsSelectOpen(false);
    }, 2000); // Adjust the delay time as needed
    setBlurTimeout(timeout);
  };

  const handleSearchBox = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (searchQuery.length > 3) {
        setIsSelectOpen(false);
        handleChatSubmit();
      }
    }
  };

  const handleChatSubmit = async () => {
    if(!isChatLoading && assignedCode){
    if (userData?.tokenBalance <= 0) {
      toast.warn(`Token balance is ${userData?.tokenBalance}`, {
        closeButton: (
          <button
            className="bg-[#ffcc02] rounded-2xl w-auto py-1 px-3  text-white "
            onClick={() => router.push("/token-manager")}
          >
            Top UP
          </button>
        ),
      });
      return;
    }
    if (assignedCode) {
      let temp = [...displayChatBotData];

      temp.push({
        role: "user",
        content: searchQuery,
      });
      temp.push({
        role: "loader",
        content: "",
      });

      timerFunc(searchQuery);
      setDisplayChatBotData([...temp]);
      setShowTypeEffect(true);
      handleSubmitChatbot();

      scrollToElement();
      setTypingEnded(true);
      setSearchQuery("");
    } else {
      toast.info("Please select a topic from search ");
    }
  }
  };
  // when suggestion is clicked inside chat bot
  const handleSuggestionClick = (item) => {
    let query = item;
    let temp = [...displayChatBotData];

    temp.push({
      role: "user",
      content: typeof item == "string" ? item : item?.question,
    });
    temp.push({
      role: "loader",
      content: "",
    });
    timerFunc(typeof item == "string" ? item : item?.question);
    setTypingEnded(true);
    setShowTypeEffect(true);
    setDisplayChatBotData([...temp]);
    handleSubmitChatbot(query);
    scrollToElement();
    setIsSelectOpen(false);
  };

 
  

  const timerFunc = (ques) => {
    // Clear any existing timeout to avoid duplicates or unintended behavior
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => {
      if (isChatLoadingRef.current) {
        let temp = [...displayChatBotData];

        if (ques) {
          temp.push({
            role: "user",
            content: ques,
          });
        }
        temp.push({
          role: "response-delay",
          content: "",
        });

        setDisplayChatBotData([...temp]);
        dispatch(resetChatLoading());
      }
    }, 60000);
    // Save the timeout ID to state so it can be cleared if needed
    setTimeoutId(id);
  };


  const Popup = ({ content, onClose }) => {
    const [loading, setLoading] = useState(true);

    return (
      <div className="fixed  top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-10 bg-purple-300  z-[100]">
        <div className="bg-white shadow-md rounded-lg px-4 pb-2 w-[70%] h-[95%] pt-2">
         <div className="flex">
         <MarkdownRenderComp markdownContent={content?.title} />
         <FaTimes
            onClick={onClose}
            className=" text-gray-500 text-[20px] translate-x-2 cursor-pointer hover:scale-125  duration-300"
          />
          </div> 
          
          {content.source === "youtube" ? (
            <>
              {loading && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "90%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                  }}
                >
                  <PulseLoader
                    color={"#ffcc02"}
                    loading={true}
                    size={loaderWidth}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              )}
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${content.videoId}`}
                width="100%"
                height="90%"
                controls
                onReady={() => {
                  setLoading(false);
                }}
                onError={() => {
                  setLoading(false);
                }}
              />
            </>
          ) : (
            <>
              {loading && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                  }}
                >
                  <PulseLoader
                    color={"#ffcc02"}
                    loading={true}
                    size={loaderWidth}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              )}
              <iframe
                src={content.link}
                width="100%"
                height="90%"
                allowFullScreen
                title={content.title}
                onLoad={() => {
                  setLoading(false);
                }}
              ></iframe>
            </>
          )}
        </div>
      </div>
    );
  };

  const handleRedirect = (link) => {
    if(link){
    window.open(link, '_blank');

    }
  }

  return (
    <>
      <div className="h-[100%]">
        <div
          className={`flex  ${
            contentAdded != 0 ? "justify-between" : "justify-end"
          } items-center my-1`}
        >
          {contentAdded != 0 && (
            <span
              className="text-lg 2xl:text-2xl text-[#000] font-medium"
              onClick={scrollToBottom}
            >
              AI Chatbot
            </span>
          )}
          <div className="flex">
          
            <div>
          {/* <Image
            data-tooltip-id="expand-chatbox"
            data-tooltip-content="Click to Expand"
            src="/images/icons/full-screen.png"
            className="cursor-pointer mr-3"
            height={20}
            width={20}
            alt="full screen icon"
            onClick={() => {
              if (assignedCode) {
                router.push("/shikshaAi");
              } else {
                toast.info("Please select a topic to start learning");
              }
            }}
          />
          <Tooltip
            id="expand-chatbox"
            opacity={1}
            noArrow
            style={{
              backgroundColor: "#ffcc02",
              padding: "8px 12px",
              borderRadius: "10px",
            }}
            place="bottom-end"
          /> */}
          </div>
          </div>
        </div>

        {contentAdded == 0 ||
        (!displayChatBotData?.length && !renderSuggestion?.length) ? (
          // when no chat data and no suggestion
          <div className="flex items-center justify-center absolute top-[40%] right-[10%]">
            <Image
              src="/images/summaryAssets/robotic-icon.png"
              height={110}
              width={110}
              alt="box"
            />
          </div>
        ) : (
          <div
            id={"chatContainer"}
            className="h-full w-[99%] flex flex-col  px-2 py-2 max-h-[calc(100vh-100px)] 2xl:max-h-[calc(100vh-200px)] overflow-auto overflow-x-hidden scrollbarClass "
          >
            {/* chat data is available then this is render */}
            {displayChatBotData?.length > 0 ? (
              <>
                {displayChatBotData.map((chat, index) => {
                  const length = displayChatBotData.length - 1;
                  if (chat.role == "response-delay") {
                    // if (chat.role == "user") {
                    scrollToBottom();
                    // when pulseLoader wants to display means loading till the time new data is fetched
                    return (
                      <div key={index} className="w-full flex justify-start">
                        <div
                          className="bg-white rounded-[10px] w-full text-left px-3 pt-[15px] pb-3 2xl:pt-[13px] my-2 shadow-md"
                        >
                          {/* <Image
                            src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/icons/shikshaml-ai.png`}
                            height={40}
                            width={40}
                            alt="logo"
                            className="inline-block mr-2"
                          />
                          <span className=" text-[#000]">
                            Hi there! 👋 I{"'"}ve noticed that your request is
                            taking a bit longer than usual. I{"'"}m really sorry
                            for the inconvenience this may be causing. We{"'"}re
                            working hard to get everything back to speed. Your
                            patience during this time is greatly appreciated.
                            Thank you for your understanding! 🙏
                          </span> */}
                          Oops! It seems we{"'"}re experiencing a delay in
                          fetching your results. We{"'"}re working behind the
                          scenes to get your results as quickly as possible.
                          Thanks for your understanding!
                        </div>
                      </div>
                    );
                  }

                  if (chat.role == "loader") {
                    scrollToBottom();
                    // when pulseLoader wants to display means loading till the time new data is fetched
                    return (
                      <div key={index} className="w-full flex justify-start">
                        <div className="bg-white rounded-[10px] w-[35%] text-left p-[10px] 2xl:p-[15px] my-2 shadow-md flex justify-center items-center">
                          <PulseLoader
                            color={"#ffcc02"}
                            loading={true}
                            // cssOverride={override}
                            size={loaderWidth}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        </div>
                      </div>
                    );
                  }

                  if (chat.role == "user") {
                    // User query div
                    return (
                      <div key={index} className="w-full flex justify-end mt-2">
                        <div className="bg-yellow-200 rounded-[10px] w-3/4 text-left pt-[10px] 2xl:pt-[13px] font-medium mb-2">
                          <span className="text-sm 2xl:text-[16px]  text-[#856d0c]">
                            <MarkdownRenderComp
                              markdownContent={chat.content}
                            />
                          </span>
                        </div>
                      </div>
                    );
                  } else if (index == length && showTypeEffect) {
                    return (
                      // When Ans as a reply is render , Which includes typing effect
                      <div key={index} className="w-full flex justify-start">
                        <div
                          className="bg-white rounded-[10px] w-full text-left pt-[10px] 2xl:pt-[13px] my-2 shadow-md"
                          ref={scrollRef}
                        >
                          <span className=" text-[#000]">
                            <TypingEffect
                              text={chat.content}
                              interKeyStrokeDurationInMs={4}
                              typingEnded={typingEnded}
                              setTypingEnded={setTypingEnded}
                              setShowTypeEffect={setShowTypeEffect}
                            />
                          </span>
                        </div>
                      </div>
                    );
                  } else {
                    scrollToBottom();
                    //Old history  is rendered here accept reply or last ans
                    return (
                      <div
                        key={index}
                        className="w-full flex flex-col justify-center mb-2"
                      >
                        <div className="bg-white rounded-[10px] w-full text-left p-[10px] 2xl:p-[15px] my-2 shadow-md">
                          <span className=" text-[#000] visible-auto">
                            {/* <SummaryMarkdownComp markdownContent={chat.content} /> */}
                            <MarkdownRenderComp
                              markdownContent={chat.content}
                            />
                          </span>
                        </div>

                        {chat?.recommended_content &&
                          chat?.recommended_content?.length > 0 && (
                            <div className="relative">
                              {selectedItem && (
                                <Popup
                                  content={selectedItem}
                                  onClose={() => setSelectedItem(null)}
                                />
                              )}
                              <div className="flex w-full overflow-auto scrollbarClass mt-2  pl-[5px] pb-2 space-x-2 ">
                                {chat?.recommended_content.map(
                                  (dataItem, key) => (
                                    <Fragment key={key} >
                                      {dataItem?.data_list?.map(
                                        (listItem, index) => (
                                          <div
                                            style={{ background: '#ffeda5' }}
                                            key={index}
                                            className="bg-[#efe8fd] rounded-md  cursor-pointer min-w-[200px]   p-1 h-[80px] 2xl:h-[120px] flex flex-col justify-between"
                                            onClick={() =>{
                                              if(dataItem.source != "google"){
                                                setSelectedItem({
                                                  ...listItem,
                                                  source: dataItem.source,
                                                })
                                              }else{
                                                handleRedirect(listItem.link)
                                              }
                                            }
                                              
                                            }
                                          >
                                            <div style={{ color: '#856d0c', fontWeight: 'bold' }} className="text-[11px] 2xl:text-[14px]  text-[#9326f3] text-left p-1 h-[50px] 2xl:h-[80px]">
                                              <MarkdownRenderComp
                                                markdownContent={
                                                  listItem?.title.length > recommendWidth
                                                    ? `${listItem?.title.substring(
                                                        0,
                                                        recommendWidth
                                                      )} ...`
                                                    : listItem?.title
                                                }
                                              />
                                            </div>
                                            <div className="flex justify-start items-center p-1">
                                              <Image
                                                src={
                                                  dataItem.source == "google"
                                                    ? google
                                                    : youtube
                                                }
                                                alt="brand-icon"
                                                className="h-[15px] w-[15px] 2xl:h-[20px] 2xl:w-[20px] mr-1"
                                              />
                                                <span className="text-[10px] 2xl:text-[12px]  capitalize ml-1 truncate-text text-ellipsis">
                                                {listItem?.displayLink?.split(
                                                  "."
                                                )[1] || listItem.channelTitle}
                                              </span>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </Fragment>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    );
                  }
                })}
              </>
            ) : (
              <>
                {/* when suggestion is to be displayed ,it only gets displayed when there's no chat history */}
                {
                  <div className="mt-2 flex">
                    <Image
                      src="/images/icons/suggestIcon.svg"
                      className="mr-1"
                      height={12}
                      width={12}
                      alt="box"
                    />
                    <span className="text-black text-[12px] font-semibold  leading-normal">
                      Suggested question
                    </span>
                  </div>
                }
                {renderSuggestion.length > 0 &&
                  renderSuggestion?.map((item, index) => (
                    <div key={index} className="w-full flex justify-end mt-2">
                      <div
                        className="bg-yellow-200 cursor-pointer rounded-[10px] w-3/4 text-left pt-[10px] 2xl:pt-[13px] mb-2 font-medium"
                        onClick={() => {
                          if (userData?.tokenBalance <= 0) {
                            toast.warn(
                              `Token balance is ${userData?.tokenBalance}`,
                              {
                                closeButton: (
                                  <button
                                    className="bg-[#ffcc02] rounded-2xl w-auto py-1 px-3  text-white "
                                    onClick={() =>
                                      router.push("/token-manager")
                                    }
                                  >
                                    Top Up
                                  </button>
                                ),
                              }
                            );
                            return;
                          }
                          handleSuggestionClick(item);
                        }}
                      >
                        <span className="text-xs 2xl:text-lg leading-3 text-[#856d0c]">
                          <MarkdownRenderComp
                            markdownContent={
                              typeof item == "string" ? item : item?.question
                            }
                          />
                        </span>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        )}
      </div>

      <div className="px-2 mb-2">
        {/* Chat bot query Div with input inside */}
        <div className="relative h-11 pl-4 pr-[10px] w-full border bg-stone-50 rounded-xl shadow  border-stone-300  justify-between items-center inline-flex">
          <input
            type="text"
            className="text-gray-600 text-sm 2xl:text-base font-normal w-full mr-8 bg-transparent outline-none placeholder:text-xs 2xl:placeholder:text-sm disabled:cursor-not-allowed"
            placeholder="Type your query here..."
            value={searchQuery}
            onChange={(e) => handleSearchBox(e)}
            onClick={() => setIsSelectOpen(!isSelectOpen)}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyPress}
            ref={inputRef}
            disabled={!assignedCode || isChatLoading ? true : false}
          />
          <Image
            src="/images/icons/chat-send-icon.png"
            className={` py-0 ${
              !assignedCode || typingEnded || isChatLoading
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            height={30}
            width={30}
            alt="Send icon"
            onClick={handleChatSubmit}
          />
          {/* when isSelectOpen is true Suggestion above input will be displayed vice versa */}
          {isSelectOpen && searchQuery.length == 0 && (
            <div className="absolute bottom-12 left-0  w-full max-h-[40vh]  overflow-auto overflow-x-hidden scrollbarClass bg-white border p-2 shadow-2xl">
              {chatSuggestionData?.content?.map((item, index) => (
                <div
                  style={{ background: '#ffeda5', color: '#856d0c' }}
                  key={index}
                  className="cursor-pointer text-left text-[#9326f3] text-xs 2xl:text-sm p-2 hover:bg-gray-100"
                  onClick={() => {
                    handleSuggestionClick(item);
                    // setSearchQuery(typeof item =="string"? item: item?.question);
                    // if (inputRef?.current) {
                    //   inputRef.current.focus();
                    // }
                  }}
                >
                  <MarkdownRenderComp
                    markdownContent={
                      typeof item == "string" ? item : item?.question
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SummaryChatBoxComp;
