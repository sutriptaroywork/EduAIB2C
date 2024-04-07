import { useCallback, useEffect, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Image from "next/image";
import { useSelector } from "react-redux";

// Summary Pdf viewer which is used in SummaryTextComp
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

// This is small PDF renderer
export default function SummaryPdfViewerComp(props) {
  // const {assignedCode } = props;
  const assignedCode = useSelector((state)=>state?.summary?.summaryData?.assigned_code)
  const url =process.env.NODE_ENV === 'production' ?  process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME +"/dashboard/getPdf?assignedCode="+ assignedCode : "https://shikshaml.com/backend/api" +"/dashboard/getPdf?assignedCode="+ assignedCode 

  const [file, setFile] = useState(url);
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState(900);

  const onResize = useCallback((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onFileChange(event) {
    const { files } = event.target;

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  const visible_pages = [0,1,2,3,4]

  useEffect(()=>{
    if(assignedCode){
      const url =process.env.NODE_ENV === 'production' ?  process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME +"/dashboard/getPdf?assignedCode="+ assignedCode : "https://shikshaml.com/backend/api" +"/dashboard/getPdf?assignedCode="+ assignedCode 
      setFile(url)
    }
  },[assignedCode])

  return (
    <div className="Example">
      <div className="Example__container">
        <div className="Example__container__document" ref={setContainerRef}>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            
            {Array.from(new Array(numPages), (el, index) => {
               if(!visible_pages.includes(index)){
                return (
                  <div key={index} className="relative">
                    <div className="absolute h-full w-full  bg-[#efe8fd] opacity-75  z-[50] flex justify-center items-center">  
                      <Image src={"/images/icons/shikshaml_full_logo.png"} alt="shikshaml-logo" height={300} width={300} className="-rotate-45" />
                    
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
                    />
                  </div>
                );
              }


              return(<Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
              />)
              })}
          </Document>
        </div>
      </div>
    </div>
  );
}
