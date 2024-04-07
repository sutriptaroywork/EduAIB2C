import React from "react";
import accessIMG from "../styles/sass/images/landing-page/access.png"
import adsIMG from "../styles/sass/images/landing-page/ads.png"
import extraCredit from "../styles/sass/images/landing-page/extra-credit.png"
import viewOffline from "../styles/sass/images/landing-page/view-offline.png"

import Image from "next/image";

const Premium = () => {

    return (
        <>
            <section className="lyt-section typ-premium">
                <div className="container">
                    <div className="row">
                        <h2 className="bs-heading typ-center-mb">
                            The power of Premium
                        </h2>
                        <div className="col-lg-3 col-md-6">
                            <div className="bs-card typ-premium">
                                <div className="img-box">
                                    <Image src={adsIMG} alt={adsIMG} className="img-fluid" />
                                </div>
                                <h4 className="title">Uninterrupted learning</h4>
                                <p className="desc">Get extra credit for continuous learning</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="bs-card typ-premium">
                                <div className="img-box">
                                    <Image src={viewOffline} alt={viewOffline} className="img-fluid" />
                                </div>
                                <h4 className="title">Ace your Exam</h4>
                                <p className="desc">Master your exam with difficult questions</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 ">
                            <div className="bs-card typ-premium">
                                <div className="img-box">
                                    <Image src={accessIMG} alt={accessIMG} className="img-fluid" />
                                </div>
                                <h4 className="title">Curate your own Notes</h4>
                                <p className="desc">Save and create your own repository of content for future reference</p>
                            </div>
                        </div>
                        
                        <div className="col-lg-3 col-md-6">
                            <div className="bs-card typ-premium">
                                <div className="img-box">
                                    <Image src={extraCredit} alt={extraCredit} className="img-fluid" />
                                </div>
                                <h4 className="title">Analytics</h4>
                                <p className="desc">Get insight on your performance through our exhaustive dashboard</p>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </section>
        </>
    )
}

export default Premium;