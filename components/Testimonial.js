import React from "react";
import artist_man from "../styles/sass/images/landing-page/artist-man.png"
import cartoon from "../styles/sass/images/landing-page/cartoon.png"
import cartoon_face from "../styles/sass/images/landing-page/cartoon-face.png"
import leftArrow from "../styles/sass/images/landing-page/left-arrow.png"
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const Testimonial = () => {

    return (
        <>
            <section className="lyt-section typ-testimonial">
                <div className="testimonial-strip">
                    <h2 className="bs-heading text-center mb-0">
                        Testimonials
                    </h2>
                </div>
                <div className="container">

                    <Swiper 
                    modules={[Navigation , Pagination]} className="mySwiper bs-swiper typ-testimonial-swiper"
                     pagination={{
                        clickable: true,
                    }}
                        breakpoints={{
                            360: {
                                slidesPerView: 1.2,
                                spaceBetween: 10,
                            },
                            640: {
                                slidesPerView: 1.2,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 2.4,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <div className="bs-card testimonial-card">
                                <div className="card-img">
                                    <Image src={artist_man} alt="artist_man" className="img-fluid" />
                                </div>
                                <div className="contents">
                                    <p className="desc">“ShikshaML has been a game-changer in my learning journey. The AI-powered platform has made studying so much more efficient and engaging”</p>
                                    <p className="name">
                                        - Rajesh Gupta
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="bs-card testimonial-card green-border">
                                <div className="card-img">
                                    <Image src={cartoon} alt="artist_man" className="img-fluid" />
                                </div>
                                <div className="contents">
                                    <p className="desc">“ShikshaML is a fantastic learning platform. As a teacher, I have been using it to create custom lesson plans for my students”</p>
                                    <p className="name">
                                        - Priya Sharma
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="bs-card testimonial-card orange-border">
                                <div className="card-img">
                                    <Image src={cartoon_face} alt="artist_man" className="img-fluid" />
                                </div>
                                <div className="contents">
                                    <p className="desc">“शिक्षाएमएल परीक्षा की तैयारी के लिए एक शानदार उपकरण है। AI-पॉवर्ड प्रैक्टिस टेस्ट मेरे ज्ञान का मूल्यांकन करने और मेरे सुधार की आवश्यकता है क्षेत्रों की पहचान करने में अत्यधिक सहायक हैं।”</p>
                                    <p className="name">
                                        - अनन्या पटेल
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </>
    )
}

export default Testimonial;