// Summary Comp is coded by durgesh
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";
import SummaryMarkdownComp from "./SummaryMarkdownComp";
import { useRouter } from "next/router";
import ClipboardJS from "clipboard";
import { useEffect, useRef, useState } from "react";
import { useLayoutEffect } from "react";
import MarkdownRenderComp from "../MarkDownRenderComp";
import { useSelector } from "react-redux";
import SkeletonLoader from "../Utils/Skeleton";

// Summary is rendered here
const SummaryTextComp = (props) => {
  const { contentAdded, hideVideo, setHideVideo, assignedCode } = props;

  const summaryLoading = useSelector((state)=>state.summary.isLoading)

  const router = useRouter();
  const displayData = useSelector((state) => state.summary.summary);
  const elementRef = useRef(null);
  const [elementHeight, setElementHeight] = useState(0);

  useLayoutEffect(() => {
    const updateElementHeight = () => {
      if (elementRef.current) {
        let height =
          elementRef?.current?.clientHeight - 80 > 100
            ? elementRef.current.clientHeight - 70
            : 100;
        setElementHeight(height);
      }
    };

    // Initial height on mount
    updateElementHeight();

    // Cleanup function (optional)
    return () => {
      // Cleanup code if needed
    };
  }, [contentAdded, hideVideo, elementRef?.current?.clientHeight]); // Empty dependency array means this effect runs once on mount// Empty dependency array means this effect runs once on mount

  const handleQnAClick = () => {
    if (assignedCode) {
      router.push("/quiz");
    } else {
      toast.info("Please select a topic from search ");
    }
  };

  const handleCopyClick = () => {
    const clipboard = new ClipboardJS(".copyButtonSumm");

    clipboard.on("success", () => {
      toast.success("Copied successfully.");
    });

    setTimeout(() => {
      clipboard.destroy();
    }, 500);
  };

  let str1 = `${elementHeight}px `;

  return (
    <>
      {contentAdded == 0 ? (
        <div className="text-center h-[50%] mt-3 border-1 border-[#F8F9FA] shadow-md rounded-2xl flex flex-col justify-center items-center">
          <Image
            src="/images/summaryAssets/summary-icon.png"
            height={90}
            width={90}
            alt="clipboard"
            className="mt-4"
          />
          <p className="mt-8 mb-8 text-center text-zinc-500 text-sm font-normal w-[85%]">
            Summary and Q&A will be available after you select a study topic
          </p>
        </div>
      ) : (
        <div
          className={` h-[50%] ${
            hideVideo
              ? "h-auto mt-4 flex-grow "
              : "mt-2 2xl:mt-3  justify-between "
          } border-1 flex flex-col border-[#F8F9FA] shadow-md rounded-2xl p-2`}
        >
          {/* summary text header and body  */}
          <div className="flex-grow" ref={elementRef}>
            {/* header summary text */}
            <div className="flex justify-between items-center px-2 py-1">
              <h6 className="text-lg 2xl:text-2xl text-[#000] pl-2">
                Summary{" "}
              </h6>
              <div className="flex justify-between items-center space-x-4">
                {/* copy icon */}

                <Image
                  data-clipboard-text={displayData?.content?.message}
                  data-tooltip-id="copy-tooltip"
                  data-tooltip-content="Click to Copy"
                  onClick={() => {
                    handleCopyClick();
                  }}
                  className="cursor-pointer copyButtonSumm"
                  src="/images/icons/copy-icon.png"
                  height={20}
                  width={18}
                  alt="copy"
                />

                <Tooltip
                  id="copy-tooltip"
                  opacity={1}
                  noArrow
                  style={{
                    backgroundColor: "#ffcc02",
                    padding: "8px 12px",
                    borderRadius: "10px",
                  }}
                  place="bottom-end"
                />
                {/* expand icon*/}
                {hideVideo ? (
                  <div
                    className="flex items-center h-[20px] cursor-pointer"
                    onClick={() => setHideVideo(!hideVideo)}
                  >
                    <Image
                      data-tooltip-id="expand-summary"
                      data-tooltip-content="Click to Minimize"
                      src="/images/icons/minimize-icon.png"
                      height={20}
                      width={18}
                      alt="minimize icon"
                    />
                  </div>
                ) : (
                  <Image
                    data-tooltip-id="expand-summary"
                    data-tooltip-content="Click to Expand"
                    className="cursor-pointer"
                    src="/images/icons/full-screen.png"
                    height={20}
                    width={18}
                    alt="full screen"
                    onClick={() => setHideVideo(!hideVideo)}
                  />
                )}
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
            {/* summary text body */}

            <div
              className={
                hideVideo
                  ? "text-sm 2xl:text-lg h-[50%] pr-3 mt-2  scrollbarClass overflow-auto overflow-x-hidden px-2"
                  : `text-sm scrollbarClass overflow-auto overflow-x-hidden px-2 h-[50px] 2xl:mt-3 2xl:text-lg  2xl:h-[100px] `
              }
              style={{ height: str1 }}
            >
              {displayData?.content?.message && (
                <>
                  {summaryLoading ? (
                    <SkeletonLoader type="summery-loader" />
                  ) : (
                    <MarkdownRenderComp
                      markdownContent={displayData.content.message}
                    />
                  )}
                </>
              )}
            </div>
          </div>

          {/* summary text footer */}
          {/* <div className="flex justify-center items-center space-x-2 text-sm h-[40px] 2xl:h-[60px]">
            <h6 className="mt-3 text-sm 2xl:text-lg">
              Click here to test your learning
            </h6>
            <Image
              src="/images/icons/fingerPointing.png"
              height={70}
              width={70}
              className=""
              alt="pointing hand"
            />
            <button
              className="bs-btn typ-theme-reverse min-w-[130px] mt-2 !h-[35px]  2xl:!h-[40px] text-sm 2xl:text-lg"
              onClick={() => handleQnAClick()}
            >
              Q&A
            </button>
          </div> */}
        </div>
      )}
    </>
  );
};

export default SummaryTextComp;
