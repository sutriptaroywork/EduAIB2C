import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const AdvSearchSkeletonGrid2 = ({ rowCount = 3, columnCount = 3 }) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <div className="card p-2 mx-2 2xl:mx-2 mt-5 cursor-pointer" key={colIndex} >
              <div className="w-full px-2">
                <Skeleton  height={150} className="rounded-[8px]" style={{ width: "100%" }} duration={0.8} />
            </div>
            <div className="card-body text">
              <h6 className="title mt-3 text-sm">Title: <Skeleton width={150} duration={0.8} /></h6>
              <h6 className="grade mt-3 text-sm">Grade: <Skeleton width={50} duration={0.8} /></h6>
              <h6 className="subject mt-3 text-sm">Subject: <Skeleton width={100} duration={0.8} /></h6>
              <h6 className="publication mt-3 text-sm">Publication name: <Skeleton width={100} duration={0.8} /></h6>
              
            </div>
          </div>
          ))}
        </div>
      ))}
    </>
  );
};

const AdvSearchSkeletonList = ({ rowCount = 6}) => {
  return (
    <>
    {Array.from({ length: rowCount }).map((_, rowIndex) => (
       <div key={rowIndex} className="space-x-4 cursor-pointer border-b-2 p-2 !flex flex-row">
       <Skeleton width={250} height={150} className="rounded-[8px]" duration={0.8} />
       <div className="card-body text mt-3">
         <h6 className="title mb-2 text-sm">
           Title: <Skeleton width={200} duration={0.8} />
         </h6>
         <h6 className="grade mb-2 text-sm">
           Grade: <Skeleton width={130} duration={0.8}/>
         </h6>
         <h6 className="subject text-sm mb-2">
           Subject: <Skeleton width={120} duration={0.8} />
         </h6>
         <h6 className="publication text-sm">
           Publication name: <Skeleton width={120} duration={0.8} />
         </h6>
       </div>
     </div>
    ))}
    </>
  );
};

const SummarySkeletonloader = ({ rowCount = 12}) => {
  return (
    <>
    {/* {Array.from({ length: rowCount }).map((_, rowIndex) => (
               <Skeleton height={12} duration={0.8} />
    ))} */}
      <Skeleton height={12} width={540} duration={0.8} className="ml-16" />
      <Skeleton height={12} width={600} duration={0.8} />
      <Skeleton height={12} width={600} duration={0.8} />
      <Skeleton height={12} width={600} duration={0.8} />
      <Skeleton height={12} width={350} duration={0.8} /><br />
      <Skeleton height={12} width={540} duration={0.8} className="ml-16" />
      <Skeleton height={12} width={600} duration={0.8} />
      <Skeleton height={12} width={600} duration={0.8} />
      <Skeleton height={12} width={600} duration={0.8} />
      <Skeleton height={12} width={480} duration={0.8} />
     
        
    </>
  );
};

const SearchSkeletonloader = () => {
  return (
    <>
    {/* {Array.from({ length: rowCount }).map((_, rowIndex) => (
               <Skeleton height={12} duration={0.8} />
    ))} */}
      <Skeleton height={15} width={200} duration={0.8} className="mt-2 ml-4" />
      <Skeleton height={15} width={200} duration={0.8} className="mt-2 ml-4" />
      <Skeleton height={15} width={200} duration={0.8} className="mt-2 ml-4" />
      <Skeleton height={15} width={200} duration={0.8} className="mt-2 ml-4" />
      <Skeleton height={15} width={200} duration={0.8} className="mt-2 ml-4" />        
    </>
  );
};

const CardSkeleton = () => {
  return (
    <>
    <Skeleton height={100} duration={0.8} />
    </>
  );
};

const SkeletonLoader = ({ type }) => {
  switch (type) {
    
    case "advance-search-grid":
      // Skeleton for a advance search page grid style
      return <AdvSearchSkeletonGrid2 />;
    case "advance-search-list":
      // Skeleton for a advance search page list style
      return <AdvSearchSkeletonList />;
    case "card":
        // Skeleton for a advance search page list style
        return <CardSkeleton />;
        
    case "summery-loader":
      return< SummarySkeletonloader/>

    case "search-loader":
        return< SearchSkeletonloader/>

    default:
      // Default skeleton
      return <Skeleton />;
  }
};

export default SkeletonLoader;
