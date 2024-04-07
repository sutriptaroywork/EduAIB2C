// MaintenanceChecker.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaintenanceMode } from "../redux/slices/maintenanceSlice";
import MaintenanceMode from "./MaintenanceMode";
 
function MaintenanceChecker({ children }) {
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(fetchMaintenanceMode());
  }, []);
 
  const isMaintenanceMode = useSelector((state)=>state?.maintenance?.isMaintenanceMode);
  return isMaintenanceMode ? <MaintenanceMode /> : children;
}
 
export default MaintenanceChecker;