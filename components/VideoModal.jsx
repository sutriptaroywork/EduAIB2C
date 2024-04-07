import React, { useEffect, useState } from "react";

const VideoModal = ({ closePopup }) => {
  const [isModalOpen, setModalOpen] = useState(true);
  useEffect(() => {
    const handleBackgroundClick = (e) => {
      if (e.target.classList.contains('modal-background')) {
        closeModal();
      }
    };
    if (isModalOpen) {
      document.addEventListener('click', handleBackgroundClick);
    } else {
      document.removeEventListener('click', handleBackgroundClick);
    }
    return () => {
      document.removeEventListener('click', handleBackgroundClick);
    };
  }, [isModalOpen]);

  const closeModal = () => {
    if(closePopup){
    closePopup();

    }
    setModalOpen(false);
    localStorage.setItem("hasVisitedBefore", true);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed z-[100] modal-background h-[calc(100vh)] top-0 left-0 right-0 bottom-0  flex justify-center items-center bg-black bg-opacity-50"  >
          <div className="flex justify-center items-center mx-[8%]  h-[50%] w-[55%] min-h-[375px] min-w-[360px]" >
            <div className="flex ">
              <video
                controls
                poster="/images/shiksha-intro-thumbnail.png"
                className="w-full h-auto"
                preload="auto"
                playsInline
                autoPlay
                muted
              >
                <source
                  src="/video/shikshaml_introduction_video.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <div className="h-full">
                <button className="translate-x-[-2.5rem] translate-y-[0.7rem] cursor-pointer focus:outline-none bg-[#C2F362] rounded-full p-1" onClick={(e) => {
                  closeModal()
                }}>
                  <svg
                    className="w-5 h-5  hover:scale-125"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoModal;
