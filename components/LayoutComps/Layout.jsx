import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import React from "react";
import { browserClose } from "../../redux/apiService";

const Layout = ({ children }) => {
  const router = useRouter();
  const sideBarStatus = useSelector((state) => state.layout.sideBarStatus);
  const currentPath = router.pathname;
  const checkArray = [
    "/dashboard",
    "/summary",
    "/shikshaAi",
    "/quiz",
    "/setting",
    "/token-manager",
    "/advance-search",
  ];

  // useEffect(() => {
  //   const handleBeforeUnload = async (event) => {
  //     event.returnValue = "Are you sure you want to leave?";
  //     browserClose();
     
  //   };

  //   if (typeof window !== "undefined") {

  //     // Attach the event listener
  //     window.addEventListener("beforeunload", handleBeforeUnload);

  //     // Cleanup the event listener when the component is unmounted
  //     return () => {
  //       window.removeEventListener("beforeunload", handleBeforeUnload);
  //     };
  //   }
  //   browserClose();
  // }, []);

  if (!checkArray.includes(currentPath)) {
    return <>{children}</>;
  }

  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <main
            className={`lyt-section main-layout ${
              !sideBarStatus && "main-layout-sidebar-cls"
            }`}
          >
            {children}
          </main>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Layout;
