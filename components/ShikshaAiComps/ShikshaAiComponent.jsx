import { useEffect, useState } from "react";
import ShikshaAiChatBotComp from "./ShikshaAiChatBotComp";
import { fetchChatBotDataRedux, fetchChatBotSuggestionDataRedux } from "../../redux/slices/summarySlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/slices/userDataSlice";

const ShikshaAiComponent = () => {

  const dispatch = useDispatch()
  const summData = useSelector((state)=>state.summary.summaryData);
  const chatSuggestionData = useSelector((state)=>state.summary.suggestions)
  const chatbotData = useSelector((state)=>state.summary.chatbotData)
  const userToken = useSelector((state)=>state?.userData?.data?.tokenBalance)

  // ALL USESTATES
  const [contentAdded, setContentAdded] = useState(0); // if content addded is 0 means default state , 1 when video content and 2 pdf content
  const [searchQuery, setSearchQuery] = useState("");
  const [assignedCode, setAssignedCode] = useState(null);


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
  }, [ summData, summData?.assigned_code]);

  useEffect(() => {
    if (assignedCode && !chatbotData) {
      fetchChatBotData();
    }
    if (assignedCode && !chatSuggestionData) {
      fetchChatBotSuggestionData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignedCode,chatbotData,chatSuggestionData]);

  // All functions

  // FETCH CHAT BOT DATA OR HISTORY
  const fetchChatBotData = async (queryPassed) => {
    try {
      const payload = {
        assignedCode: assignedCode,
      };
      if(userToken && userToken >=1){
        if (queryPassed) {
          payload.postData =queryPassed ;
        }
      }
      
      dispatch(fetchChatBotDataRedux(payload)).then((res)=>{
        if(res?.payload?.status ==200){
        dispatch(fetchUserData());

        }
      }); 
    
    } catch (error) {
      throw error; 
    }
  };
  
  // fetch chat summary for assigned code
  const fetchChatBotSuggestionData = async () => {
    const payload = {
      assignedCode: assignedCode,
    };
    dispatch(fetchChatBotSuggestionDataRedux(payload));
  };

  const handleSubmitChatbot = (query) => {
    let searchQueryString 
    if(query){
      if(typeof query !=="string"){
        searchQueryString = {
          query:query.question,
          question_id:query._id
        }
      }else{
        searchQueryString = {
          query:query,
        }
      }
    }else{
      searchQueryString ={
        query:searchQuery
      }
    }
    fetchChatBotData(searchQueryString);
  };

  return (
    <>
      <div className="container-fluid min-h-[calc(100vh-150px)] 2xl:min-h-[calc(100vh-150px)]  h-full w-full flex flex-col bg-white px-0 pb-2 justify-center items-center">
          {/* required for future use border-1 border-[#F8F9FA] shadow-md rounded-2xl */}
          {/* shiksha ai chat box */}
          <div className="w-[70%] h-full  text-center flex flex-col">
            <ShikshaAiChatBotComp
              contentAdded={contentAdded}
              chatSuggestionData={chatSuggestionData}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSubmitChatbot={handleSubmitChatbot}
              assignedCode={assignedCode}
            />
            
          </div>
        
      </div>
    </>
  );
};

export default ShikshaAiComponent;
