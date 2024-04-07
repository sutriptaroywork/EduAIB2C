// coded by yaseen 
import banner_img from "../styles/sass/images/landing-page/banner-image.png";
import Video from "./Video"
import VideoComponent from './VideoComponent';
import Link from 'next/link'
import Image from "next/image";
import VideoModal from "./VideoModal";
import { useEffect, useState } from "react";

const Banner = () => {
   const [isWatched,setIsWatched] = useState(true)
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore")
    if (hasVisitedBefore) {
      setIsWatched(true)
    }else{
      setIsWatched(false)
    }
  }, []);
  return (
    <>
      <section className='lyt-section typ-banner'>
        <div className="custom-container" >
          <div className=" img-part" >
            <div>
              <Image src={banner_img} alt="banner_img" className="img-fluid"/>
            </div>
          </div>
          <div className=' content-part' >
            <h1 className='bs-heading typ-large'>Experience the Next  <br /> Era of <span className='clr-theme'>Learning</span></h1>
            <p className='bs-para typ-banner-para'>Discover A Smarter, More Enjoyable Way To Learn. Let Our Automated Human Like Personal Tutor Revolutionize The Way You Learn.</p>
            <Link href="/login" className="bs-btn btn typ-theme-large">
              Get started it’s Free
            </Link>
          </div>
        </div>
        {/* <Video /> */}
      {!isWatched && <VideoModal />}  
      </section>
      <VideoComponent />
    </>

  )
}

export default Banner
