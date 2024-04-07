import { useEffect, useState } from "react";
import SummaryMediaComp from "./SummaryMediaComp";
import SummaryTextComp from "./SummaryTextComp";
import SummaryChatBoxComp from "./SummaryChatBoxComp";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChatBotDataRedux,
  fetchChatBotSuggestionDataRedux,
  fetchPdfSummaryRedux,
} from "../../redux/slices/summarySlice";
import { fetchUserData } from "../../redux/slices/userDataSlice";
import Image from "next/image";
import tokenGif from "../../public/images/tokengif.gif";
import { useRouter } from "next/router";

const SummaryComponent = () => {
  const summData = useSelector((state) => state.summary.summaryData);
  const chatbotData = useSelector((state) => state.summary.chatbotData);
  const summary = useSelector((state) => state.summary.summary);
  const chatSuggestionData = useSelector((state) => state.summary.suggestions);
  const userToken = useSelector((state) => state?.userData?.data?.tokenBalance);


  // ALL USESTATES
  const [contentAdded, setContentAdded] = useState(0); // if content addded is 0 means default state , 1 when video content and 2 pdf content
  const [hideVideo, setHideVideo] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [assignedCode, setAssignedCode] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null); // State to hold the timeout ID

  const dispatch = useDispatch();
  const router = useRouter()


  // useEffects
  useEffect(() => {
    if (summData) {
      setAssignedCode(summData.assigned_code);
      if (summData.type == "video") {
        setContentAdded(1);
      } else {
        setContentAdded(2);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summData, summData?.assigned_code]);

  useEffect(() => {
    if (assignedCode && !chatbotData) {
      fetchChatBotData();
    }
    if (assignedCode && !chatSuggestionData) {
      fetchChatBotSuggestionData();
    }
    if (assignedCode && !summary) {
      fetchPdfSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignedCode, chatbotData, chatSuggestionData, summData, summary]);

  // All functions

  // FETCH CHAT BOT DATA OR HISTORY
  const fetchChatBotData = async (queryPassed) => {
    try {
      const payload = {
        assignedCode: assignedCode,
      };
      if (userToken && userToken >= 1) {
        if (queryPassed) {
          payload.postData = queryPassed;
        }
      }

      dispatch(fetchChatBotDataRedux(payload)).then((res) => {
        if(timeoutId) clearTimerFunc(timeoutId)
        if (res?.payload?.status == 200) {
          dispatch(fetchUserData());
        }
      });
    } catch (error) {
      throw error;
    }
  };

  // FETCH SUMMARY
  const fetchPdfSummary = async () => {
    const payload = {
      assignedCode: assignedCode,
    };
    dispatch(fetchPdfSummaryRedux(payload));
  };

  // fetch chat summary for assigned code
  const fetchChatBotSuggestionData = async () => {
    const payload = {
      assignedCode: assignedCode,
    };
    dispatch(fetchChatBotSuggestionDataRedux(payload));
  };

  const handleSubmitChatbot = (query) => {
    let searchQueryString;
    if (query) {
      if (typeof query !== "string") {
        searchQueryString = {
          query: query.question,
          question_id: query._id,
        };
      } else {
        searchQueryString = {
          query: query,
        };
      }
    } else {
      searchQueryString = {
        query: searchQuery,
      };
    }

    fetchChatBotData(searchQueryString);
  };

  const clearTimerFunc = (timeoutId) => {
    if (timeoutId) clearTimeout(timeoutId);
  };

  return (
    <>
      <div className="container-fluid bg-white px-0 pb-2 overflow-hidden relative">
        <div className="row">
          {/* video and summery box */}
          <div className="col-lg-8 mt-1 min-h-[85vh] ">
            {/* Divided Summary page in three component for ease */}
            <div className="w-[auto] h-full flex flex-col">
              {/* for rendering media like video or pdf */}
              <SummaryMediaComp
                contentAdded={contentAdded}
                hideVideo={hideVideo}
                setHideVideo={setHideVideo}
                summData={summData}
              />
              {/* summary text display comp */}
              <SummaryTextComp
                contentAdded={contentAdded}
                hideVideo={hideVideo}
                setHideVideo={setHideVideo}
                assignedCode={assignedCode}
              />
            </div>
          </div>

          {/* shiksha ai chat box */}
          {userToken ==  0 && typeof userToken =="number" ? 
          <div className="col-lg-4 min-h-[85vh] border-1 bg-[#EFE8FD80] border-[#F8F9FA] shadow-md rounded-2xl p-2">
            <span className="text-left text-2xl font-medium">shiksha AI</span>
            <p className="text-center text-2xl font-medium text-[#FF6200] mt-6">
              Insufficient Coins
            </p>
            <p className="text-center text-[16px] text-[#ffcc02] font-medium mt-8">
            &quot; Low on shiksha Coins ! Please recharge to continue your learning journey. &quot;
            </p>
            <div className="flex flex-col justify-center  items-center">
              <Image src={tokenGif} height={900} width={300} alt="token-gif" />
              <button className="text-center bg-[#FF6200] text-white w-[100px] h-[45px] rounded-md" onClick={()=>router.push("/token-manager")} >Top up</button>
            </div>
           
          </div>:<div className="col-lg-4 min-h-[85vh] border-1  border-[#F8F9FA] shadow-md rounded-2xl text-center flex flex-col justify-between p-2">
            <SummaryChatBoxComp
              contentAdded={contentAdded}
              chatSuggestionData={chatSuggestionData}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSubmitChatbot={handleSubmitChatbot}
              assignedCode={assignedCode}
              clearTimerFunc={clearTimerFunc}
              timeoutId={timeoutId}
              setTimeoutId={setTimeoutId}
            />
          </div>}
        </div>
      </div>
    </>
  );
};

export default SummaryComponent;
