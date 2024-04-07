// Summary Media Comp is coded by durgesh and im working on it
import Image from "next/image";
import InfinityLoader from "../Utils/infinityLoader";
import dynamic from "next/dynamic";
import { Tooltip } from "react-tooltip";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { capitalizeSentences } from "../Utils/sentence";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false, 
});

const SummaryPdfViewerComp = dynamic(() => import("./SummaryPdfViewerComp"), {
  ssr: false,
});

const style = {
  height: 300,
};


const VideoLoader = ()=>{
  return (<div className="absolute h-full w-full z-100 bg-white flex justify-center items-center">
  <InfinityLoader style={style} />
  </div>)
}

const SummaryMediaComp = (props) => {
  const { contentAdded, loading, hideVideo, setHideVideo, summData } = props;
  const [videoLoad,setVideoLoad] = useState(true)
  const router = useRouter();
  const contentUrl = summData?.contentUrl;

  const elementRefNew = useRef(null);
  const [elementHeight, setElementHeight] = useState(0);

  useLayoutEffect(() => {
    const updateElementHeight = () => {
      if (elementRefNew?.current) {
        let height = elementRefNew?.current?.clientHeight - 80 > 200 ? elementRefNew?.current?.clientHeight - 100 :200 
        setElementHeight(height);
      }
    };

    updateElementHeight();

  }, [contentAdded,hideVideo,elementRefNew?.current?.clientHeight]);
  
  useEffect(() => {
    if(!hideVideo){
      const timeoutId = setTimeout(() => {
        setVideoLoad(false);
      }, 700);
  
      return () => clearTimeout(timeoutId);
    }else{
      setVideoLoad(true)
    }
   
  }, [hideVideo]);

  let str1 = `${elementHeight}px `

  return (
    <>
      {contentAdded == 0 ? (
        <div className="text-center h-[50%] border-1 border-[#F8F9FA] shadow-md space-y-1 p-2  rounded-2xl flex flex-col justify-center items-center">
          {(
            <>
              <Image
                src="/images/summaryAssets/dropbox.png"
                height={100}
                width={120}
                alt="box"
              />

              <p className="mt-4 text-center text-zinc-500 text-sm font-normal w-[85%]">
                Please choose a study topic to
                start learning
              </p>
            </>
          )}
        </div>
      ) : contentAdded == 1 ? (
        // Video section
        <div
          className={
            hideVideo
              ? "w-full shadow-md border-t max-h-[60px] border-[#fafafa] p-2 bg-white rounded-xl mb-2 2xl:mb-4"
              : " h-[50%] border-1 flex flex-col border-[#F8F9FA] shadow-md rounded-2xl  p-2"
          }
          
          
        >
          <div className="flex justify-between items-center text-[#000] p-1 2xl:py-2">
            <h6 className=" text:xl 2xl:text-2xl font-medium pl-2">
              {capitalizeSentences(summData?.title)}
            </h6>
            <span
              className=" text-sm 2xl:text-[16px] text-[#ffcc02] font-normal  cursor-pointer"
              onClick={() => {
                setHideVideo(!hideVideo);
              }}
            >
              {hideVideo ? "Show Video" : "Hide video"}
            </span>
          </div>
          {/* video section */}
          {!hideVideo && <div
            className={
              `h-full w-full flex relative  flex-grow items-center justify-center  p-1 2xl:p-2  `
            }
          >
            {videoLoad &&<VideoLoader />}
            <ReactPlayer
              width={"100%"}
              height={"100%"}
              url={contentUrl}
              controls
            />
          </div>}
        </div>
      ) : (
        // PDF section
        <div
          className={
            hideVideo
              ? "w-full shadow-md border-t max-h-[60px] border-[#fafafa] p-2 bg-white rounded-xl mb-2 2xl:mb-4"
              : "h-[50%]  border-1 flex flex-col border-[#F8F9FA] shadow-md rounded-2xl p-1  2xl:p-2"
          }
         ref={elementRefNew}
        >
          <div className="flex justify-between items-center text-[#000] p-1 2xl:py-2">
            <h6 className="text:xl 2xl:text-2xl font-medium pl-2 capitalize">
              {summData?.title?.toLowerCase()}
            </h6>
            <div className="flex space-x-2 ">
              <span
                className="text-sm mr-2 2xl:text-[16px] text-[#ffcc02] font-normal  cursor-pointer"
                onClick={() => {
                  setHideVideo(!hideVideo);
                }}
              >
                {hideVideo ? "Show PDF" : "Hide PDF"}
              </span>
              {/* expand icon*/}
              <Image
                data-tooltip-id="expand-summary"
                data-tooltip-content="Click to Expand"
                className="cursor-pointer"
                src="/images/icons/full-screen.png"
                height={18}
                width={20}
                alt="full screen"
                onClick={() => router.push("/pdf-viewer")}
              />
              <Tooltip
                id="expand-summary"
                opacity={1}
                noArrow
                style={{
                  backgroundColor: "#ffcc02",
                  padding: "8px 12px",
                  borderRadius: "10px",
                }}
                place="bottom-end"
              />
            </div>
          </div>
          {!hideVideo && <div
            className={
              "h-[50%] w-full text-sm 2xl:text-base scrollbarClass overflow-auto overflow-x-hidden pl-3  pr-4 my-1 pb-1"
            }
            style={ {height:str1}}
          >
            {/* PDF viewer comp to display pdf */}
            <SummaryPdfViewerComp  />
          </div>}
        </div>
      )}
    </>
  );
};

export default SummaryMediaComp;
