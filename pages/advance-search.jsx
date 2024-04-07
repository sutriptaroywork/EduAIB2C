import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import AdvanceSearchComponent from "../components/AdvanceSearchComps/AdvanceSearchComponent";
import { exploreDataObj } from "../components/ConstantData";
import Image from "next/image";

const AdvanceSearch = () => {
  const router = useRouter();
  const menuData = exploreDataObj;
  // Query param
  const filteredQuery = router?.query;
  const advData = useSelector((state) => state.advanceSearch.data);
  const loading = useSelector((state) => state.advanceSearch.isLoading);


  return (
    <>
      {/* Advance page */}
      {/* {Object.keys(filteredQuery).length > 0 ? (
        <AdvanceSearchComponent
          menuData={menuData}
          filteredQuery={filteredQuery}
          advData={advData}
          loading={loading}
        />
      ) : (
        <div className="flex justify-center items-center h-[70vh] w-[90vw] text-lg font-medium">
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
                  PLease choose another topic from filters{" "}
                </p>
              </div>
            </div>
          </>
        </div>
      )} */}
      <AdvanceSearchComponent
          menuData={menuData}
          filteredQuery={filteredQuery}
          advData={advData}
          loading={loading}
        />
    </>
  );
};

export default AdvanceSearch;
