import { useEffect, useState } from "react";
import DashboardComps from "../components/DashboardComps/DashboardComp";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getCookie,setCookie ,deleteCookie} from "cookies-next";
import { toast } from "react-toastify";
import { saveProfileDataFunc, updateSearchDataRedux } from "../redux/slices/layoutSlice";
import { fetchUserData } from "../redux/slices/userDataSlice";

const Dashboard = () => {
  const router = useRouter();
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  
  const userData = useSelector((state) => state.userData.data);
  const userLoading = useSelector((state) => state.userData.isLoading);
  
  useEffect(()=>{
    const gToken = getCookie("gToken")
    const userTokened = localStorage.getItem("userToken");
    if(gToken?.length > 0){
      setUserToken(gToken)
      localStorage.setItem("userToken",gToken);
      deleteCookie("gToken");
      router.push("/dashboard")
    }else if(userTokened){
      setUserToken(userTokened)
    }else{

    }
    dispatch(updateSearchDataRedux())
  },[])
  
  useEffect(()=>{
    if(!userData){
      dispatch(fetchUserData());
    }
   if(userData){
      if(userData.completed){
        dispatch(saveProfileDataFunc(userData));
        setLoading(false);
      }
      else{
        toast.info("Please fill profile details");
        router.push("/profile");
        setLoading(false);
      }
   }

  },[userToken,userData,userLoading])

  if (loading && !userToken) {
    return (
      <div className="bg-white z-50 h-[75vh] w-[80vw] flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <DashboardComps  />
    </>
  );
};

export default Dashboard;
