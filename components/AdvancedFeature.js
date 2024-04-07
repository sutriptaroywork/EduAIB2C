import React, { useRef, useState } from "react";
import circleVector from "../styles/sass/images/landing-page/circle-vector.svg"
import virtualRealityTech from "../styles/sass/images/landing-page/virtual-reality-tech.png"
import chatboat from "../styles/sass/images/landing-page/chatboat.png"
import goodExamResult from "../styles/sass/images/landing-page/good-exam-result.png"
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link'
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/pagination';

const AdvancedFeature = () => {
    const swiperRef = useRef(null);

    const slides = [
        {
            backgroundImage: `url('/images/summary.jpg')`,
            card_img: virtualRealityTech,
            title: "Concise Summarization",
            description: "Our Generative AI analyses and summarizes any content thereby expediting learning. Also empowers one to review content quickly and reinforces understanding of complex topic",
        },
        {
            backgroundImage: `url('/images/QA.jpg')`,
            card_img: goodExamResult,
            title: "Assessment test",
            description: "Validate your understanding of any topic through our AI curated assessment MCQ test that can be tailored to your desired difficulty level",
        },
        {
            backgroundImage: `url('/images/Chatbot.jpg')`,
            card_img: chatboat,
            title: "24/7 Human like Personal Tutor",
            description: "Have your questions answered by our 24/7 human-like personal tutor at your convenience",
        },

    ];

    return (
        <>
            <section className="lyt-section typ-advance" id="footer">
                <div className="container advance-bg">
                    <div className="row">
                        <div className="col-lg-5 col-md-5 col-12 bg-vector" >
                            <div className="img-circle">
                                <Image src={circleVector} alt="circleVector" className="img-fluid" />
                            </div>
                            <div className="text-content">
                                <h2 className="title">Unlocking Advanced Features using Generative AI tools</h2>
                                <Link href='/login' className="btn btn-advance">
                                    Get Started
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-7 col-12" >
                            <div className="swiper-container">

                                <Swiper
                                    className="my-swiper bs-swiper typ-advanced-swiper"
                                    effect={'coverflow'}
                                    grabCursor={true}
                                    centeredSlides={true}
                                    slidesPerView={'auto'}
                                    coverflowEffect={{
                                        rotate: 0,
                                        stretch: 10,
                                        depth: 100,
                                        modifier: 5,
                                    }}
                                    modules={[EffectCoverflow, Pagination, Navigation]}
                                    breakpoints={{
                                        360: {
                                            slidesPerView: 2.4,
                                        },
                                        500: {
                                            slidesPerView: 2.9,
                                        },
                                        640: {
                                            slidesPerView: 3.4,
                                        },
                                        768: {
                                            slidesPerView: 2.4,

                                        },
                                        1024: {
                                            slidesPerView: 3,
                                            stretch: 30,
                                        },
                                    }}
                                    ref={swiperRef}

                                >
                                    {slides.map((slide, index) => (
                                        <SwiperSlide key={index}>
                                            <div
                                                className="bs-card typ-advanced"
                                                style={{ backgroundImage: slide.backgroundImage }}

                                            >
                                                <div className="card-img">
                                                    <Image src={slide.card_img} alt={slide.card_img} className="img-fluid" />
                                                </div>
                                                <h2 className="title">{slide.title}</h2>
                                                <p className="desc">{slide.description}</p>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default AdvancedFeature;







