import React from "react";
import interface_img from "../styles/sass/images/landing-page/interface.png"
import education from "../styles/sass/images/landing-page/education.png"
import Image from "next/image";

const CardInterface = () => {

    return (
        <>
            <section className="lyt-section typ-interface">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-5">
                            <div className="bs-card typ-card-interface">
                                <div className="img-card">
                                    <Image src={interface_img} alt="" className="img-fluid"/>
                                </div>
                                <h2 className="card-title">Colorful <br /> Interface And  <br /> User Friendly Experience</h2>
                                <p className="note">Not only does our app look brilliant -  also very easy to use! <span className="dark"> Experience a colorful, intuitive interface</span> that makes navigation a breeze, so you can focus on what matters most: your learning journey.</p>
                            </div>
                        </div>

                        <div className="col-lg-5 col-md-5">
                            <div className="bs-card typ-card-interface typ-orange">
                                <div className="img-card">
                                    <Image src={education} alt="" className="img-fluid"/>
                                </div>
                                <h2 className="card-title">We’re Not <br />Just Another <br /> Education App </h2>
                                <p className="note">We’re not just another educational app – <span className="dark">We’re A Game Changer.</span>  Our automated 24/7 Human Like Personal Tutor aims to increase academic success through personalised tutoring, meticulous planning and enriching learning experiences.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CardInterface;