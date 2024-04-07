import React, { useEffect } from "react";
import $ from "jquery";

// import logo from "../public/images/subjects/Ai.jpg"
import dash_btn_icon from "/styles/sass/images/landing-page/btn-dash.svg";



const Video = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Dynamically import Magnific Popup when needed
      import("magnific-popup/dist/jquery.magnific-popup.js")
        .then(() => {
          // Now that the library is loaded, you can use it
          $(document).ready(() => {
            const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");

            // If not visited before, show the popup and mark as visited
            if (!hasVisitedBefore) {
              $(document).ready(() => {
                $(".popup-youtube").magnificPopup({
                  type: "iframe"
                });
        
                // Trigger the popup
                $(".popup-youtube").magnificPopup("open");
        
                // Mark as visited
                // localStorage.setItem("hasVisitedBefore", "true");
              });
            }
          });
        })
        .catch((error) => {
        });
    }
    
  }, []);

  return (
    <section className="">
      <a href="/video/shikshaml_introduction_video.mp4"  className="popup-youtube">
          
      </a>
    </section>
  );
};

export default Video;