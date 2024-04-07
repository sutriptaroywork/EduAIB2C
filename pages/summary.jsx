import { useRouter } from "next/router";
import SummaryComponent from "../components/SummaryComps/SummaryComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSummData } from "../redux/slices/summarySlice";

const Summary = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const assignedCode = router?.query;
  const summData = useSelector((state) => state.summary.summaryData);

  useEffect(()=>{
    if(assignedCode){
      if(assignedCode?.code && !summData){
        const postData = {
          assigned_code:assignedCode?.code
        }
        const payload = {
          postData:postData
        }
        dispatch(fetchSummData(payload))
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[assignedCode,summData])

  return (
    <>
      {/* Summary page */}
        <SummaryComponent />
    </>
  );
};

export default Summary;
