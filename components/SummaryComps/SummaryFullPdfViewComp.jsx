import { useCallback, useState, useRef } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Link from "next/link";
import Image from "next/image";

// Full PDF view Component
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 1000;

export default function SummaryFullPdfViewComp(props) {
  const { summData } = props;
  const assignedCode = summData?.assigned_code
  const url =process.env.NODE_ENV === 'production' ?  process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME +"/dashboard/getPdf?assignedCode="+ assignedCode : "https://shikshaml.com/backend/api" +"/dashboard/getPdf?assignedCode="+ assignedCode 
  const [file, setFile] = useState(url);

  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState(900);
  const [scale, setScale] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const pdfContainerRef = useRef();

  const onResize = useCallback((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);


  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  };

  const handleScroll = () => {
    const container = pdfContainerRef.current;

    if (container) {
      const scrollPosition = container.scrollTop;
      const pageHeight = container.scrollHeight / numPages;
      const newPageNumber = Math.ceil(scrollPosition / pageHeight);
      setPageNumber(newPageNumber);
    }
  };

  const visible_pages = [0,1,2,3,4]

  return (
    <div className="Example h-[100vh] ">
      <header className="fixed z-[100] w-full h-[100px] top-0 flex space-x-6 items-center bg-white justify-center py-4">
        <Link
          href={assignedCode ? `/summary?code=${assignedCode}`:"/summary"}
          className="bs-btn no-underline typ-theme-reverse  !h-[35px]  2xl:!h-[40px] text-sm 2xl:text-lg p-2 min-w-[180px]"
        >
          Back to Summary
        </Link>
        <h6 className="text-lg">{summData?.title}</h6>
        <select
          onChange={(e) => setScale(e.target.value)}
          value={scale}
          className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value={0.5}>50%</option>
          <option value={1}>100% </option>
          <option value={1.5}>150%</option>
          <option value={2}>200%</option>
          <option value={4}>400%</option>
        </select>

        {numPages && (
          <span>
            {" "}
            Page {!pageNumber ? "1" : pageNumber} of {numPages}
          </span>
        )}
      </header>
      <div
        className="Example__container !mt-[100px] h-[calc(100vh-100px)] overflow-x-hidden scrollbarClass"
        ref={pdfContainerRef}
        onScroll={handleScroll}
        // style={{ overflowY: "scroll" }}
      >
        <div className="Example__container__document" ref={setContainerRef}>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            className={"flex flex-col justify-center items-center"}
          >
            {Array.from(new Array(numPages), (el, index) => {
              // for locked content page
              // if(summData?.visible_pages?.includes(index)){
                if(!visible_pages.includes(index)){
                return (
                  <div key={index} className="relative">
                    <div className="absolute h-full w-full  bg-[#efe8fd] opacity-75  z-[50] flex justify-center items-center">  
                      <Image src={"/images/icons/shikshaml_full_logo.png"} alt="shikshaml-logo" height={600} width={600} className="-rotate-45" />
                    
                    </div>
                    <Page
                    className={"blur-sm"}
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      width={
                        containerWidth
                          ? Math.min(containerWidth, maxWidth)
                          : maxWidth
                      }
                      scale={scale}
                      loading={<div>Please wait!</div>}
                    />
                  </div>
                );
              }
              return (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={
                    containerWidth
                      ? Math.min(containerWidth, maxWidth)
                      : maxWidth
                  }
                  scale={scale}
                  loading={<div>Please wait!</div>}
                />
              );
            })}
          </Document>
        </div>
      </div>
    </div>
  );
}
