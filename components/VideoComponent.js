
import right_arrow from "../styles/sass/images/landing-page/vector-right-arrow.svg"
import Image from "next/image";
import React, { useEffect } from "react";
import $ from "jquery";

const VideoComponent = () => {

    useEffect(() => {
        $(document).ready(() => {
            $("iframe[src*='shikshaml_introduction_video.mp4']").addClass("thumbNail");
        });
    }, []);

    return (
        <>
            <section className="lyt-section typ-video">
                <div className="container">
                    <div className="typ-video-frame">
                        {/* <Video /> */}
                        {/* <iframe
                        // width="640"
                        // height="360"
                        src="/video/shikshaml_introduction_video.mp4"
                        title="YouTube video player"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe> */}
                        
                            <video controls poster="/images/shiksha-intro-thumbnail.png" className="w-full h-auto"  preload="auto" playsInline>
                                <source src="/video/shikshaml_introduction_video.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                       
                    </div>
                    <div className="vectors">
                        <Image src={right_arrow} alt="right_arrow" className="arrow-img" />
                    </div>
                </div>

            </section>
            <style jsx>
                {`
                    .thumbNail {
                        background-image : url('/shikshaMl-logo.svg');
                        transition: width 0.3s; 
                        background-size : 100%;
                        background-repeat : no-repeat;
                        width : 600px;
                        height : 600px;
                      }
                `}
            </style>
        </>
    )


}

export default VideoComponent;