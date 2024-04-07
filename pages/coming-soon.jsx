import React from "react";
import Image from "next/image";
import comming_s_img from "../public/coming-soon.png"
import Header from "../components/CommingSoonComps/Header";
import Footer from "../components/CommingSoonComps/Footer";

const comingSoon = () => {
    return (
        <>
            <Header comingFromSubscribe={false} />
            <section className="lyt-section typ-comming">
                <div className="comming_s_img">
                    <Image src={comming_s_img} alt={comming_s_img} className="img-fluid" />
                </div>
                <h2 className="title">Coders at Work</h2>
                <h2 className="desc">-coming Soon-</h2>
            </section>
            <Footer />
        </>
    )
}
export default comingSoon;